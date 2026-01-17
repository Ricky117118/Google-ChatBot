import React from 'react';
import { ChatAssistant } from './components/ChatAssistant';

const App: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-slate-50 overflow-hidden">
      <ChatAssistant />
    </div>
  );
};

export default App;