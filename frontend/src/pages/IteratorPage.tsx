// src/pages/IteratorPage.tsx
import React from 'react';
import IteratorViewer from '../components/IteratorViewer';

const IteratorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Patrón Iterator</h1>
      <IteratorViewer />
    </div>
  );
};

export default IteratorPage;
