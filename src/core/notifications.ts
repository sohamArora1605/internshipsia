import type { Notification, ID } from './models';
import { api } from './mockApi';

export async function pushNotif(userId: ID, title: string, body?: string) {
  return api.notify({
    id: crypto.randomUUID(),
    userId,
    ts: new Date().toISOString(),
    type: 'info',
    title,
    body,
    seen: false
  });
}

export async function requestBrowserPerms() {
  if ('Notification' in window) {
    if (Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  }
}

export function showBrowserNotif(title: string, body?: string) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body });
  }
}

export function getNotificationPermissionStatus(): 'granted' | 'denied' | 'default' | 'unsupported' {
  if (!('Notification' in window)) return 'unsupported';
  return Notification.permission;
}