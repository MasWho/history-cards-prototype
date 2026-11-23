// Prototype card data: three stories, 10 cards each (2 per mode).
// SAMPLE COPY for testing the app and its flow. It has not been fact-checked.
// Every picture in the prototype is a drawing, so every card is tagged RECREATED.

export const MODES = ['timeline', 'hilo', 'truths', 'next', 'who'];

export const MODE_INFO = {
  timeline: { label: 'Timeline', color: '#60A5FA' },
  hilo: { label: 'Higher or lower', color: '#FBBF24' },
  truths: { label: 'Two truths and a lie', color: '#F472B6' },
  next: { label: 'What happened next?', color: '#34D399' },
  who: { label: 'Who am I?', color: '#A78BFA' },
};

export const STORIES = [
  {
    id: 'molasses',
    title: 'The Boston Molasses Flood',
    year: '1919',
    art: 'molasses',
    newest: true,
    video: 'https://www.youtube.com/results?search_query=Boston+Molasses+Flood',
    source: 'Stephen Puleo, Dark Tide (2003)',
  },
  {
    id: 'emu',
    title: 'The Great Emu War',
    year: '1932',
    art: 'emu',
    video: 'https://www.youtube.com/results?search_query=Great+Emu+War',
    source: 'Murray Johnson, "Feathered foes", Journal of Australian Studies (2006)',
  },
  {
    id: 'dancing',
    title: 'The Dancing Plague',
    year: '1518',
    art: 'dancing',
    video: 'https://www.youtube.com/results?search_query=Dancing+Plague+1518',
    source: 'John Waller, A Time to Dance, a Time to Die (2008)',
  },
];

const P = (name, hat, bg) => ({ name, hat, bg });

