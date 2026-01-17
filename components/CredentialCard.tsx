import React from 'react';
import { Credential } from '../types';
import { Award, CheckCircle, XCircle, Share2, Shield } from 'lucide-react';

interface CredentialCardProps {
  credential: Credential;
  showActions?: boolean;
}

export const CredentialCard: React.FC<CredentialCardProps> = ({ credential, showActions = true }) => {
  const isActive = credential.status === 'active';

  return (
    <div className={`relative overflow-hidden rounded-xl border ${isActive ? 'border-slate-200 bg-white' : 'border-red-200 bg-red-50'} shadow-sm transition-all hover:shadow-md`}>
      {/* Decorative Top Bar */}
      <div className={`h-2 w-full ${isActive ? 'bg-indigo-600' : 'bg-red-500'}`} />
      
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${isActive ? 'bg-indigo-100 text-indigo-600' : 'bg-red-100 text-red-600'}`}>
              <Award size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">{credential.institutionName}</h3>
              <p className="text-sm text-slate-500">Issued: {credential.issueDate}</p>
            </div>
          </div>
          <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {isActive ? <CheckCircle size={14} /> : <XCircle size={14} />}
            <span>{isActive ? 'Verified' : 'Revoked'}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Recipient</p>
            <p className="text-lg font-medium text-slate-800">{credential.studentName}</p>
            <p className="text-sm text-slate-500">ID: {credential.studentId}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Degree</p>
              <p className="font-medium text-slate-800">{credential.degree}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Major</p>
              <p className="font-medium text-slate-800">{credential.major}</p>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
             <div className="flex items-center gap-2 mb-1">
                <Shield size={12} className="text-indigo-500"/>
                <span className="font-semibold text-indigo-900">Soulbound Token ID</span>
             </div>
             <p className="font-mono">{credential.tokenId}</p>
             <p className="mt-1 font-mono truncate text-slate-400" title={credential.txHash}>Tx: {credential.txHash}</p>
          </div>
        </div>

        {showActions && isActive && (
          <div className="mt-6 flex gap-3">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
              <Share2 size={16} />
              Share Link
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
