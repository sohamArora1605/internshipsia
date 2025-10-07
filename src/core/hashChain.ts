import type { Certificate } from './models';
import { read, upsert } from './localDb';

async function sha256(input: string): Promise<string> {
  const enc = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function issueCert(
  studentId: string,
  internshipId: string,
  badgeId: string
): Promise<Certificate> {
  const chain = read<Certificate>('certs').sort((a, b) => a.chainIndex - b.chainIndex);
  const prev = chain[chain.length - 1];
  const issueDate = new Date().toISOString();
  
  const data = `${studentId}|${internshipId}|${badgeId}|${prev?.hash || ''}|${issueDate}`;
  const hash = await sha256(data);
  
  const cert: Certificate = {
    id: crypto.randomUUID(),
    studentId,
    internshipId,
    issueDate,
    badgeId,
    chainIndex: (prev?.chainIndex ?? -1) + 1,
    prevHash: prev?.hash,
    hash
  };
  
  upsert('certs', cert);
  return cert;
}

export async function verifyCert(cert: Certificate): Promise<boolean> {
  const data = `${cert.studentId}|${cert.internshipId}|${cert.badgeId}|${cert.prevHash || ''}|${cert.issueDate}`;
  const expectedHash = await sha256(data);
  return expectedHash === cert.hash;
}

export function exportCertAsJSON(cert: Certificate): string {
  return JSON.stringify(cert, null, 2);
}