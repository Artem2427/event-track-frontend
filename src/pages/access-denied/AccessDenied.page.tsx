import { Button } from '@shared/shadcn-ui';
import { useNavigate } from 'react-router-dom';

const AccessDeniedPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        403 – Access Denied
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        You do not have permission to view this page.
      </p>
      <Button onClick={goHome}>Go to Home</Button>
    </div>
  );
};

export default AccessDeniedPage;
