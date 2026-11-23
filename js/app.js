import { STORIES, CARDS, MODE_INFO, storyById } from './data.js';
import { art } from './art.js';
import { icon } from './icons.js';
import { store } from './store.js';
import { poolFor, newRound, canSkip, skip, flip, mark, undo, current, isDone, score, markedCount } from './round.js';
import { frontHTML, backHTML } from './cards.js';
import { maybeOfferInstall, initInstall } from './install.js';

const app = document.getElementById('app');
const layer = document.getElementById('layer');

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const $ = (sel, root = app) => root.querySelector(sel);

let screen = 'stories';
let round = null;
let fromVideo = null; // story id when the app was opened from a video link
let leaving = false; // set when the player confirmed quitting, so popstate lets them go

// ---------------- Navigation ----------------
// Stories is the base history entry. A round (and its result) is one pushed
// entry on top, so the phone's back gesture leaves the round.

function startRound({ replace = false } = {}) {
  lastMark = null;
  round = newRound(poolFor(CARDS, tickedIds()));
  screen = 'round';
  if (replace) history.replaceState({ s: 'round' }, '', '#round');
  else history.pushState({ s: 'round' }, '', '#round');
  render();
  maybeCoach();
}

function toStories() {
  if (location.hash) {
    leaving = true;
    history.back();
  } else {
    showStories();
  }
}

function showStories() {
  screen = 'stories';
  round = null;
  fromVideo = null;
  render();
}

window.addEventListener('popstate', () => {
  if (screen === 'round' && round && markedCount(round) > 0 && !leaving) {
    history.pushState({ s: 'round' }, '', '#round');
    confirmLeave();
    return;
  }
  leaving = false;
  showStories();
});

function render() {
  layer.innerHTML = '';
  window.scrollTo(0, 0);
  if (screen === 'stories') renderStories();
  else if (screen === 'round') renderRound();
  else if (screen === 'done') renderDone();
}

// ---------------- Stories ----------------

function tickedIds() {
  return store.get().ticks.filter((id) => storyById(id));
}

function renderStories() {
  const ticks = tickedIds();
  const played = new Set(store.get().played);
  const n = ticks.length;
  const none = n === 0;
  const sub = none ? 'None ticked · cards come from every story' : `${n} ticked · cards come from ${n === 1 ? 'this story' : 'these'}`;
  const from = none ? `from all ${STORIES.length} stories` : `from ${n} ${n === 1 ? 'story' : 'stories'}`;

  const tiles = STORIES.map((s) => {
    const on = ticks.includes(s.id);
    const dimmed = !none && !on;
    return `
    <div class="tile${s.newest ? ' hero' : ''}${on ? ' on' : ''}">
      <div class="pic">${art(s.art)}</div>
      ${dimmed ? '<span class="dim"></span>' : ''}
      <button class="hit" data-tick="${s.id}" aria-pressed="${on}" aria-label="${on ? 'Untick' : 'Tick'} ${esc(s.title)}"></button>
      ${on ? '<span class="ring"></span>' : ''}
      <span class="yr">${s.newest ? 'NEWEST · ' : ''}${s.year}</span>
      <span class="chk">${on ? icon.check(15) : ''}</span>
      <div class="band">
        <span class="tt">${esc(s.title)}${played.has(s.id) ? `<span class="pl">${icon.check(11)}Played</span>` : ''}</span>
        <a class="watch" href="${s.video}" target="_blank" rel="noopener" aria-label="Watch ${esc(s.title)}">${icon.play(15)}</a>
      </div>
    </div>`;
  }).join('');

  app.innerHTML = `
  <main class="screen stories">
    <div class="stories-head">
      <h1>Stories</h1>
      <div class="actions">
        <button class="pill" data-act="all" ${n === STORIES.length ? 'disabled' : ''}>All</button>
        <button class="pill" data-act="clear" ${none ? 'disabled' : ''}>Clear</button>
      </div>
    </div>
    <p class="stories-sub">${sub}</p>
    <div class="tiles">${tiles}</div>
    <div class="playbar">
      <button class="btn" data-act="play">Play 5 cards<small>${from} · works offline</small></button>
      <div class="foot-note">Prototype · sample cards, not fact-checked</div>
    </div>
  </main>`;

  app.querySelectorAll('[data-tick]').forEach((b) => b.addEventListener('click', () => {
    const id = b.dataset.tick;
    store.update((st) => {
      st.ticks = st.ticks.includes(id) ? st.ticks.filter((t) => t !== id) : [...st.ticks, id];
    });
    renderStories();
  }));
  $('[data-act="all"]').addEventListener('click', () => {
    store.update((st) => { st.ticks = STORIES.map((s) => s.id); });
    renderStories();
  });
  $('[data-act="clear"]').addEventListener('click', () => {
    store.update((st) => { st.ticks = []; });
    renderStories();
  });
  $('[data-act="play"]').addEventListener('click', () => startRound());
}

