export const projects = [
  {
    id: 1,
    slug: 'agendabot',
    title: 'AgendaBot',
    tech: ['React Native', 'Node.js', 'Telegram Bot API', 'SQLite'],
    color: '#f97316',
    status: 'dev',
  },
  {
    id: 2,
    slug: 'picking',
    title: 'Picking KYLY',
    tech: ['Flutter', 'Node.js', 'HTML/CSS', 'REST API'],
    color: '#fbbf24',
    status: 'academic',
    // Galeria de telas do app, embutida no card do projeto.
    // As imagens ficam em public/picking/1.jpg ... 6.jpg
    gallery: { base: 'picking/', shots: [1, 2, 3, 4, 5, 6] },
  },
];

// Notas técnicas — conteúdo inicial, EDITE à vontade.
// Para virar links externos (Medium, dev.to, LinkedIn), preencha `url`.
export const notes = [
  {
    id: 1,
    date: '2026-05',
    tag: 'Backend',
    title: 'Do Flutter ao Python: por que mudei o foco',
    excerpt: 'Comecei como dev mobile, mas foi no backend que encontrei os problemas que mais gosto de resolver. O que pesou na decisão e o que levei do mobile comigo.',
    url: null,
  },
  {
    id: 2,
    date: '2026-04',
    tag: 'FastAPI',
    title: 'Integrações de marketplace que não quebram em produção',
    excerpt: 'Notas práticas sobre lidar com APIs de terceiros instáveis: timeouts, retries com backoff e idempotência — o que aprendi mantendo integrações no dia a dia.',
    url: null,
  },
  {
    id: 3,
    date: '2026-03',
    tag: 'Mensageria',
    title: 'Mensageria: a espinha dorsal das integrações',
    excerpt: 'Filas e eventos para sincronizar pedidos entre canais de forma assíncrona — garantindo que nada se perca quando um serviço fica fora do ar.',
    url: null,
  },
];

// Nuvem de tecnologias — ordem pensada (back-end primeiro, depois mobile/front, dados/cloud).
export const skills = [
  'Python', 'FastAPI', 'Django', 'Node.js', 'PHP', 'Laravel',
  'Flutter', 'Dart', 'React Native', 'React',
  'MySQL', 'DynamoDB', 'AWS',
];

export const experiences = [
  {
    slug: 'loopia',
    company: 'Loopia',
    companyUrl: 'https://loopia.com.br',
    period: 'dez 2025 – presente',
    tags: ['Python', 'FastAPI', 'Marketplaces'],
    current: true,
  },
  {
    slug: 'dextak',
    company: 'Dextak núcleo criativo',
    companyUrl: null,
    period: 'mai 2023 – dez 2025',
    tags: ['Flutter', 'Dart', 'Mobile'],
    current: false,
  },
];

export const education = [
  { nameKey: 'edu_unifebe_name', degreeKey: 'edu_unifebe_degree', period: '2025 – 2028' },
  { nameKey: 'edu_senai_name',   degreeKey: 'edu_senai_degree',   period: '2022 – 2023' },
];

export const links = {
  linkedin: 'https://www.linkedin.com/in/ygor-luiz-volstein-583388241/',
  email:    'ygor.volstein@loopia.com.br',
};
