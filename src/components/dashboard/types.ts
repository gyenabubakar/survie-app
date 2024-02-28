export interface StatType {
  title: string;
  value: number;
  valueUnit?: string;
  percentage?: number;
  trend: 'up' | 'down' | 'none';
  footer?: string;
}

export interface RecentSurveyType {
  id: string;
  title: string;
  description: string;
  active: boolean;
  responsesIn24h: number;
}

export interface RecentResponseType {
  id: string;
  username: string;
  avatar: string | null;
  survey: string;
  completedAt: string;
}
