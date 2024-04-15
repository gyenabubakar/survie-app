import { fail, redirect } from '@sveltejs/kit';
import { delay } from '#lib';
import { validateForm } from '#lib/form-schemas';
import type { RecentResponseType, RecentSurveyType, StatType } from '#components/dashboard/types';

export function load() {
  return { stats, recentSurveys, recentResponses };
}

export const actions = {
  async createSurvey({ request }) {
    // TODO: Remove this
    await delay(3000);

    const result = await validateForm('app-new-survey-manual', request);
    if ('validationErrors' in result) {
      console.log('Action: validation errors:', result.validationErrors);
      return fail(400, {
        action: 'createSurvey' as const,
        data: result.data,
        validationErrors: result.validationErrors,
      });
    }

    const data = {
      ...result.data,
      multiplePages: result.data.multiplePages === 'on',
      collectUserInfo: result.data.collectUserInfo === 'on',
    };

    console.log('Survey created:', data);

    return redirect(303, `/app/surveys/${crypto.randomUUID()}`);
  },
};

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

const recentSurveys: RecentSurveyType[] = [
  {
    id: crypto.randomUUID(),
    title: 'Customer satisfaction',
    description: 'How satisfied are you with our service?',
    active: false,
    responsesIn24h: 0,
  },
  {
    id: crypto.randomUUID(),
    title: 'Employee engagement',
    description: 'How engaged are you with your work?',
    active: true,
    responsesIn24h: 13,
  },
  {
    id: crypto.randomUUID(),
    title: 'Product feedback',
    description: 'What do you think of our new product?',
    active: false,
    responsesIn24h: 0,
  },
];

const recentResponses: RecentResponseType[] = [
  {
    id: crypto.randomUUID(),
    username: 'Anonymous #b364404',
    avatar: null,
    survey: recentSurveys[1].title,
    completedAt: '2024-02-28T13:27:06.398Z',
  },
  {
    id: crypto.randomUUID(),
    username: 'Anonymous #a3b4c4',
    avatar: null,
    survey: recentSurveys[0].title,
    completedAt: '2024-02-28T12:25:16.398Z',
  },
  {
    id: crypto.randomUUID(),
    username: 'Anonymous #a3b4c4',
    avatar: null,
    survey: recentSurveys[0].title,
    completedAt: '2024-02-28T13:29:02.760Z', // always parse with toISOString
  },
];
