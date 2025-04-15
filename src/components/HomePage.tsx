import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="HomePage">
      <Button onClick={() => navigate('/portfolios')} variant="contained">
        Portfolios
      </Button>
    </div>
  );
};

export default HomePage;
