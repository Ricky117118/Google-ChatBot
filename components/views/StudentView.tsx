import React from 'react';
import { Credential } from '../../types';
import { CredentialCard } from '../CredentialCard';

interface StudentViewProps {
  credentials: Credential[];
}

export const StudentView: React.FC<StudentViewProps> = ({ credentials }) => {
  // Filter credentials for a specific mock student
  const myCredentials = credentials.filter(c => c.studentId === 'ST-2024-001');

  return (
    <div className="space-y-8">
      <div className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold">Welcome, Alex</h1>
        <p className="mt-2 text-indigo-100">Student ID: ST-2024-001</p>
        <p className="mt-4 max-w-2xl text-sm text-indigo-100">
          Your academic achievements are securely stored as Soulbound Tokens on the EduChain. 
          These credentials are yours forever and cannot be tampered with.
        </p>
      </div>

      <div>
        <h2 className="mb-6 text-xl font-bold text-slate-800">My Credentials</h2>
        {myCredentials.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myCredentials.map((cred) => (
              <CredentialCard key={cred.id} credential={cred} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
            <p>No credentials issued yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
