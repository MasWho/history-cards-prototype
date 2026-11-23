// The round engine: pure functions over plain data, so the spec's rules can be
// tested on their own (see tests.html).
//
// Rules held here:
//  1. A round always has 5 cards, one per mode, none repeated within the round.
//  2. Cards come only from the ticked stories, or from all stories if none are ticked.
//  4. Skip swaps a card for an unused one of the same mode from those stories,
//     and is not offered when there isn't one (or once the card is flipped).
//  5. The round total equals the number of "got it" marks.

import { MODES } from './data.js';

export function poolFor(cards, tickedStoryIds) {
  const ticks = new Set(tickedStoryIds);
  return ticks.size === 0 ? cards.slice() : cards.filter((c) => ticks.has(c.story));
}

function pick(list, rng) {
  return list[Math.floor(rng() * list.length)];
}

function shuffle(list, rng) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function newRound(pool, rng = Math.random) {
  const order = shuffle(MODES, rng);
  const slots = order.map((mode) => {
    const options = pool.filter((c) => c.mode === mode);
    if (options.length === 0) throw new Error(`No ${mode} card in the selected stories`);
    return { card: pick(options, rng), flipped: false, mark: null, clues: 1 };
  });
  return { pool, slots, index: 0, used: slots.map((s) => s.card.id), history: [] };
}

function unusedOfMode(round, mode) {
  return round.pool.filter((c) => c.mode === mode && !round.used.includes(c.id));
}

export function canSkip(round, i = round.index) {
  const slot = round.slots[i];
  return !!slot && !slot.flipped && slot.mark === null && unusedOfMode(round, slot.card.mode).length > 0;
}

export function skip(round, rng = Math.random) {
  if (!canSkip(round)) return round;
  const slot = round.slots[round.index];
  const card = pick(unusedOfMode(round, slot.card.mode), rng);
  // The skipped card goes back into the pool for later rounds, but `used`
  // keeps it out of this round so nothing repeats within the round.
  round.used.push(card.id);
  round.slots[round.index] = { card, flipped: false, mark: null, clues: 1 };
  return round;
}

export function flip(round) {
  round.slots[round.index].flipped = true;
  return round;
}

export function mark(round, gotIt) {
  const slot = round.slots[round.index];
  if (!slot.flipped || slot.mark !== null) return round;
  slot.mark = !!gotIt;
  round.history.push(round.index);
  round.index += 1;
  return round;
}

export function undo(round) {
  const last = round.history.pop();
  if (last === undefined) return round;
  round.slots[last].mark = null;
  round.index = last;
  return round;
}

export const current = (round) => round.slots[round.index];
export const isDone = (round) => round.index >= round.slots.length;
export const score = (round) => round.slots.filter((s) => s.mark === true).length;
export const markedCount = (round) => round.slots.filter((s) => s.mark !== null).length;
