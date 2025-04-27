export type NotificationType = 'JOINED_TEAM';

export type NotificationInitiator = {
  id: string;
  name: string;
  avatar: string | null;
};

export type AppNotification = {
  id: string;
  type: NotificationType;
  initiator: NotificationInitiator;
  readAt: Date | null;
  createdAt: string;
};