// ---------------- Round ----------------

function pipsHTML() {
  return round.slots.map((s, i) => {
    const c = MODE_INFO[s.card.mode].color;
    if (i < round.index) return `<i style="background:${c}"></i>`;
    if (i === round.index) return `<i class="now" style="background:${c}"></i>`;
    return '<i></i>';
  }).join('');
}

function renderRound(anim) {
  const slot = current(round);
  const mode = slot.card.mode;
  const flipped = slot.flipped;
  const skippable = canSkip(round);
  const label = MODE_INFO[mode].label;

  app.innerHTML = `
  <main class="screen round">
    <div class="topbar">
      <button class="icon-btn" data-act="leave" aria-label="Leave round">${icon.x(18)}</button>
      <div class="pips" role="img" aria-label="Card ${round.index + 1} of 5">${pipsHTML()}</div>
      <button class="skip" data-act="skip" ${skippable ? '' : 'disabled'} ${flipped ? 'style="visibility:hidden"' : ''} aria-describedby="skipnote">${icon.skip(14)}Skip</button>
    </div>
    ${!flipped && !skippable ? `<p class="skip-note" id="skipnote">No more ${esc(label)} cards to swap in</p>` : ''}
    <div class="stage">
      ${flipped ? '<div class="ghost-slot"></div>' : ''}
      <div class="card${flipped ? ' back' : ' front'}${!flipped && mode !== 'who' ? ' tappable' : ''}${anim === 'in' ? ' turn-in' : ''}"
           style="${mode === 'timeline' && !flipped ? '' : ''}" aria-label="${flipped ? 'Answer' : label} card">
        ${flipped ? backHTML(slot) : frontHTML(slot)}
      </div>
    </div>
    <div class="below">
      ${flipped
        ? `<div class="marks">
             <button class="mark-btn miss" data-mark="0">${icon.x(22)}Missed</button>
             <button class="mark-btn ok" data-mark="1">${icon.check(22)}Got it</button>
           </div>
           <p class="swipe-hint">or swipe the card: right if you got it, left if not</p>`
        : mode === 'who'
          ? `${undoBarHTML()}<button class="flip-btn" data-act="flip">${icon.flip(18)}Flip card</button>`
          : lastMark ? undoBarHTML() : `<button class="flip-hint" data-act="flip">${icon.flip(18)}Tap the card to flip</button>`}
    </div>
  </main>`;

  const card = $('.card');
  if (anim === 'in') requestAnimationFrame(() => requestAnimationFrame(() => {
    card.classList.remove('turn-in');
  }));

  $('[data-act="leave"]').addEventListener('click', leaveRound);
  $('[data-act="skip"]').addEventListener('click', () => {
    lastMark = null;
    skip(round);
    renderRound();
  });
  bindUndo();

  if (!flipped) {
    const flipBtn = $('[data-act="flip"]');
    if (flipBtn) flipBtn.addEventListener('click', doFlip);
    if (mode !== 'who') card.addEventListener('click', doFlip);
    const clue = $('[data-act="clue"]');
    if (clue) clue.addEventListener('click', (e) => {
      e.stopPropagation();
      lastMark = null;
      slot.clues += 1;
      renderRound();
    });
  } else {
    app.querySelectorAll('[data-mark]').forEach((b) => b.addEventListener('click', () => doMark(b.dataset.mark === '1')));
    bindSwipe(card);
  }
}

let busy = false;

function doFlip() {
  if (busy) return;
  busy = true;
  lastMark = null;
  const card = $('.card');
  card.classList.add('turn-out');
  setTimeout(() => {
    flip(round);
    const storyId = current(round).card.story;
    store.update((st) => { if (!st.played.includes(storyId)) st.played.push(storyId); });
    busy = false;
    renderRound('in');
  }, 170);
}

