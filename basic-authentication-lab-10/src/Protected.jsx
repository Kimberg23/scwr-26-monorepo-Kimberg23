import React, { useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import Container from './Container';

function Protected() {
  const { user } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  return (
    <Container>
      <h1>Protected route</h1>
    </Container>
  );
}

export default Protected;