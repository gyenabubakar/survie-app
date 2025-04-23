export type RecentSurveyType = {
  id: string;
  title: string;
  description: string;
  active: boolean;
  responsesIn24h: number;
};

export type RecentResponseType = {
  id: string;
  username: string;
  avatar: string | null;
  survey: string;
  completedAt: string;
};
