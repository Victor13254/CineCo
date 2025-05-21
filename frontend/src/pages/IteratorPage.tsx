// src/pages/IteratorPage.tsx
import IteratorViewer from '../components/IteratorViewer';
import CombosViewer from '../components/CombosViewer';

const IteratorPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Patrón Iterator</h1>
      <IteratorViewer />
      <CombosViewer />
    </div>
  );
};

export default IteratorPage;
