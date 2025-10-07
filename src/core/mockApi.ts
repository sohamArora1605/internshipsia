import { read, write, upsert, remove, generateId } from './localDb';
import type {
  User, College, Company, StudentProfile, Internship, Application,
  LogEntry, Report, CreditRecord, Certificate, MentorSession,
  PeerPod, Notification, ID
} from './models';

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
const L = 250;

export const api = {
  // AUTH
  async login(email: string, _password: string) {
    await sleep(L);
    const users = read<User>('users');
    const user = users.find(u => u.email === email);
    if (!user) throw new Error('Invalid credentials');
    const token = btoa(JSON.stringify({ sub: user.id, role: user.role }));
    sessionStorage.setItem('prashi:token', token);
    return { token, user };
  },

  async signup(userData: Omit<User, 'id' | 'createdAt' | 'profileComplete'>) {
    await sleep(L);
    const users = read<User>('users');
    if (users.find(u => u.email === userData.email)) {
      throw new Error('Email already exists');
    }
    const user: User = {
      ...userData,
      id: generateId(),
      profileComplete: false,
      createdAt: new Date().toISOString()
    };
    upsert('users', user);
    const token = btoa(JSON.stringify({ sub: user.id, role: user.role }));
    sessionStorage.setItem('prashi:token', token);
    return { token, user };
  },

  async me() {
    await sleep(80);
    const tok = sessionStorage.getItem('prashi:token');
    if (!tok) throw new Error('Not logged in');
    const payload = JSON.parse(atob(tok)) as { sub: ID };
    return read<User>('users').find(u => u.id === payload.sub)!;
  },

  async logout() {
    sessionStorage.removeItem('prashi:token');
  },

  // USERS / PROFILES
  async getStudentProfile(userId: ID) {
    await sleep(L);
    return read<StudentProfile>('studentProfiles').find(p => p.userId === userId) || null;
  },

  async upsertStudentProfile(p: StudentProfile) {
    await sleep(L);
    return upsert('studentProfiles', p);
  },

  async listUsers() {
    await sleep(L);
    return read<User>('users');
  },

  async upsertUser(user: User) {
    await sleep(L);
    return upsert('users', user);
  },

  // COLLEGES
  async listColleges() {
    await sleep(L);
    return read<College>('colleges');
  },

  async upsertCollege(c: College) {
    await sleep(L);
    return upsert('colleges', c);
  },

  async deleteCollege(id: ID) {
    await sleep(L);
    remove('colleges', id);
  },

  // COMPANIES / INTERNSHIPS
  async listCompanies() {
    await sleep(L);
    return read<Company>('companies');
  },

  async upsertCompany(c: Company) {
    await sleep(L);
    return upsert('companies', c);
  },

  async deleteCompany(id: ID) {
    await sleep(L);
    remove('companies', id);
  },

  async listInternships(filter?: Partial<Pick<Internship, 'mode' | 'paid' | 'companyId'>>) {
    await sleep(L);
    let all = read<Internship>('internships');
    if (filter?.mode) all = all.filter(i => i.mode === filter.mode);
    if (typeof filter?.paid === 'boolean') all = all.filter(i => i.paid === filter.paid);
    if (filter?.companyId) all = all.filter(i => i.companyId === filter.companyId);
    return all;
  },

  async createInternship(i: Omit<Internship, 'id' | 'createdAt'>) {
    await sleep(L);
    const itm: Internship = { ...i, id: generateId(), createdAt: new Date().toISOString() };
    upsert('internships', itm);
    return itm;
  },

  async updateInternship(i: Internship) {
    await sleep(L);
    return upsert('internships', i);
  },

  async deleteInternship(id: ID) {
    await sleep(L);
    remove('internships', id);
  },

  // APPLICATIONS
  async apply(studentId: ID, internshipId: ID) {
    await sleep(L);
    const existing = read<Application>('applications').find(a => 
      a.studentId === studentId && a.internshipId === internshipId
    );
    if (existing) throw new Error('Already applied');
    
    const a: Application = {
      id: generateId(),
      studentId,
      internshipId,
      status: 'applied',
      timeline: [{ ts: new Date().toISOString(), note: 'Applied' }]
    };
    upsert('applications', a);
    return a;
  },

  async updateApplicationStatus(id: ID, status: Application['status'], by?: ID, note?: string) {
    await sleep(L);
    const apps = read<Application>('applications');
    const a = apps.find(x => x.id === id)!;
    a.status = status;
    a.timeline.push({ ts: new Date().toISOString(), note: note ?? status, by });
    write('applications', apps);
    return a;
  },

  async withdrawApplication(id: ID) {
    await sleep(L);
    return this.updateApplicationStatus(id, 'withdrawn', undefined, 'Withdrawn by student');
  },

  async listApplicationsByInternship(internshipId: ID) {
    await sleep(L);
    return read<Application>('applications').filter(a => a.internshipId === internshipId);
  },

  async listApplicationsByStudent(studentId: ID) {
    await sleep(L);
    return read<Application>('applications').filter(a => a.studentId === studentId);
  },

  // LOGS & REPORTS
  async addLog(e: Omit<LogEntry, 'id'>) {
    await sleep(L);
    const x = { ...e, id: generateId() };
    upsert('logs', x);
    return x;
  },

  async updateLog(log: LogEntry) {
    await sleep(L);
    return upsert('logs', log);
  },

  async listLogs(studentId: ID, internshipId?: ID) {
    await sleep(L);
    let logs = read<LogEntry>('logs').filter(l => l.studentId === studentId);
    if (internshipId) logs = logs.filter(l => l.internshipId === internshipId);
    return logs;
  },

  async upsertReport(r: Report) {
    await sleep(L);
    return upsert('reports', r);
  },

  async listReports(studentId?: ID, internshipId?: ID) {
    await sleep(L);
    let reports = read<Report>('reports');
    if (studentId) reports = reports.filter(r => r.studentId === studentId);
    if (internshipId) reports = reports.filter(r => r.internshipId === internshipId);
    return reports;
  },

  // CREDITS
  async addCredit(c: CreditRecord) {
    await sleep(L);
    return upsert('credits', c);
  },

  async listCredits(studentId?: ID) {
    await sleep(L);
    let credits = read<CreditRecord>('credits');
    if (studentId) credits = credits.filter(c => c.studentId === studentId);
    return credits;
  },

  // CERTIFICATES
  async issueCertificate(c: Certificate) {
    await sleep(L);
    return upsert('certs', c);
  },

  async listCertificates(studentId?: ID) {
    await sleep(L);
    let certs = read<Certificate>('certs');
    if (studentId) certs = certs.filter(c => c.studentId === studentId);
    return certs;
  },

  // MENTOR + PODS
  async scheduleMentorSession(s: MentorSession) {
    await sleep(L);
    return upsert('mentorSessions', s);
  },

  async listMentorSessions(studentId?: ID, mentorId?: ID) {
    await sleep(L);
    let sessions = read<MentorSession>('mentorSessions');
    if (studentId) sessions = sessions.filter(m => m.studentId === studentId);
    if (mentorId) sessions = sessions.filter(m => m.mentorId === mentorId);
    return sessions;
  },

  async upsertPeerPod(p: PeerPod) {
    await sleep(L);
    return upsert('peerPods', p);
  },

  async listPeerPods() {
    await sleep(L);
    return read<PeerPod>('peerPods');
  },

  // NOTIFICATIONS
  async notify(n: Notification) {
    await sleep(50);
    return upsert('notifs', n);
  },

  async myNotifications(userId: ID) {
    await sleep(50);
    return read<Notification>('notifs').filter(n => n.userId === userId);
  },

  async markNotificationSeen(id: ID) {
    await sleep(50);
    const notifs = read<Notification>('notifs');
    const notif = notifs.find(n => n.id === id);
    if (notif) {
      notif.seen = true;
      write('notifs', notifs);
    }
  },
};