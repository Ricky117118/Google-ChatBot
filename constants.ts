import { Credential } from './types';

export const INITIAL_CREDENTIALS: Credential[] = [
  {
    id: '1',
    studentName: 'Alex Mercer',
    studentId: 'ST-2024-001',
    institutionName: 'Quantum University',
    degree: 'Bachelor of Science',
    major: 'Computer Science',
    graduationDate: '2024-05-15',
    gpa: '3.8',
    status: 'active',
    txHash: '0x7f9a...3b21',
    tokenId: 'SBT-8821',
    issueDate: '2024-05-20',
  },
  {
    id: '2',
    studentName: 'Sarah Jenkins',
    studentId: 'ST-2023-442',
    institutionName: 'Global Tech Institute',
    degree: 'Master of Arts',
    major: 'Digital Humanities',
    graduationDate: '2023-12-10',
    gpa: '3.9',
    status: 'active',
    txHash: '0x3c1d...9a00',
    tokenId: 'SBT-1029',
    issueDate: '2023-12-15',
  },
  {
    id: '3',
    studentName: 'Jordan Lee',
    studentId: 'ST-2022-110',
    institutionName: 'Quantum University',
    degree: 'Bachelor of Engineering',
    major: 'Blockchain Architecture',
    graduationDate: '2022-06-01',
    status: 'revoked', // For demo purposes
    txHash: '0x1a2b...3c4d',
    tokenId: 'SBT-0055',
    issueDate: '2022-06-05',
  }
];

export const AI_SYSTEM_INSTRUCTION = `You are a helpful AI assistant for EduChain, a blockchain-based platform that enables secure issuance and instant verification of academic credentials. 
The platform uses Soulbound Tokens (SBTs), which are non-transferable tokens, to ensure that every credential is authentic, private, and uniquely tied to the recipient. 

Your role is to guide users based on their roles: 
- Students can view, share, and request verification of their credentials.
- Institutions can issue credentials, manage student records, and verify requests.
- Employers can verify candidate credentials and request validation from institutions.
- Admins can manage users, permissions, and oversee platform operations.

You should explain the platform in simple terms, provide step-by-step guidance for common tasks, answer frequently asked questions about verification, security, and SBTs, and help users understand how to use the system efficiently. 

If a question is unclear, highly technical, or beyond your scope, respond politely with, "I’m sorry, I don’t have the information to answer that. Please contact the platform administrator for assistance."

Do not mention you are a language model unless asked directly about your nature. Keep responses concise and helpful.`;
