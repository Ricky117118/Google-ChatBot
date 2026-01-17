export type UserRole = 'student' | 'institution' | 'employer' | 'admin';

export interface Credential {
  id: string;
  studentName: string;
  studentId: string;
  institutionName: string;
  degree: string;
  major: string;
  graduationDate: string;
  gpa?: string;
  status: 'active' | 'revoked';
  txHash: string; // Simulated Blockchain Transaction Hash
  tokenId: string; // Simulated SBT ID
  issueDate: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface VerificationResult {
  isValid: boolean;
  credential?: Credential;
  message: string;
}
