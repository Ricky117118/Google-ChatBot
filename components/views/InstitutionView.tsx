import React, { useState } from 'react';
import { Credential } from '../../types';
import { Plus, Search, Users } from 'lucide-react';
import { CredentialCard } from '../CredentialCard';

interface InstitutionViewProps {
  credentials: Credential[];
  onIssue: (cred: Omit<Credential, 'id' | 'status' | 'txHash' | 'tokenId'>) => void;
}

export const InstitutionView: React.FC<InstitutionViewProps> = ({ credentials, onIssue }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    degree: '',
    major: '',
    gpa: '',
    graduationDate: ''
  });

  // Filter only credentials issued by "Quantum University" (our mock institution)
  const issuedCredentials = credentials.filter(c => c.institutionName === 'Quantum University');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onIssue({
        ...formData,
        institutionName: 'Quantum University',
        issueDate: new Date().toISOString().split('T')[0],
    });
    setFormData({ studentName: '', studentId: '', degree: '', major: '', gpa: '', graduationDate: '' });
    setShowForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Institution Dashboard</h1>
          <p className="text-slate-500">Quantum University Administration</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700"
        >
          <Plus size={18} />
          Issue New Credential
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-800">Issue New Credential (SBT)</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input required name="studentName" value={formData.studentName} onChange={handleChange} placeholder="Student Name" className="rounded-lg border border-slate-300 p-2 text-sm focus:border-indigo-500 focus:outline-none" />
            <input required name="studentId" value={formData.studentId} onChange={handleChange} placeholder="Student ID" className="rounded-lg border border-slate-300 p-2 text-sm focus:border-indigo-500 focus:outline-none" />
            <input required name="degree" value={formData.degree} onChange={handleChange} placeholder="Degree" className="rounded-lg border border-slate-300 p-2 text-sm focus:border-indigo-500 focus:outline-none" />
            <input required name="major" value={formData.major} onChange={handleChange} placeholder="Major" className="rounded-lg border border-slate-300 p-2 text-sm focus:border-indigo-500 focus:outline-none" />
            <input required name="graduationDate" type="date" value={formData.graduationDate} onChange={handleChange} className="rounded-lg border border-slate-300 p-2 text-sm focus:border-indigo-500 focus:outline-none" />
            <input name="gpa" value={formData.gpa} onChange={handleChange} placeholder="GPA (Optional)" className="rounded-lg border border-slate-300 p-2 text-sm focus:border-indigo-500 focus:outline-none" />
            <div className="col-span-full mt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700">Cancel</button>
                <button type="submit" className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700">Mint SBT</button>
            </div>
          </form>
        </div>
      )}

      <div>
        <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Users size={20} className="text-slate-400"/>
                Issued Credentials
            </h2>
            <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search records..." className="rounded-full border border-slate-200 bg-white py-1.5 pl-9 pr-4 text-sm focus:border-indigo-500 focus:outline-none" />
            </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {issuedCredentials.map((cred) => (
            <CredentialCard key={cred.id} credential={cred} showActions={false} />
          ))}
        </div>
      </div>
    </div>
  );
};