export const CARDS = [
  // ---------- The Boston Molasses Flood ----------
  {
    id: 'mol-tl-1', story: 'molasses', mode: 'timeline', art: 'molasses',
    front: { prompt: 'Put these in order, earliest first', events: [
      { text: "A court rules that the tank's owner must pay damages", art: 'court', year: '1925' },
      { text: 'A 2.3-million-gallon molasses tank goes up on Commercial Street', art: 'tank', year: '1915' },
      { text: "A wave of molasses floods Boston's North End", art: 'molasses', year: '1919' },
    ] },
    back: { order: [1, 2, 0], reveal: 'The tank leaked from the day it was first filled. It burst four years later, and the court case that followed ran for six years.' },
  },
  {
    id: 'mol-tl-2', story: 'molasses', mode: 'timeline', art: 'tank',
    front: { prompt: 'Put these in order, earliest first', events: [
      { text: 'Neighbours collect molasses leaking from the new tank', art: 'tank', year: '1915' },
      { text: 'Boston starts asking engineers to sign off on building plans', art: 'court', year: '1920s' },
      { text: 'Fireboats hose the streets with sea water', art: 'harbor', year: '1919' },
    ] },
    back: { order: [0, 2, 1], reveal: 'Families brought cans to catch the drips. After the disaster, cities across the US tightened the rules on who could sign off a structure.' },
  },
  {
    id: 'mol-hl-1', story: 'molasses', mode: 'hilo', art: 'molasses',
    front: { question: 'How fast did the wave of molasses move?', n: '20', unit: 'mph' },
    back: { answer: 'Higher', value: 'About 35 mph (56 km/h)', reveal: 'When the tank burst on 15 January 1919, a wave up to 25 feet high tore through the North End faster than people could run.' },
  },
  {
    id: 'mol-hl-2', story: 'molasses', mode: 'hilo', art: 'harbor',
    front: { question: 'How many people died in the flood?', n: '50', unit: 'people' },
    back: { answer: 'Lower', value: '21 people', reveal: 'The flood killed 21 people and injured about 150. Many of the victims were trapped as the molasses cooled and thickened.' },
  },
  {
    id: 'mol-tr-1', story: 'molasses', mode: 'truths', art: 'tank',
    front: { statements: [
      'The tank held about 2.3 million gallons',
      'Much of the molasses was meant for making alcohol for munitions',
      'The flood happened on a hot summer day',
    ] },
    back: { lie: 2, reveal: 'It was 15 January. The day was unusually warm for a Boston winter, which some think helped the tank give way.' },
  },
  {
    id: 'mol-tr-2', story: 'molasses', mode: 'truths', art: 'harbor',
    front: { statements: [
      'Horses were trapped in the molasses',
      'The harbour stayed brown for months',
      "The tank's owner admitted fault straight away",
    ] },
    back: { lie: 2, reveal: 'The company claimed anarchists had blown up the tank. It took six years in court before it was found responsible.' },
  },
  {
    id: 'mol-nx-1', story: 'molasses', mode: 'next', art: 'court',
    front: { setup: 'More than 100 people sue the company that owned the tank. In court, the company argues the tank…', options: [
      'was blown up by anarchists', 'was struck by lightning', 'was hit by a passing train',
    ] },
    back: { answer: 0, reveal: 'Bombings by anarchists were in the news, so the company blamed them. The court-appointed auditor did not believe it.' },
  },
  {
    id: 'mol-nx-2', story: 'molasses', mode: 'next', art: 'harbor',
    front: { setup: "The streets are coated in a sticky layer that won't shift. To clear it, crews mostly…", options: [
      'set the molasses on fire', 'hose it down with sea water from the harbour', 'let it harden and chip it away',
    ] },
    back: { answer: 1, reveal: 'Salt water cut through the molasses. Fireboats pumped it from the harbour for weeks, and the water ran brown.' },
  },
  {
    id: 'mol-wh-1', story: 'molasses', mode: 'who', art: 'court',
    front: { clues: [
      'I was a Boston lawyer and a veteran of the First World War.',
      'The court appointed me to hear the flood case.',
      'I listened to evidence for nearly three years.',
      'In 1925 I ruled that the company was to blame.',
    ], names: [P('Hugh Ogden', 'top', '#1E3A5F'), P('Arthur Jell', 'top', '#2B3A55'), P('Calvin Coolidge', 'top', '#24476F'), P('Andrew Peters', 'top', '#3A4A66')] },
    back: { answer: 0, reveal: "Hugh Ogden was the court's auditor. His report rejected the bomb theory and blamed the tank's poor construction." },
  },
  {
    id: 'mol-wh-2', story: 'molasses', mode: 'who', art: 'tank',
    front: { clues: [
      'I worked for the company that owned the tank.',
      'I was put in charge of building it.',
      "I couldn't read the engineering plans.",
      'I ignored reports that the tank was leaking.',
    ], names: [P('Hugh Ogden', 'top', '#1E3A5F'), P('Arthur Jell', 'top', '#2B3A55'), P('Calvin Coolidge', 'top', '#24476F'), P('Andrew Peters', 'top', '#3A4A66')] },
    back: { answer: 1, reveal: 'Arthur Jell was a company treasurer, not an engineer. The tank was never tested by being filled with water before use.' },
  },

  // ---------- The Great Emu War ----------
  {
    id: 'emu-tl-1', story: 'emu', mode: 'timeline', art: 'emu',
    front: { prompt: 'Put these in order, earliest first', events: [
      { text: 'Ex-soldiers are given wheat farms in Western Australia', art: 'field', year: '1920s' },
      { text: 'The soldiers are pulled out for the first time', art: 'truck', year: 'Nov 1932' },
      { text: 'About 20,000 emus move into the farmland', art: 'emu', year: 'Oct 1932' },
    ] },
    back: { order: [0, 2, 1], reveal: "Many of the farmers were veterans of the First World War. When the emus arrived after breeding season, they asked the army for help." },
  },
  {
    id: 'emu-tl-2', story: 'emu', mode: 'timeline', art: 'truck',
    front: { prompt: 'Put these in order, earliest first', events: [
      { text: 'The minister withdraws the troops after bad press', art: 'court', year: '8 Nov 1932' },
      { text: 'The troops return for a second try', art: 'truck', year: '13 Nov 1932' },
      { text: 'Troops arrive with two machine guns', art: 'field', year: '2 Nov 1932' },
    ] },
    back: { order: [2, 0, 1], reveal: 'The first attempt lasted under a week. Farmers complained, and the soldiers went back a few days later.' },
  },
  {
    id: 'emu-hl-1', story: 'emu', mode: 'hilo', art: 'emu',
    front: { question: 'How many emus moved into the farming area?', n: '5,000', unit: 'emus' },
    back: { answer: 'Higher', value: 'About 20,000', reveal: 'Around 20,000 emus came looking for water and food, and flattened the wheat crops as they went.' },
  },
  {
    id: 'emu-hl-2', story: 'emu', mode: 'hilo', art: 'truck',
    front: { question: 'How many rounds of ammunition did the troops fire?', n: '20,000', unit: 'rounds' },
    back: { answer: 'Lower', value: '9,860 rounds', reveal: 'Major Meredith reported firing 9,860 rounds and claimed 986 kills, about ten bullets for every bird.' },
  },
  {
    id: 'emu-tr-1', story: 'emu', mode: 'truths', art: 'emu',
    front: { statements: [
      'The army sent two Lewis machine guns',
      'One gun was fixed to a truck to chase the birds',
      'The soldiers killed more than 20,000 emus',
    ] },
    back: { lie: 2, reveal: 'The official count was 986 emus. Most of the flock scattered and survived.' },
  },
  {
    id: 'emu-tr-2', story: 'emu', mode: 'truths', art: 'field',
    front: { statements: [
      'The commander compared the emus to tanks',
      'Each flock seemed to have a lookout bird',
      'The air force dropped bombs on the emus',
    ] },
    back: { lie: 2, reveal: 'No aircraft were used. Meredith did say the birds could face machine guns with the invulnerability of tanks.' },
  },
  {
    id: 'emu-nx-1', story: 'emu', mode: 'next', art: 'court',
    front: { setup: 'After a few days of failure, newspapers start to mock the operation. The Defence Minister…', options: [
      'sends in more troops', 'pulls the soldiers out', 'offers farmers a cash reward instead',
    ] },
    back: { answer: 1, reveal: 'Sir George Pearce withdrew the troops on 8 November. He sent them back days later after farmers pleaded for help.' },
  },
  {
    id: 'emu-nx-2', story: 'emu', mode: 'next', art: 'field',
    front: { setup: 'In later years, farmers ask for the army again. The government…', options: [
      'sends a bigger force in 1934', 'says no, and gives farmers ammunition instead', 'builds a wall across the state',
    ] },
    back: { answer: 1, reveal: 'Later requests for troops were turned down. Farmers were supplied with ammunition, and a bounty system followed.' },
  },
  {
    id: 'emu-wh-1', story: 'emu', mode: 'who', art: 'field',
    front: { clues: [
      'I was a major in the Royal Australian Artillery.',
      "In 1932 I led two soldiers into Western Australia's wheat fields.",
      'We were armed with two Lewis guns.',
      'I said the birds could face machine guns like tanks.',
    ], names: [P('Sir George Pearce', 'top', '#5A3A12'), P('Major Meredith', 'cap', '#8C5E17'), P('Sir John Monash', 'cap', '#6B4A1E'), P('Joseph Lyons', 'top', '#7A5520')] },
    back: { answer: 1, reveal: 'Major G. P. W. Meredith led the operation. His report of the "battle" made him briefly famous.' },
  },
  {
    id: 'emu-wh-2', story: 'emu', mode: 'who', art: 'court',
    front: { clues: [
      "I was Australia's Minister for Defence in 1932.",
      'I agreed to send soldiers against birds.',
      'In parliament I was called "Minister of the Emu War".',
      'I pulled the troops out after bad press.',
    ], names: [P('Sir George Pearce', 'top', '#5A3A12'), P('Major Meredith', 'cap', '#8C5E17'), P('Sir John Monash', 'cap', '#6B4A1E'), P('Joseph Lyons', 'top', '#7A5520')] },
    back: { answer: 0, reveal: 'Sir George Pearce approved the operation on the condition that farmers fed and housed the soldiers.' },
  },

  // ---------- The Dancing Plague ----------
  {
    id: 'dan-tl-1', story: 'dancing', mode: 'timeline', art: 'dancing',
    front: { prompt: 'Put these in order, earliest first', events: [
      { text: 'The council hires musicians and builds a stage', art: 'stage', year: 'Summer 1518' },
      { text: 'Dancers are taken to a shrine in the hills', art: 'shrine', year: 'Late summer 1518' },
      { text: 'A woman starts dancing in the street and can\'t stop', art: 'dancing', year: 'July 1518' },
    ] },
    back: { order: [2, 0, 1], reveal: 'It started with one woman. Within weeks dozens had joined, and the city tried music before turning to prayer.' },
  },
  {
    id: 'dan-tl-2', story: 'dancing', mode: 'timeline', art: 'town',
    front: { prompt: 'Put these in order, earliest first', events: [
      { text: 'The dancing plague breaks out in Strasbourg', art: 'dancing', year: '1518' },
      { text: 'Strasbourg suffers years of famine and disease', art: 'town', year: '1510s' },
      { text: 'Martin Luther posts his 95 Theses', art: 'door', year: '1517' },
    ] },
    back: { order: [1, 2, 0], reveal: 'Hunger, illness and religious upheaval came first. Many historians think that stress set the stage for the dancing.' },
  },
  {
    id: 'dan-hl-1', story: 'dancing', mode: 'hilo', art: 'dancing',
    front: { question: 'How many people may have joined the dancing?', n: '100', unit: 'people' },
    back: { answer: 'Higher', value: 'Up to about 400', reveal: 'Accounts differ, but some chroniclers say as many as 400 people danced over the summer.' },
  },
  {
    id: 'dan-hl-2', story: 'dancing', mode: 'hilo', art: 'town',
    front: { question: 'How long did the dancing plague last?', n: '6', unit: 'months' },
    back: { answer: 'Lower', value: 'About two months', reveal: 'It began in July and had died down by early September, once dancers were sent to the shrine.' },
  },
  {
    id: 'dan-tr-1', story: 'dancing', mode: 'truths', art: 'dancing',
    front: { statements: [
      'It began with a single woman',
      'Doctors said the cure was more dancing',
      'All the dancers were children',
    ] },
    back: { lie: 2, reveal: 'Most of the dancers were adults. The doctors blamed "hot blood" and prescribed dancing it out.' },
  },
  {
    id: 'dan-tr-2', story: 'dancing', mode: 'truths', art: 'town',
    front: { statements: [
      'The city banned gambling in response',
      'Some dancers were said to have died',
      'Strasbourg was part of Spain at the time',
    ] },
    back: { lie: 2, reveal: 'Strasbourg was a free city of the Holy Roman Empire. The council banned gambling and other "sins" to win back God\'s favour.' },
  },
  {
    id: 'dan-nx-1', story: 'dancing', mode: 'next', art: 'dancing',
    front: { setup: "Strasbourg, July 1518. Dozens of people have danced in the streets for days and can't stop. The city council decides to…", options: [
      'ban all music in the city', 'hire musicians and build a stage', 'lock the dancers outside the walls',
    ] },
    back: { answer: 1, reveal: 'Doctors advised that the dancers had to dance it out. The music only drew more people in.' },
  },
  {
    id: 'dan-nx-2', story: 'dancing', mode: 'next', art: 'stage',
    front: { setup: 'The music makes things worse, and more people join every day. The council then…', options: [
      'bans public dancing and sends the dancers to a shrine', 'hires even more musicians', 'holds a dancing contest',
    ] },
    back: { answer: 0, reveal: 'Dancers were taken to a shrine of St Vitus, given red shoes and prayed over. The outbreak faded soon after.' },
  },
  {
    id: 'dan-wh-1', story: 'dancing', mode: 'who', art: 'town',
    front: { clues: [
      'I lived in Strasbourg.',
      'One July day in 1518 I started dancing in the street.',
      'I danced for days, and others joined me.',
      'Chroniclers remember me as the first dancer.',
    ], names: [P('Frau Troffea', 'bonnet', '#5B2147'), P('Paracelsus', 'beret', '#6A2853'), P('Sebastian Brant', 'beret', '#4B2A3C'), P('Martin Luther', 'beret', '#3D1530')] },
    back: { answer: 0, reveal: 'Frau Troffea is named in later accounts as the woman who began it. Little else is known about her.' },
  },
  {
    id: 'dan-wh-2', story: 'dancing', mode: 'who', art: 'door',
    front: { clues: [
      'I was a Swiss doctor and alchemist.',
      'I visited Strasbourg a few years after the plague.',
      'I wrote that the first dancer did it to annoy her husband.',
      'My real name was Theophrastus von Hohenheim.',
    ], names: [P('Frau Troffea', 'bonnet', '#5B2147'), P('Paracelsus', 'beret', '#6A2853'), P('Sebastian Brant', 'beret', '#4B2A3C'), P('Albrecht Dürer', 'beret', '#3D1530')] },
    back: { answer: 1, reveal: "Paracelsus's account is the source of the story about Frau Troffea's husband. Historians treat it with caution." },
  },
];

export const LETTERS = ['A', 'B', 'C', 'D'];

export function storyById(id) {
  return STORIES.find((s) => s.id === id);
}
