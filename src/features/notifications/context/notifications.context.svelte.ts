import { getContext, setContext } from 'svelte';
import { parseISO } from 'date-fns';
import type { AppNotification } from '#features/notifications/types';

export class NotificationsContext {
  static readonly KEY = Symbol('NotificationsContext');

  private notifications: AppNotification[] = $state(getFakeNotifications());

  constructor() {
    setContext(NotificationsContext.KEY, this);
  }

  get all() {
    return this.notifications;
  }

  get hasUnread() {
    return this.notifications.some((n) => !!n.readAt);
  }

  addNotifications(notification: AppNotification | AppNotification[]) {
    const newNotifications = Array.isArray(notification) ? notification : [notification];
    this.notifications = [...this.notifications, ...newNotifications];
  }

  markAllAsRead() {
    this.notifications = this.notifications.map((n) => ({ ...n, readAt: new Date() }));
  }

  static use() {
    const context = getContext<NotificationsContext>(NotificationsContext.KEY);
    if (!context) {
      throw new Error('NotificationsContext not found in component hierarchy.');
    }
    return context;
  }
}

function getFakeNotifications(): AppNotification[] {
  return [
    {
      id: crypto.randomUUID(),
      type: 'JOINED_TEAM',
      initiator: {
        id: '1',
        name: 'Jane Doe',
        avatar: 'https://randomuser.me/api/portraits/women/60.jpg',
      },
      readAt: null,
      createdAt: parseISO('2024-02-28T13:29:02.760Z'),
    },
    {
      id: crypto.randomUUID(),
      type: 'JOINED_TEAM',
      initiator: {
        id: '1',
        name: 'Jane Doe',
        avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
      },
      readAt: new Date(),
      createdAt: parseISO('2024-02-28T13:29:02.760Z'),
    },
  ];
}