function doMark(gotIt) {
  if (busy) return;
  busy = true;
  const card = $('.card');
  const dir = gotIt ? 1 : -1;
  card.classList.remove('dragging');
  card.style.transition = 'transform .22s ease-in, opacity .22s';
  card.style.transform = `translateX(${dir * 130}%) rotate(${dir * 14}deg)`;
  card.style.opacity = '0';
  setTimeout(() => {
    lastMark = { n: round.index + 1, gotIt };
    mark(round, gotIt);
    busy = false;
    if (isDone(round)) {
      screen = 'done';
      history.replaceState({ s: 'done' }, '', '#done');
      render();
      store.update((st) => { st.roundsDone += 1; });
      // Let the player take in their score (and undo a slip) before the prompt.
      const thisRound = round;
      setTimeout(() => { if (screen === 'done' && round === thisRound) maybeOfferInstall(); }, 4200);
    } else {
      renderRound();
    }
  }, 220);
}

// ---------------- Undo ----------------
// After each mark, the bottom of the next screen offers Undo until the player
// does something else. (A floating toast covered the next card's first line.)

let lastMark = null;

function undoBarHTML() {
  if (!lastMark) return '';
  const { n, gotIt } = lastMark;
  return `<div class="undo-bar" role="status"><span class="undo-text"><span style="color:${gotIt ? 'var(--ok)' : 'var(--miss)'}">${gotIt ? icon.check(16) : icon.x(16)}</span>Card ${n} marked ${gotIt ? 'Got it' : 'Missed'}</span><button data-act="undo">Undo</button></div>`;
}

function bindUndo() {
  const b = $('[data-act="undo"]');
  if (!b) return;
  b.addEventListener('click', (e) => {
    e.stopPropagation();
    lastMark = null;
    undo(round);
    if (screen === 'done') {
      screen = 'round';
      store.update((st) => { st.roundsDone = Math.max(0, st.roundsDone - 1); });
      history.replaceState({ s: 'round' }, '', '#round');
      layer.innerHTML = '';
    }
    renderRound();
  });
}

function bindSwipe(card) {
  let x0 = null;
  let y0 = 0;
  let dx = 0;
  let dragging = false;
  const ok = card.querySelector('.stamp-ok');
  const miss = card.querySelector('.stamp-miss');
  const reset = () => {
    card.style.transform = '';
    card.style.outline = '';
    ok.style.opacity = 0;
    miss.style.opacity = 0;
  };
  card.addEventListener('pointerdown', (e) => {
    if (e.target.closest('a, button') || busy) return;
    x0 = e.clientX; y0 = e.clientY; dx = 0; dragging = false;
  });
  card.addEventListener('pointermove', (e) => {
    if (x0 === null) return;
    const mx = e.clientX - x0;
    const my = e.clientY - y0;
    if (!dragging) {
      if (Math.abs(mx) > 12 && Math.abs(mx) > Math.abs(my)) {
        dragging = true;
        card.classList.add('dragging');
        try { card.setPointerCapture(e.pointerId); } catch { /* not all pointers */ }
      } else if (Math.abs(my) > 12) {
        x0 = null; // vertical: let the card scroll
        return;
      } else return;
    }
    dx = mx;
    card.style.transform = `translateX(${dx}px) rotate(${dx / 22}deg)`;
    const p = Math.min(1, Math.abs(dx) / 100);
    ok.style.opacity = dx > 0 ? p : 0;
    miss.style.opacity = dx < 0 ? p : 0;
    card.style.outline = Math.abs(dx) > 100 ? `3px solid ${dx > 0 ? 'var(--ok)' : 'var(--miss)'}` : '';
  });
  const end = () => {
    if (x0 === null) return;
    x0 = null;
    if (!dragging) return;
    card.classList.remove('dragging');
    if (Math.abs(dx) > 100) doMark(dx > 0);
    else reset();
  };
  card.addEventListener('pointerup', end);
  card.addEventListener('pointercancel', () => { x0 = null; card.classList.remove('dragging'); reset(); });
}

function leaveRound() {
  if (markedCount(round) > 0) confirmLeave();
  else toStories();
}

