// Stand-in pictures for the prototype. In the real product these are archive
// photos (toned) or licensed recreated art. Each scene is a 400x300 SVG drawn
// to fill its box (slice), so one drawing works as a poster, header or thumbnail.

const scenes = {
  molasses: () => `
<rect width="400" height="300" fill="#1E3A5F"/>
<circle cx="322" cy="62" r="24" fill="#3A6694"/>
<g fill="#16304F"><rect x="0" y="118" width="52" height="120"/><rect x="52" y="92" width="40" height="146"/><rect x="232" y="104" width="44" height="134"/><rect x="276" y="78" width="36" height="160"/><rect x="312" y="114" width="88" height="124"/></g>
<g fill="#2F5683"><rect x="62" y="104" width="6" height="8"/><rect x="76" y="104" width="6" height="8"/><rect x="286" y="92" width="6" height="8"/><rect x="298" y="92" width="6" height="8"/><rect x="326" y="128" width="6" height="8"/><rect x="344" y="128" width="6" height="8"/><rect x="362" y="128" width="6" height="8"/></g>
<rect x="0" y="150" width="400" height="8" fill="#0F2238"/>
<g fill="#0F2238"><rect x="20" y="158" width="5" height="80"/><rect x="215" y="158" width="5" height="80"/><rect x="265" y="158" width="5" height="80"/><rect x="330" y="158" width="5" height="80"/><rect x="385" y="158" width="5" height="80"/></g>
<rect x="104" y="110" width="102" height="124" fill="#7C8DA6"/>
<ellipse cx="155" cy="110" rx="51" ry="10" fill="#93A3BA"/>
<g stroke="#5F7088" stroke-width="2"><line x1="104" y1="140" x2="206" y2="140"/><line x1="104" y1="170" x2="206" y2="170"/><line x1="104" y1="200" x2="206" y2="200"/></g>
<path d="M150 104 L164 148 L146 176 L168 236 L210 236 L210 104Z" fill="#1E3A5F"/>
<g fill="#93A3BA"><rect x="196" y="96" width="16" height="7" transform="rotate(28 204 99)"/><rect x="222" y="128" width="12" height="6" transform="rotate(-20 228 131)"/><rect x="180" y="74" width="10" height="5" transform="rotate(40 185 76)"/></g>
<path d="M0 300V236C60 216 110 190 170 206S280 252 330 226 380 200 400 206V300Z" fill="#6B3A10"/>
<path d="M0 300V256C70 242 120 230 180 240S290 270 340 252 390 238 400 240V300Z" fill="#8A4B12"/>
<path d="M150 196C176 190 196 198 214 212" stroke="#C9792B" stroke-width="6" fill="none" stroke-linecap="round"/>`,

  tank: () => `
<rect width="400" height="300" fill="#2A5078"/>
<rect y="236" width="400" height="64" fill="#16304F"/>
<rect x="110" y="90" width="150" height="146" fill="#8FA0B8"/>
<ellipse cx="185" cy="90" rx="75" ry="14" fill="#A9B7CB"/>
<g stroke="#5F7088" stroke-width="2"><line x1="110" y1="126" x2="260" y2="126"/><line x1="110" y1="162" x2="260" y2="162"/><line x1="110" y1="198" x2="260" y2="198"/></g>
<g stroke="#0F2238" stroke-width="4"><line x1="96" y1="70" x2="96" y2="236"/><line x1="274" y1="70" x2="274" y2="236"/><line x1="96" y1="110" x2="274" y2="110"/><line x1="96" y1="180" x2="274" y2="180"/><line x1="96" y1="110" x2="130" y2="180"/><line x1="240" y1="110" x2="274" y2="180"/></g>
<g stroke="#F2B33D" stroke-width="6" stroke-linecap="round"><line x1="330" y1="236" x2="330" y2="40"/><line x1="250" y1="48" x2="390" y2="48"/></g>
<line x1="270" y1="48" x2="270" y2="96" stroke="#0F2238" stroke-width="2"/>
<rect x="262" y="96" width="16" height="10" fill="#0F2238"/>`,

  court: () => `
<rect width="400" height="300" fill="#2B3A55"/>
<path d="M80 110 L200 52 L320 110Z" fill="#B7C3D6"/>
<rect x="88" y="110" width="224" height="14" fill="#9DAAC0"/>
<g fill="#C9D3E2"><rect x="104" y="128" width="20" height="104"/><rect x="146" y="128" width="20" height="104"/><rect x="188" y="128" width="20" height="104"/><rect x="230" y="128" width="20" height="104"/><rect x="272" y="128" width="20" height="104"/></g>
<rect x="80" y="232" width="240" height="12" fill="#9DAAC0"/>
<rect x="66" y="244" width="268" height="12" fill="#7F8DA6"/>
<rect y="256" width="400" height="44" fill="#1B263A"/>
<circle cx="200" cy="88" r="10" fill="#2B3A55"/>`,

  harbor: () => `
<rect width="400" height="300" fill="#24476F"/>
<g fill="#16304F"><rect x="0" y="110" width="60" height="100"/><rect x="60" y="90" width="44" height="120"/><rect x="104" y="120" width="70" height="90"/></g>
<rect y="200" width="400" height="100" fill="#6B3A10"/>
<path d="M0 214C80 206 160 222 240 212S360 204 400 210" stroke="#8A4B12" stroke-width="8" fill="none"/>
<path d="M230 196 H380 L366 222 H244Z" fill="#B7C3D6"/>
<rect x="290" y="166" width="46" height="30" fill="#93A3BA"/>
<rect x="304" y="140" width="10" height="26" fill="#2B3A55"/>
<path d="M290 176 C250 130 190 120 120 150" stroke="#BFE3F2" stroke-width="7" fill="none" stroke-linecap="round" stroke-dasharray="2 12"/>
<path d="M292 182 C246 146 180 150 110 182" stroke="#BFE3F2" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="2 10"/>`,

  emu: () => `
<rect width="400" height="300" fill="#E2A541"/>
<circle cx="86" cy="76" r="34" fill="#F3D08A"/>
<path d="M0 192C80 172 160 182 240 174S360 170 400 177V300H0Z" fill="#C98A2C"/>
<path d="M0 216C100 206 300 211 400 206V300H0Z" fill="#A8721F"/>
<g stroke="#8C5E17" stroke-width="3" stroke-linecap="round"><line x1="20" y1="240" x2="24" y2="226"/><line x1="50" y1="262" x2="55" y2="246"/><line x1="90" y1="236" x2="93" y2="222"/><line x1="140" y1="270" x2="146" y2="252"/><line x1="330" y1="246" x2="334" y2="230"/><line x1="370" y1="272" x2="376" y2="254"/></g>
<g fill="#5A3A12"><rect x="18" y="186" width="5" height="34"/><rect x="66" y="184" width="5" height="34"/><rect x="114" y="182" width="5" height="34"/></g>
<line x1="18" y1="196" x2="119" y2="192" stroke="#5A3A12" stroke-width="2"/>
<g fill="#2B1A08"><ellipse cx="255" cy="172" rx="58" ry="40"/><path d="M200 158 Q182 178 204 196Z"/><ellipse cx="315" cy="76" rx="13" ry="10"/><path d="M326 73 L342 78 L326 83Z"/></g>
<path d="M292 158 C300 128 300 104 310 82" stroke="#2B1A08" stroke-width="13" fill="none" stroke-linecap="round"/>
<circle cx="317" cy="73" r="2.6" fill="#E2A541"/>
<path d="M238 206 L228 262 L216 267 M270 206 L284 258 L297 262" stroke="#2B1A08" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,

  field: () => `
<rect width="400" height="300" fill="#F0BE5E"/>
<circle cx="300" cy="84" r="40" fill="#F8DC9C"/>
<path d="M0 170C100 156 260 166 400 158V300H0Z" fill="#C98A2C"/>
<path d="M0 200C120 192 280 198 400 190V300H0Z" fill="#A8721F"/>
<g stroke="#8C5E17" stroke-width="3" stroke-linecap="round"><line x1="30" y1="230" x2="34" y2="214"/><line x1="80" y1="256" x2="85" y2="238"/><line x1="130" y1="226" x2="134" y2="210"/><line x1="200" y1="262" x2="206" y2="244"/><line x1="260" y1="232" x2="264" y2="216"/><line x1="320" y1="258" x2="326" y2="240"/><line x1="370" y1="228" x2="374" y2="212"/></g>
<g fill="#5A3A12"><rect x="150" y="128" width="60" height="40"/><path d="M144 130 L180 104 L216 130Z"/><rect x="172" y="146" width="14" height="22" fill="#2B1A08"/></g>`,

  truck: () => `
<rect width="400" height="300" fill="#D8963A"/>
<path d="M0 200C120 190 280 196 400 188V300H0Z" fill="#A8721F"/>
<g fill="#3B2A1A"><rect x="80" y="150" width="150" height="50" rx="4"/><rect x="230" y="128" width="70" height="72" rx="6"/><rect x="244" y="138" width="40" height="26" fill="#D8963A"/></g>
<g fill="#1E140A"><circle cx="120" cy="206" r="20"/><circle cx="262" cy="206" r="20"/></g>
<g fill="#6B5440"><circle cx="120" cy="206" r="7"/><circle cx="262" cy="206" r="7"/></g>
<rect x="120" y="118" width="12" height="32" fill="#3B2A1A"/>
<path d="M126 122 L40 100" stroke="#3B2A1A" stroke-width="9" stroke-linecap="round"/>
<g fill="#2B1A08"><ellipse cx="34" cy="168" rx="16" ry="11"/><path d="M44 160 C48 148 48 140 52 132" stroke="#2B1A08" stroke-width="5" fill="none"/></g>`,

  dancing: () => `
<rect width="400" height="300" fill="#5B2147"/>
<circle cx="330" cy="56" r="22" fill="#F7C6E0"/>
<path d="M190 30 L206 140 L174 140Z" fill="#2E0F24"/>
<rect x="172" y="140" width="36" height="92" fill="#2E0F24"/>
<path d="M0 232V170L30 140L60 170V150L95 114L130 150V232Z" fill="#2E0F24"/>
<path d="M230 232V160L262 128L294 160V146L326 112L360 146L400 122V232Z" fill="#2E0F24"/>
<g fill="#F2B33D"><rect x="22" y="180" width="8" height="10"/><rect x="88" y="160" width="8" height="10"/><rect x="104" y="186" width="8" height="10"/><rect x="252" y="170" width="8" height="10"/><rect x="320" y="156" width="8" height="10"/><rect x="186" y="166" width="8" height="12"/></g>
<rect y="232" width="400" height="68" fill="#3D1530"/>
<g stroke="#F9A8D4" stroke-width="7" stroke-linecap="round" fill="none">
<path d="M118 222 L124 256"/><path d="M119 230 L98 206 M119 230 L142 212"/><path d="M124 256 L108 286 M124 256 L146 278"/>
<path d="M200 226 L198 260"/><path d="M200 234 L178 222 M200 234 L220 210"/><path d="M198 260 L184 288 M198 260 L214 288"/>
<path d="M282 220 L276 254"/><path d="M281 228 L262 208 M281 228 L302 220"/><path d="M276 254 L262 278 M276 254 L296 284"/></g>
<g fill="#F9A8D4"><circle cx="116" cy="210" r="9"/><circle cx="201" cy="214" r="9"/><circle cx="284" cy="208" r="9"/></g>`,

  stage: () => `
<rect width="400" height="300" fill="#6A2853"/>
<path d="M0 200V140L40 110L80 140V120L120 90L160 120V200Z M240 200V130L280 100L320 130L360 106L400 130V200Z" fill="#2E0F24"/>
<rect x="90" y="196" width="220" height="24" fill="#8B5A2B"/>
<g fill="#5E3818"><rect x="100" y="220" width="10" height="40"/><rect x="290" y="220" width="10" height="40"/><rect x="196" y="220" width="10" height="40"/></g>
<rect y="260" width="400" height="40" fill="#3D1530"/>
<g fill="#F9A8D4"><circle cx="140" cy="160" r="9"/><circle cx="200" cy="156" r="9"/><circle cx="260" cy="160" r="9"/></g>
<g stroke="#F9A8D4" stroke-width="7" stroke-linecap="round"><path d="M140 170 V194"/><path d="M200 166 V194"/><path d="M260 170 V194"/></g>
<path d="M150 176 L170 170" stroke="#F2B33D" stroke-width="5" stroke-linecap="round"/>
<path d="M190 176 Q178 186 190 194" stroke="#F2B33D" stroke-width="5" fill="none"/>
<path d="M250 176 L232 168" stroke="#F2B33D" stroke-width="5" stroke-linecap="round"/>
<g fill="#F2B33D"><circle cx="70" cy="60" r="4"/><circle cx="330" cy="70" r="4"/><circle cx="200" cy="40" r="4"/></g>`,

  shrine: () => `
<rect width="400" height="300" fill="#4A1C3D"/>
<path d="M0 300V180C80 120 160 90 240 110S360 170 400 160V300Z" fill="#2E0F24"/>
<rect x="190" y="70" width="60" height="50" fill="#7A3A64"/>
<path d="M182 72 L220 40 L258 72Z" fill="#9C5585"/>
<rect x="212" y="92" width="16" height="28" fill="#F2B33D"/>
<rect x="217" y="18" width="6" height="26" fill="#9C5585"/><rect x="210" y="26" width="20" height="6" fill="#9C5585"/>
<path d="M40 300 C90 240 150 180 205 124" stroke="#F2B33D" stroke-width="3" stroke-dasharray="6 8" fill="none"/>
<g fill="#F9A8D4"><circle cx="80" cy="250" r="7"/><circle cx="110" cy="222" r="7"/><circle cx="140" cy="194" r="7"/></g>`,

  door: () => `
<rect width="400" height="300" fill="#3D2A4F"/>
<rect x="110" y="40" width="180" height="260" fill="#2A1C38"/>
<path d="M110 40 Q200 -10 290 40Z" fill="#2A1C38"/>
<rect x="134" y="70" width="132" height="230" rx="66" fill="#6B4423"/>
<line x1="200" y1="80" x2="200" y2="300" stroke="#4A2E17" stroke-width="4"/>
<rect x="214" y="130" width="46" height="62" fill="#F3E9D2"/>
<g stroke="#8A7B66" stroke-width="2"><line x1="220" y1="142" x2="254" y2="142"/><line x1="220" y1="150" x2="254" y2="150"/><line x1="220" y1="158" x2="250" y2="158"/><line x1="220" y1="166" x2="254" y2="166"/><line x1="220" y1="174" x2="246" y2="174"/></g>
<circle cx="237" cy="134" r="3" fill="#2B1D12"/>
<g fill="#C9A227"><circle cx="186" cy="200" r="6"/><circle cx="214" cy="200" r="6"/></g>`,

  town: () => `
<rect width="400" height="300" fill="#4B2A3C"/>
<circle cx="80" cy="60" r="20" fill="#C9A6B8"/>
<path d="M0 240V170L36 136L72 170V150L110 112L148 150V240Z M160 240V120L200 60L240 120V240Z M250 240V160L290 124L330 160L360 136L400 160V240Z" fill="#26131F"/>
<g fill="#8A6B7C"><rect x="20" y="186" width="10" height="12"/><rect x="100" y="166" width="10" height="12"/><rect x="194" y="150" width="12" height="16"/><rect x="290" y="180" width="10" height="12"/></g>
<rect y="240" width="400" height="60" fill="#331A28"/>
<g fill="#26131F"><ellipse cx="120" cy="262" rx="26" ry="8"/><ellipse cx="300" cy="266" rx="30" ry="8"/></g>`,

  portrait: (o) => `
<rect width="400" height="300" fill="${o.bg || '#3F424D'}"/>
<path d="M70 300 C80 232 140 212 200 212 S320 232 330 300Z" fill="#0E0F13"/>
<rect x="180" y="176" width="40" height="44" fill="#0E0F13"/>
<ellipse cx="200" cy="148" rx="44" ry="52" fill="#0E0F13"/>
${o.hat === 'cap' ? `<path d="M150 118 C152 78 248 78 250 118Z" fill="#0E0F13"/><path d="M140 120 H262 L250 134 H150Z" fill="#23252D"/>` : ''}
${o.hat === 'top' ? `<rect x="160" y="40" width="80" height="66" fill="#0E0F13"/><rect x="134" y="104" width="132" height="12" rx="4" fill="#0E0F13"/>` : ''}
${o.hat === 'bonnet' ? `<path d="M140 160 C130 70 270 70 260 160 C250 120 150 120 140 160Z" fill="#23252D"/>` : ''}
${o.hat === 'beret' ? `<ellipse cx="196" cy="102" rx="60" ry="20" fill="#23252D"/>` : ''}
<path d="M200 220 L176 300 M200 220 L224 300" stroke="#2A2D37" stroke-width="5"/>`,
};

export function art(name, opts = {}) {
  const draw = scenes[name] || scenes.town;
  const label = opts.label ? ` role="img" aria-label="${opts.label}"` : ' aria-hidden="true"';
  // 'meet' shows the whole drawing (used for portraits in wide headers, where
  // 'slice' would cut off the head); the box behind it shares the background.
  const fit = opts.fit === 'meet' ? 'xMidYMax meet' : 'xMidYMid slice';
  return `<svg class="art" viewBox="0 0 400 300" preserveAspectRatio="${fit}"${label}>${draw(opts)}</svg>`;
}
