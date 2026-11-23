// What the phone remembers. Per the spec: the ticked stories and which stories
// have been played. Plus a few one-time UI flags (coach panel, install prompt).
// No scores are ever stored.

const KEY = 'history-cards.v1';

const defaults = () => ({
  ticks: [],
  played: [],
  coachSeen: false,
  roundsDone: 0,
  install: { dismissals: 0, installed: false },
});

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults();
    return { ...defaults(), ...JSON.parse(raw) };
  } catch {
    return defaults();
  }
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Private mode or blocked storage: the app still works, it just forgets.
  }
}

export const store = {
  get: () => state,
  update(fn) {
    fn(state);
    save();
  },
  reset() {
    state = defaults();
    save();
  },
};
