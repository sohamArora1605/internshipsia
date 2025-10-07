import jsPDF from 'jspdf';
import * as html2image from 'html-to-image';
import JSZip from 'jszip';
import { read } from './localDb';

export async function exportNodeToPDF(el: HTMLElement, filename: string) {
  try {
    const dataUrl = await html2image.toPng(el, {
      quality: 0.95,
      backgroundColor: '#ffffff'
    });
    
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
    const width = 595;
    const img = (pdf as any).getImageProperties(dataUrl);
    const height = width * (img.height / img.width);
    
    pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
    pdf.save(filename);
  } catch (error) {
    console.error('PDF export failed:', error);
    throw new Error('Failed to export PDF');
  }
}

export function weeklyAutoSummary(logs: { date: string; tasks: string }[]) {
  const lines: string[] = [];
  const taskKeywords = new Set<string>();
  
  for (const l of logs) {
    lines.push(`• (${l.date}) ${l.tasks}`);
    // Extract keywords for learning outcomes
    const words = l.tasks.toLowerCase().split(/\W+/).filter(w => w.length > 3);
    words.forEach(w => taskKeywords.add(w));
  }
  
  const summary = Array.from(new Set(lines)).join('\n');
  const outcomes = Array.from(taskKeywords).slice(0, 5).map(w => 
    w.charAt(0).toUpperCase() + w.slice(1)
  );
  
  return {
    summary,
    reflections: 'Applied technical skills to real-world tasks; improved collaboration and communication; identified knowledge gaps and areas for improvement.',
    learningOutcomes: outcomes.length > 0 ? outcomes : ['Domain exposure', 'Communication', 'Time management']
  };
}

export async function exportAllData(): Promise<Blob> {
  const zip = new JSZip();
  
  const collections = [
    'users', 'colleges', 'companies', 'studentProfiles', 'internships',
    'applications', 'logs', 'reports', 'credits', 'certs', 'mentorSessions',
    'peerPods', 'notifs'
  ];
  
  for (const collection of collections) {
    const data = read(collection);
    zip.file(`${collection}.json`, JSON.stringify(data, null, 2));
  }
  
  return zip.generateAsync({ type: 'blob' });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}