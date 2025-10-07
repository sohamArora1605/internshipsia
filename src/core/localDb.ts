import { nanoid } from 'nanoid';

const DB_PREFIX = 'prashi';
const DB_VERSION = 1;
const key = (c: string) => `${DB_PREFIX}:v${DB_VERSION}:${c}`;

export type Collection<T> = T[];

export function read<T>(c: string): T[] {
  const raw = localStorage.getItem(key(c));
  return raw ? JSON.parse(raw) as T[] : [];
}

export function write<T>(c: string, data: T[]) {
  localStorage.setItem(key(c), JSON.stringify(data));
}

export function upsert<T extends { id: string }>(c: string, item: T) {
  const all = read<T>(c);
  const i = all.findIndex(x => x.id === item.id);
  if (i >= 0) all[i] = item;
  else all.push(item);
  write(c, all);
  return item;
}

export function remove(c: string, id: string) {
  write(c, read<any>(c).filter((x: any) => x.id !== id));
}

export function generateId() {
  return nanoid();
}

export function migrateIfNeeded() {
  // Future: read old versions and migrate to new
}

export function clearAll() {
  const keys = Object.keys(localStorage).filter(k => k.startsWith(DB_PREFIX));
  keys.forEach(k => localStorage.removeItem(k));
}