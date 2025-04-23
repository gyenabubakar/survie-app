export type NotificationType = 'JOINED_TEAM';

export type NotificationInitiator = {
  id: string;
  name: string;
  avatar: string;
};

export type Notification = {
  id: string;
  type: NotificationType;
  initiator: NotificationInitiator;
  read: boolean;
  createdAt: string;
};
