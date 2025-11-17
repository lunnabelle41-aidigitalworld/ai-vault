export interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  image: string;
  rating: number;
  features: string[];
  price: 'Free' | 'Freemium' | 'Paid' | 'Open Source';
  tags: string[];
}

export const tools: Tool[] = [
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design',
    description: 'The collaborative interface design tool',
    url: 'https://figma.com',
    image: '/tools/figma.jpg',
    rating: 4.8,
    features: ['Real-time collaboration', 'Prototyping', 'Design systems', 'Plugins'],
    price: 'Freemium',
    tags: ['UI/UX', 'Design', 'Collaboration']
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'Productivity',
    description: 'All-in-one workspace for notes, docs, and tasks',
    url: 'https://notion.so',
    image: '/tools/notion.jpg',
    rating: 4.7,
    features: ['Note-taking', 'Project management', 'Databases', 'Templates'],
    price: 'Freemium',
    tags: ['Productivity', 'Organization', 'Notes']
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'Development',
    description: 'Code editing redefined',
    url: 'https://code.visualstudio.com',
    image: '/tools/vscode.jpg',
    rating: 4.9,
    features: ['IntelliSense', 'Debugging', 'Git integration', 'Extensions'],
    price: 'Free',
    tags: ['Code Editor', 'Development', 'Open Source']
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'Design',
    description: 'Design anything, publish anywhere',
    url: 'https://canva.com',
    image: '/tools/canva.jpg',
    rating: 4.6,
    features: ['Templates', 'Stock photos', 'Collaboration', 'Brand kit'],
    price: 'Freemium',
    tags: ['Graphic Design', 'Templates', 'Marketing']
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Development',
    description: "The world's leading software development platform",
    url: 'https://github.com',
    image: '/tools/github.jpg',
    rating: 4.8,
    features: ['Version control', 'CI/CD', 'Project management', 'Code review'],
    price: 'Freemium',
    tags: ['Code', 'Collaboration', 'Open Source']
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    description: 'Where work happens',
    url: 'https://slack.com',
    image: '/tools/slack.jpg',
    rating: 4.5,
    features: ['Team chat', 'File sharing', 'Integrations', 'Voice/Video calls'],
    price: 'Freemium',
    tags: ['Communication', 'Teamwork', 'Productivity']
  }
];

export const categories = [
  'All',
  'Design',
  'Development',
  'Productivity',
  'Marketing',
  'Communication',
  'AI',
  'Analytics'
];
