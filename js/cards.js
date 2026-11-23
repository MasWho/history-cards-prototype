// Markup for card fronts and backs, one function per mode.
import { MODE_INFO, LETTERS, storyById } from './data.js';
import { art } from './art.js';
import { icon } from './icons.js';

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const color = (mode) => MODE_INFO[mode].color;
const chip = (mode, text = MODE_INFO[mode].label) => `<span class="mchip" style="background:${color(mode)}">${esc(text)}</span>`;
const prov = (text = 'RECREATED') => `<span class="prov">${text}</span>`;
const from = (card, extra = '') => `<p class="from">${esc(storyById(card.story).title)}${extra}</p>`;

// Blur steps for the Who am I? portrait: heavy at clue 1, clear on the back.
const BLUR = [0, 16, 10, 5, 2];

const fronts = {
  timeline(card) {
    const f = card.front;
    return `
    <div class="card-body" style="border-top:8px solid ${color('timeline')}">
      <span class="mlabel" style="color:${color('timeline')}">Timeline</span>
      <h2 class="q">${esc(f.prompt)}</h2>
      <ol class="events">
        ${f.events.map((e, i) => `
        <li class="opt event">
          <span class="ethumb">${art(e.art)}<span class="L" style="background:${color('timeline')}">${LETTERS[i]}</span></span>
          <span>${esc(e.text)}</span>
        </li>`).join('')}
      </ol>
      ${from(card, ' · pictures recreated')}
    </div>`;
  },

  hilo(card) {
    const f = card.front;
    return `
    <div class="img img-hilo">${art(card.art)}${chip('hilo')}${prov()}</div>
    <div class="dial" aria-label="Higher or lower than ${esc(f.n)} ${esc(f.unit)}">
      <span class="dial-arrow">${icon.up(18)}</span>
      <span class="dial-n">${esc(f.n)}</span>
      <span class="dial-u">${esc(f.unit)}</span>
      <span class="dial-arrow">${icon.down(18)}</span>
    </div>
    <div class="card-body center">
      <p class="kicker">Higher or lower than ${esc(f.n)}?</p>
      <h2 class="q">${esc(f.question)}</h2>
      ${from(card)}
    </div>`;
  },

  truths(card) {
    const f = card.front;
    return `
    <div class="img">${art(card.art)}${chip('truths')}${prov()}</div>
    <div class="card-body">
      <h2 class="q">Which one is the lie?</h2>
      <ol class="opts">
        ${f.statements.map((t, i) => `<li class="opt"><span class="L" style="background:${color('truths')}">${LETTERS[i]}</span><span>${esc(t)}</span></li>`).join('')}
      </ol>
      ${from(card)}
    </div>`;
  },

  next(card) {
    const f = card.front;
    return `
    <div class="img">${art(card.art)}${chip('next')}${prov()}</div>
    <div class="card-body">
      <p class="setup">${esc(f.setup)}</p>
      <ol class="opts">
        ${f.options.map((t, i) => `<li class="opt"><span class="L" style="background:${color('next')}">${LETTERS[i]}</span><span>${esc(t)}</span></li>`).join('')}
      </ol>
      ${from(card)}
    </div>`;
  },

  who(card, slot) {
    const f = card.front;
    const shown = slot.clues;
    const left = f.clues.length - shown;
    // Neutral background on the front, so the blur's colour can't be matched
    // to one of the four small portraits. The hat shape is allowed to hint.
    const sitter = f.names[card.back.answer];
    return `
    <div class="img img-who">
      <div class="blur" style="filter:blur(${BLUR[shown] ?? 0}px)">${art('portrait', { hat: sitter.hat, bg: '#4E4183', fit: 'meet' })}</div>
      <span class="qmark" aria-hidden="true">?</span>
      ${chip('who')}${prov('SHARPENS WITH EACH CLUE')}
    </div>
    <div class="card-body">
      <ol class="clues">
        ${f.clues.slice(0, shown).map((c, i) => `<li><span class="cn">${i + 1}</span><span>${esc(c)}</span></li>`).join('')}
      </ol>
      ${left > 0 ? `<button class="clue-btn" data-act="clue">${icon.plus(14)}Show clue ${shown + 1} of ${f.clues.length}</button>` : '<p class="clue-done">All clues shown</p>'}
      <ul class="names">
        ${f.names.map((n, i) => `<li class="opt name"><span class="mini">${art('portrait', { hat: n.hat, bg: n.bg })}</span><span><b style="color:${color('who')}">${LETTERS[i]}</b> ${esc(n.name)}</span></li>`).join('')}
      </ul>
    </div>`;
  },
};

export function frontHTML(slot) {
  return fronts[slot.card.mode](slot.card, slot);
}

// ---------------- Backs ----------------

function answerBlock(card) {
  const b = card.back;
  const f = card.front;
  switch (card.mode) {
    case 'timeline':
      return `
        <p class="big">${b.order.map((i) => LETTERS[i]).join(' → ')}</p>
        <ol class="order">${b.order.map((i) => `<li><span class="yr">${esc(f.events[i].year)}</span><span><b>${LETTERS[i]}</b> ${esc(f.events[i].text)}</span></li>`).join('')}</ol>`;
    case 'hilo':
      return `
        <p class="big">${esc(b.answer)}</p>
        <p class="value" style="color:${color('hilo')}">${esc(b.value)}</p>
        <p class="recap">${esc(f.question)} (vs ${esc(f.n)} ${esc(f.unit)})</p>`;
    case 'truths':
      return `
        <p class="big">${LETTERS[b.lie]} is the lie</p>
        <p class="recap lie">“${esc(f.statements[b.lie])}”</p>`;
    case 'next':
      return `
        <p class="big">${LETTERS[b.answer]}</p>
        <p class="value" style="color:${color('next')}">${esc(f.options[b.answer])}</p>`;
    case 'who':
      return `<p class="big">${LETTERS[b.answer]} · ${esc(f.names[b.answer].name)}</p>`;
    default:
      return '';
  }
}

export function backHTML(slot) {
  const card = slot.card;
  const story = storyById(card.story);
  const sitter = card.mode === 'who' ? card.front.names[card.back.answer] : null;
  const picture = sitter ? art('portrait', { hat: sitter.hat, bg: sitter.bg, fit: 'meet' }) : art(card.art);
  return `
    <div class="img img-back${card.mode === 'timeline' ? ' short' : ''}"${sitter ? ` style="background:${sitter.bg}"` : ''}>${picture}${chip(card.mode, 'Answer')}${prov('RECREATED · not a photo')}
      <span class="stamp stamp-ok">${icon.check(14)}GOT IT</span>
      <span class="stamp stamp-miss">${icon.x(14)}MISSED</span>
    </div>
    <div class="card-body back">
      ${answerBlock(card)}
      <p class="reveal">${esc(card.back.reveal)}</p>
      <p class="from">Source: ${esc(story.source)}</p>
      <a class="watch-row" href="${story.video}" target="_blank" rel="noopener">
        <span class="wthumb">${art(story.art)}</span><span>Watch the story</span>${icon.play(14)}
      </a>
    </div>`;
}
