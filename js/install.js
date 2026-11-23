// Offline support and the "add to home screen" prompt.
// The prompt shows after a round, never before the first one, and matches the
// browser: a social app's built-in browser, Android Chrome, or iPhone.
// For testing, ?install=inapp|android|ios forces a variant on every round.

import { store } from './store.js';
import { icon } from './icons.js';

let deferred = null; // Chrome's install event, saved for our own button
let forced = null;

export function initInstall(force) {
  forced = ['inapp', 'android', 'ios'].includes(force) ? force : null;
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => { /* offline support is a bonus */ });
  }
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferred = e;
  });
  window.addEventListener('appinstalled', () => {
    store.update((st) => { st.install.installed = true; });
    close();
  });
}

const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

function inAppName(ua) {
  if (/Instagram/i.test(ua)) return 'Instagram';
  if (/FBAN|FBAV|FB_IAB|FBIOS/i.test(ua)) return 'Facebook';
  if (/TikTok|musical_ly|Bytedance|BytedanceWebview/i.test(ua)) return 'TikTok';
  if (/Snapchat/i.test(ua)) return 'Snapchat';
  if (/LinkedInApp/i.test(ua)) return 'LinkedIn';
  if (/\bLine\//i.test(ua)) return 'LINE';
  return null;
}

const isIOS = (ua) => /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
const isAndroid = (ua) => /Android/i.test(ua);

function variant() {
  if (forced) return { kind: forced, app: forced === 'inapp' ? 'Instagram' : null };
  if (isStandalone() || store.get().install.installed) return null;
  const ua = navigator.userAgent;
  const app = inAppName(ua);
  if (app) return { kind: 'inapp', app };
  if (isIOS(ua)) return { kind: 'ios' };
  if (deferred) return { kind: 'android' };
  if (isAndroid(ua)) return { kind: 'android-menu' };
  return null; // desktop browsers: no prompt in the prototype
}

function shouldOffer() {
  if (forced) return true;
  const { install, roundsDone } = store.get();
  if (install.installed) return false;
  if (install.dismissals === 0) return true;
  // After one "Not now", offer once more, three rounds later.
  return install.dismissals === 1 && roundsDone >= (install.lastDismissedAt || 0) + 3;
}

function close() {
  const el = document.getElementById('install-sheet');
  if (el) el.remove();
}

function dismiss() {
  store.update((st) => {
    st.install.dismissals += 1;
    st.install.lastDismissedAt = st.roundsDone;
  });
  close();
}

const sheets = {
  inapp: (v) => `
    <h2>Keep the game. Open it in your browser.</h2>
    <p>${v.app}'s built-in browser can't add apps to your home screen.</p>
    <div class="mockbar"><span>${v.app} · web page</span><span class="dots">•••</span></div>
    <ol class="steps">
      <li><span class="sn">1</span><span>Tap <b>•••</b> in the top corner</span></li>
      <li><span class="sn">2</span><span>Choose <b>Open in browser</b> (or Open in Safari / Chrome)</span></li>
    </ol>
    <button class="btn ghost" data-act="copy" style="margin-top:18px">${icon.copy(18)}<span>Copy link</span></button>
    <button class="text-btn" data-act="later">Not now</button>`,
  android: () => `
    <div class="app-id"><img class="app-icon" src="./icons/icon-192.png" alt=""><span><b>History Cards</b><br><span class="muted">Free · plays offline</span></span></div>
    <p style="margin-top:14px">Put it on your home screen. It opens full screen and starts in a tap.</p>
    <button class="btn" data-act="install" style="margin-top:18px">Install</button>
    <button class="text-btn" data-act="later">Not now</button>`,
  'android-menu': () => `
    <h2>Add it to your home screen</h2>
    <ol class="steps">
      <li><span class="sn">1</span><span>Tap <b>⋮</b> in your browser's top corner</span></li>
      <li><span class="sn">2</span><span>Tap <b>Add to Home screen</b> or <b>Install app</b></span></li>
    </ol>
    <button class="text-btn" data-act="later" style="margin-top:10px">Not now</button>`,
  ios: () => `
    <h2>Add it to your home screen</h2>
    <ol class="steps">
      <li><span class="sn">1</span><span>Tap <b>Share</b> in Safari's bar</span><span class="mockicon hl">${icon.share(18)}</span></li>
      <li><span class="sn">2</span><span>Scroll and tap <b>Add to Home Screen</b></span><span class="mockicon">${icon.addBox(16)}</span></li>
      <li><span class="sn">3</span><span>Tap <b>Add</b></span></li>
    </ol>
    <button class="text-btn" data-act="later" style="margin-top:10px">Not now</button>
    <div class="ios-arrow" aria-hidden="true">${icon.arrowDown(26)}</div>`,
};

export function maybeOfferInstall() {
  const v = variant();
  if (!v || !shouldOffer()) return;
  close();
  const wrap = document.createElement('div');
  wrap.id = 'install-sheet';
  wrap.className = `scrim bottom install ${v.kind}`;
  wrap.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-label="Add History Cards to your home screen"><div class="handle"></div>${sheets[v.kind](v)}</div>`;
  document.getElementById('layer').appendChild(wrap);

  wrap.addEventListener('click', (e) => { if (e.target === wrap) dismiss(); });
  wrap.querySelector('[data-act="later"]').addEventListener('click', dismiss);
  const copy = wrap.querySelector('[data-act="copy"]');
  if (copy) copy.addEventListener('click', async () => {
    const url = location.origin + location.pathname;
    try {
      await navigator.clipboard.writeText(url);
      copy.querySelector('span').textContent = 'Link copied';
    } catch {
      copy.querySelector('span').textContent = url;
    }
  });
  const inst = wrap.querySelector('[data-act="install"]');
  if (inst) inst.addEventListener('click', async () => {
    if (!deferred) { close(); return; }
    deferred.prompt();
    const choice = await deferred.userChoice;
    deferred = null;
    if (choice.outcome === 'accepted') store.update((st) => { st.install.installed = true; });
    close();
  });
}
