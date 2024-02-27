import type { RecentSurveyType, StatType } from '#components/dashboard/types';

const stats: StatType[] = [
  {
    title: 'Surveys created',
    value: 0,
    percentage: 0,
    trend: 'none',
  },
  {
    title: 'Survey responses this month',
    value: 10,
    percentage: 100,
    trend: 'up',
  },
  {
    title: 'Question views this month',
    value: 0,
    percentage: -100,
    trend: 'down',
  },
  {
    title: 'Question engagement rate',
    value: 0,
    valueUnit: '%',
    trend: 'none',
    footer: 'Views vs question completions',
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const recentSurveys: RecentSurveyType[] = [
  {
    id: crypto.randomUUID(),
    title: 'Customer satisfaction survey',
    description: 'How satisfied are you with our service?',
    active: false,
    responsesIn24h: 0,
  },
  {
    id: crypto.randomUUID(),
    title: 'Employee engagement survey',
    description: 'How engaged are you with your work?',
    active: true,
    responsesIn24h: 13,
  },
  {
    id: crypto.randomUUID(),
    title: 'Product feedback survey',
    description: 'What do you think of our new product?',
    active: false,
    responsesIn24h: 0,
  },
];

export function load() {
  return { stats, recentSurveys: [] as RecentSurveyType[] };
}