function confirmLeave() {
  const n = markedCount(round);
  layer.innerHTML = `
  <div class="scrim" data-act="keep">
    <div class="dialog" role="alertdialog" aria-modal="true" aria-labelledby="leave-title">
      <h2 id="leave-title">Quit this round?</h2>
      <p>${n} of 5 cards marked. This round won't be counted.</p>
      <button class="btn" data-act="keep" style="margin-top:20px">Keep playing</button>
      <button class="text-btn warn" data-act="quit">Quit round</button>
    </div>
  </div>`;
  const close = () => { layer.innerHTML = ''; };
  layer.querySelector('.scrim').addEventListener('click', (e) => { if (e.target === e.currentTarget) close(); });
  layer.querySelector('.btn[data-act="keep"]').addEventListener('click', close);
  layer.querySelector('[data-act="quit"]').addEventListener('click', () => { close(); toStories(); });
  layer.querySelector('.btn').focus();
}

// ---------------- Coach panel (first visit only) ----------------

function maybeCoach() {
  if (store.get().coachSeen) return;
  const s = fromVideo ? storyById(fromVideo) : null;
  layer.innerHTML = `
  <div class="scrim bottom coach">
    <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="coach-title">
      ${s ? `<div class="coach-from"><span class="cthumb">${art(s.art)}</span><span>From the video<br><b>${esc(s.title)}</b></span></div>` : ''}
      <h2 id="coach-title">5 cards. One of each kind.</h2>
      <ul class="tips">
        <li>${icon.mic(20)}<span>Say your answer out loud</span></li>
        <li>${icon.flip(20)}<span>Flip the card to see if you're right</span></li>
        <li>${icon.arrowRight(20)}<span>Got it? Swipe right. Missed? Swipe left. You mark yourself.</span></li>
      </ul>
      <button class="btn" data-act="go">Let's go</button>
    </div>
  </div>`;
  layer.querySelector('[data-act="go"]').addEventListener('click', () => {
    store.update((st) => { st.coachSeen = true; });
    layer.innerHTML = '';
  });
}

// ---------------- Round done ----------------

const verdict = (n) => (n === 5 ? 'Flawless.' : n === 4 ? 'Sharp.' : n === 3 ? 'Not bad.' : 'Rematch?');

function renderDone() {
  const n = score(round);
  const rows = round.slots.map((s) => {
    const c = s.card;
    const m = MODE_INFO[c.mode];
    const pic = c.mode === 'who' ? art('portrait', c.front.names[c.back.answer]) : art(c.art);
    const sub = c.mode === 'who' ? `${c.front.names[c.back.answer].name} · ${storyById(c.story).title}` : storyById(c.story).title;
    return `
    <li class="rr">
      <span class="th">${pic}<i style="background:${m.color}"></i></span>
      <span class="mt">${m.label}<span>${esc(sub)}</span></span>
      ${s.mark ? `<span class="res ok" role="img" aria-label="Got it">${icon.check(16)}</span>` : `<span class="res miss" role="img" aria-label="Missed">${icon.x(14)}</span>`}
    </li>`;
  }).join('');
  const beat = n === 5 ? 'They need a perfect <b>5</b> to tie.' : `They need <b>${n + 1}</b> to beat you.`;

  app.innerHTML = `
  <main class="screen done">
    <div class="score-row">
      <div>
        <p class="eyebrow">Round done</p>
        <p class="score">${n}<span>/5</span></p>
      </div>
      <p class="verdict">${verdict(n)}</p>
    </div>
    <ol class="recap-list">${rows}</ol>
    <div class="pass">${icon.phone(22)}<span>Pass the phone. ${beat}</span></div>
    <div class="done-actions">
      ${undoBarHTML()}
      <button class="btn" data-act="again">Play again</button>
      <button class="btn ghost" data-act="stories">Stories</button>
    </div>
  </main>`;
  bindUndo();
  $('[data-act="again"]').addEventListener('click', () => startRound({ replace: true }));
  $('[data-act="stories"]').addEventListener('click', toStories);
}


// ---------------- Boot ----------------

function boot() {
  const params = new URLSearchParams(location.search);
  if (params.has('reset')) store.reset();
  initInstall(params.get('install'));

  const storyParam = params.get('story');
  const clean = location.pathname;
  if (storyParam && storyById(storyParam)) {
    // A video link: tick only that story and deal a round straight away.
    store.update((st) => { st.ticks = [storyParam]; });
    fromVideo = storyParam;
    history.replaceState(null, '', clean);
    startRound();
    return;
  }
  // A reload mid-round can't restore the round, so start from Stories.
  history.replaceState(null, '', clean + (params.has('install') ? `?install=${params.get('install')}` : ''));
  render();
}

boot();
