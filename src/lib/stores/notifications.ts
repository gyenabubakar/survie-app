import { getContext, setContext } from 'svelte';
import { derived, writable } from 'svelte/store';
import type { Writable, Readable } from 'svelte/store';

export type NotificationType = 'NEW_TEAM_MEMBER';
export interface NotificationInitiator {
  id: string;
  name: string;
  avatar: string;
}
export interface Notification {
  id: string;
  type: NotificationType;
  initiator: NotificationInitiator;
  read: boolean;
  createdAt: string;
}

export interface NotificationStore {
  notifications: Writable<Notification[]>;
  hasUnread: Readable<boolean>;
  addNotifications: (notification: Notification | Notification[]) => void;
  markAllAsRead: () => void;
}

const STORE_KEY = Symbol('NotificationStore');

export function createNotificationStore(): NotificationStore {
  const __store = writable<Notification[]>([getFakeNotification()]);

  const store = {
    notifications: __store,
    hasUnread: derived(__store, ($notifications) => $notifications.some(({ read }) => !read)),

    addNotifications(notification: Notification | Notification[]) {
      __store.update((notifications) => {
        const newNotifications = Array.isArray(notification) ? notification : [notification];
        return [...notifications, ...newNotifications];
      });
    },
    markAllAsRead() {
      __store.update((notifications) =>
        notifications.map((notification) => ({ ...notification, read: true }))
      );
    },
  };

  setContext(STORE_KEY, store);

  return store;
}

export function useNotificationStore() {
  return getContext<NotificationStore>(STORE_KEY);
}

function getFakeNotification(): Notification {
  return {
    id: '1',
    type: 'NEW_TEAM_MEMBER',
    initiator: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/',
    },
    read: false,
    createdAt: '2024-02-28T13:29:02.760Z',
  };
}
