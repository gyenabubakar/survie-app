export type StatType = {
  title: string;
  value: number;
  valueUnit?: string;
  percentage?: number;
  trend: 'up' | 'down' | 'none';
  footer?: string;
};
