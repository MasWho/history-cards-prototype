const s = (d, w = 2.4, size = 18, extra = '') =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra}>${d}</svg>`;

export const icon = {
  check: (size = 16) => s('<path d="M5 12.5l4.5 4.5L19 7"/>', 3.2, size),
  x: (size = 18) => s('<path d="M6 6l12 12M18 6L6 18"/>', 2.6, size),
  play: (size = 15) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4v16l13-8z"/></svg>`,
  skip: (size = 14) => s('<path d="M5 5l9 7-9 7zM19 5v14"/>', 2.4, size),
  flip: (size = 18) => s('<path d="M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5"/>', 2, size),
  plus: (size = 14) => s('<path d="M12 5v14M5 12h14"/>', 2.6, size),
  up: (size = 18) => s('<path d="M6 15l6-6 6 6"/>', 3, size),
  down: (size = 18) => s('<path d="M6 9l6 6 6-6"/>', 3, size),
  arrowRight: (size = 20) => s('<path d="M4 12h16M14 6l6 6-6 6"/>', 2, size),
  arrowDown: (size = 24) => s('<path d="M12 4v14M6 12l6 6 6-6"/>', 2.6, size),
  mic: (size = 20) => s('<path d="M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3"/>', 2, size),
  phone: (size = 22) => s('<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>', 2, size),
  share: (size = 18) => s('<path d="M12 3v12M8 7l4-4 4 4M5 11v9h14v-9"/>', 2, size),
  addBox: (size = 16) => s('<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 8v8M8 12h8"/>', 2, size),
  download: (size = 20) => s('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>', 2.4, size),
  copy: (size = 18) => s('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/>', 2, size),
};
