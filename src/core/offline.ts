import { api } from './mockApi';

const QUEUE_KEY = 'prashi:offlineQueue';

type QueuedOp = {
  type: 'addLog' | 'apply' | 'upsertReport';
  payload: any;
};

const getQ = (): QueuedOp[] => JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
const setQ = (q: QueuedOp[]) => localStorage.setItem(QUEUE_KEY, JSON.stringify(q));

export function queue(op: QueuedOp) {
  const q = getQ();
  q.push(op);
  setQ(q);
}

export async function flushQueue() {
  const q = getQ();
  const failed: QueuedOp[] = [];
  
  for (const op of q) {
    try {
      if (op.type === 'addLog') await api.addLog(op.payload);
      if (op.type === 'apply') await api.apply(op.payload.studentId, op.payload.internshipId);
      if (op.type === 'upsertReport') await api.upsertReport(op.payload);
    } catch {
      failed.push(op); // Keep failed operations in queue
    }
  }
  
  setQ(failed);
  return { processed: q.length - failed.length, failed: failed.length };
}

export function getQueueLength(): number {
  return getQ().length;
}

export function initOfflineListeners() {
  window.addEventListener('online', () => {
    flushQueue();
  });
}