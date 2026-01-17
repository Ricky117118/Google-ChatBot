import React, { useState } from 'react';
import { Credential } from '../../types';
import { Search, ShieldCheck, AlertCircle } from 'lucide-react';
import { CredentialCard } from '../CredentialCard';

interface EmployerViewProps {
  credentials: Credential[];
}

export const EmployerView: React.FC<EmployerViewProps> = ({ credentials }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState<Credential | null | undefined>(undefined);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setResult(undefined);

    // Simulate blockchain lookup delay
    setTimeout(() => {
      const found = credentials.find(c => 
        c.tokenId.toLowerCase() === searchTerm.toLowerCase() || 
        c.studentId.toLowerCase() === searchTerm.toLowerCase()
      );
      setResult(found || null);
      setIsVerifying(false);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 pt-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">Credential Verification</h1>
        <p className="mt-2 text-slate-500">
          Instantly verify the authenticity of academic records using EduChain's ledger.
          Enter a Student ID or Soulbound Token ID.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <form onSubmit={handleVerify} className="relative flex items-center">
          <Search className="absolute left-4 text-slate-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="e.g., SBT-8821 or ST-2024-001"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-32 text-lg outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
          />
          <button
            type="submit"
            disabled={!searchTerm || isVerifying}
            className="absolute right-2 rounded-lg bg-indigo-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
          >
            {isVerifying ? 'Verifying...' : 'Verify'}
          </button>
        </form>

        <div className="mt-4 flex justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1"><ShieldCheck size={12}/> 256-bit Encryption</span>
            <span className="flex items-center gap-1"><ShieldCheck size={12}/> Real-time Ledger Check</span>
        </div>
      </div>

      <div className="min-h-[200px]">
        {isVerifying && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
            <p className="mt-4 text-sm text-slate-500">Querying Blockchain Nodes...</p>
          </div>
        )}

        {!isVerifying && result === null && (
          <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-center">
             <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                <AlertCircle size={24}/>
             </div>
             <h3 className="font-semibold text-red-900">Credential Not Found</h3>
             <p className="text-sm text-red-700">No active credential matches the provided ID on the EduChain ledger.</p>
          </div>
        )}

        {!isVerifying && result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-4 flex items-center gap-2 text-green-600">
                    <ShieldCheck size={20}/>
                    <span className="font-semibold">Verification Successful</span>
                </div>
                <CredentialCard credential={result} />
            </div>
        )}
      </div>
    </div>
  );
};
