export interface Achievement {
  id: string;
  title: string;
  org: string;
  note: string;
  highlight?: boolean;
  link?: string;
}
export const ACHIEVEMENTS: Achievement[] = [
{
  id: 'iecom',
  title: 'Presented & Published',
  org: 'IECOM 2025 — International Conference',
  note: 'Presented and published a FairHire research paper at IECOM 2025, an international conference.',
  link: 'https://index.ieomsociety.org/index.cfm/item/58003',
},
  { id: 'sns', title: 'First Prize', org: 'SNS National Food Conference', note: 'For the AgriGuard smart-agriculture decision-support project.', highlight: true },
  { id: 'tnwise', title: 'Finalist', org: 'TNWISE State-Level Hackathon', note: 'Presented an ML-based paddy price prediction solution.' },
  { id: 'protothon', title: 'Finalist', org: 'Protothon National Hackathon', note: 'Built an intelligent ambulance-routing and emergency-response solution.' },
  { id: 'smartathon', title: 'Participant', org: 'Smartathon National Hackathon', note: 'Worked on an AI-powered tree-health monitoring platform.' },
  
  { id: 'wec', title: 'Secretary', org: 'Women Entrepreneurs Club', note: 'Student leadership role.' },
]

export const EDUCATION = [
  { school: 'SRM Institute of Science and Technology', place: 'Tiruchirappalli, Tamil Nadu', degree: 'B.Tech — Computer Science and Engineering (AI & ML)', period: 'Aug 2023 – May 2027', score: 'CGPA 9.46 / 10' },
  { school: 'Karthi Vidhyalaya Matric Hr. Sec. School', place: '', degree: 'Class XII', period: '2023', score: '80%' },
]

export const CERTIFICATIONS = [
  { issuer: 'Srishti Innovative Technopark', title: 'AI Using Python' },
  { issuer: 'IBM', title: 'Python for Data Science' },
  { issuer: 'IBM', title: 'Introduction to Artificial Intelligence' },
  { issuer: 'University of London', title: 'Probability and Statistics' },
  { issuer: 'University of Colorado Boulder', title: 'Dynamic Programming and Greedy Algorithms' },
  { issuer: 'Internshala', title: 'Web Development' },
]

export const LANGUAGES = ['Tamil', 'English', 'Telugu']
