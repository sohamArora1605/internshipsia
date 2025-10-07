import type { ID, Role, User } from './models';
import { api } from './mockApi';

export async function login(email: string, password: string) {
  return api.login(email, password);
}

export async function signup(userData: any) {
  return api.signup(userData);
}

export async function logout() {
  return api.logout();
}

export async function currentUser(): Promise<User> {
  return api.me();
}

export function hasRole(user: User | null, role: Role | Role[]) {
  if (!user) return false;
  const r = Array.isArray(role) ? role : [role];
  return r.includes(user.role);
}

export function isAuthenticated(): boolean {
  return !!sessionStorage.getItem('prashi:token');
}