import { read, write, generateId } from './localDb';
import type { User, College, Company, StudentProfile, Internship, LogEntry, Report, Certificate } from './models';
import { issueCert } from './hashChain';

export function seedData() {
  // Check if already seeded
  if (read('users').length > 0) return;

  // Colleges
  const colleges: College[] = [
    { id: generateId(), name: 'IIT Delhi', district: 'New Delhi', state: 'Delhi' },
    { id: generateId(), name: 'NIT Warangal', district: 'Warangal', state: 'Telangana' }
  ];
  write('colleges', colleges);

  // Companies
  const companies: Company[] = [
    { id: generateId(), name: 'TechCorp India', sector: 'Technology', verified: true, location: 'Bangalore' },
    { id: generateId(), name: 'InnovateLabs', sector: 'Software', verified: true, location: 'Hyderabad' },
    { id: generateId(), name: 'StartupXYZ', sector: 'Fintech', verified: false, location: 'Mumbai' }
  ];
  write('companies', companies);

  // Users
  const users: User[] = [
    {
      id: generateId(),
      role: 'student',
      name: 'Rahul Sharma',
      email: 'student@prashikshan.in',
      phone: '+91-9876543210',
      collegeId: colleges[0].id,
      profileComplete: true,
      createdAt: new Date().toISOString()
    },
    {
      id: generateId(),
      role: 'faculty',
      name: 'Dr. Priya Patel',
      email: 'faculty@prashikshan.in',
      phone: '+91-9876543211',
      collegeId: colleges[0].id,
      profileComplete: true,
      createdAt: new Date().toISOString()
    },
    {
      id: generateId(),
      role: 'industry',
      name: 'Amit Kumar',
      email: 'industry@prashikshan.in',
      phone: '+91-9876543212',
      companyId: companies[0].id,
      profileComplete: true,
      createdAt: new Date().toISOString()
    },
    {
      id: generateId(),
      role: 'admin',
      name: 'Admin User',
      email: 'admin@prashikshan.in',
      phone: '+91-9876543213',
      profileComplete: true,
      createdAt: new Date().toISOString()
    }
  ];
  write('users', users);

  const studentUser = users[0];
  const facultyUser = users[1];

  // Student Profile
  const studentProfile: StudentProfile = {
    id: generateId(),
    userId: studentUser.id,
    branch: 'Computer Science',
    semester: 6,
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
    interests: ['Web Development', 'Machine Learning', 'Cloud Computing'],
    badges: ['Early Adopter', 'Quick Learner'],
    employabilityScore: 75
  };
  write('studentProfiles', [studentProfile]);

  // Internships
  const internships: Internship[] = [
    {
      id: generateId(),
      companyId: companies[0].id,
      title: 'Full Stack Developer Intern',
      description: 'Work on React and Node.js applications, learn modern web development practices.',
      mode: 'remote',
      paid: true,
      stipend: 15000,
      durationWeeks: 12,
      skillsRequired: ['JavaScript', 'React', 'Node.js'],
      city: 'Bangalore',
      openings: 3,
      isTrial: false,
      createdAt: new Date().toISOString()
    },
    {
      id: generateId(),
      companyId: companies[1].id,
      title: 'Data Science Intern',
      description: 'Analyze datasets, build ML models, work with Python and data visualization tools.',
      mode: 'hybrid',
      paid: true,
      stipend: 12000,
      durationWeeks: 8,
      skillsRequired: ['Python', 'Machine Learning', 'SQL'],
      city: 'Hyderabad',
      openings: 2,
      isTrial: true,
      createdAt: new Date().toISOString()
    },
    {
      id: generateId(),
      companyId: companies[2].id,
      title: 'Frontend Developer Intern',
      description: 'Build responsive web interfaces using React and modern CSS frameworks.',
      mode: 'onsite',
      paid: false,
      durationWeeks: 6,
      skillsRequired: ['JavaScript', 'React', 'CSS'],
      city: 'Mumbai',
      openings: 1,
      isTrial: true,
      createdAt: new Date().toISOString()
    },
    {
      id: generateId(),
      companyId: companies[0].id,
      title: 'Mobile App Developer Intern',
      description: 'Develop mobile applications using React Native and Flutter frameworks.',
      mode: 'remote',
      paid: true,
      stipend: 18000,
      durationWeeks: 10,
      skillsRequired: ['React Native', 'Flutter', 'Mobile Development'],
      city: 'Bangalore',
      openings: 2,
      isTrial: false,
      createdAt: new Date().toISOString()
    },
    {
      id: generateId(),
      companyId: companies[1].id,
      title: 'DevOps Engineer Intern',
      description: 'Learn cloud infrastructure, CI/CD pipelines, and containerization technologies.',
      mode: 'hybrid',
      paid: true,
      stipend: 20000,
      durationWeeks: 16,
      skillsRequired: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      city: 'Hyderabad',
      openings: 1,
      isTrial: false,
      createdAt: new Date().toISOString()
    },
    {
      id: generateId(),
      companyId: companies[2].id,
      title: 'UI/UX Design Intern',
      description: 'Create user-centered designs and prototypes for web and mobile applications.',
      mode: 'onsite',
      paid: true,
      stipend: 10000,
      durationWeeks: 8,
      skillsRequired: ['Figma', 'Adobe XD', 'UI Design', 'UX Research'],
      city: 'Mumbai',
      openings: 2,
      isTrial: true,
      createdAt: new Date().toISOString()
    },
    {
      id: generateId(),
      companyId: companies[0].id,
      title: 'Cybersecurity Intern',
      description: 'Learn about network security, penetration testing, and security auditing.',
      mode: 'remote',
      paid: true,
      stipend: 16000,
      durationWeeks: 12,
      skillsRequired: ['Cybersecurity', 'Network Security', 'Ethical Hacking'],
      city: 'Bangalore',
      openings: 1,
      isTrial: false,
      createdAt: new Date().toISOString()
    },
    {
      id: generateId(),
      companyId: companies[1].id,
      title: 'AI/ML Research Intern',
      description: 'Work on cutting-edge AI research projects and machine learning algorithms.',
      mode: 'hybrid',
      paid: true,
      stipend: 22000,
      durationWeeks: 20,
      skillsRequired: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning'],
      city: 'Hyderabad',
      openings: 1,
      isTrial: false,
      createdAt: new Date().toISOString()
    }
  ];
  write('internships', internships);

  // Sample logs
  const logs: LogEntry[] = [
    {
      id: generateId(),
      studentId: studentUser.id,
      internshipId: internships[0].id,
      date: '2024-01-15',
      tasks: 'Set up development environment, learned about project structure',
      hours: 6,
      verifiedByFaculty: true,
      mentorFeedback: 'Good start, keep up the enthusiasm'
    },
    {
      id: generateId(),
      studentId: studentUser.id,
      internshipId: internships[0].id,
      date: '2024-01-16',
      tasks: 'Implemented user authentication module using JWT',
      hours: 8,
      verifiedByFaculty: true,
      companyFeedback: 'Excellent implementation, clean code'
    }
  ];
  write('logs', logs);

  // Sample report
  const reports: Report[] = [
    {
      id: generateId(),
      studentId: studentUser.id,
      internshipId: internships[0].id,
      weekNo: 1,
      summary: 'Completed initial setup and started working on authentication system. Learned about JWT tokens and secure password handling.',
      reflections: 'The first week was challenging but exciting. I learned a lot about industry-standard practices.',
      learningOutcomes: ['JWT Authentication', 'Security Best Practices', 'Code Organization'],
      approved: true
    }
  ];
  write('reports', reports);

  // Initialize empty certificate collection
  write('certs', []);

  // Initialize empty collections
  write('applications', []);
  write('credits', []);
  write('mentorSessions', []);
  write('peerPods', []);
  write('notifs', []);

  console.log('Seed data created successfully');
}