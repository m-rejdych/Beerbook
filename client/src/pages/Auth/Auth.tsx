import React from 'react';
import { Box } from '@material-ui/core';

import AuthForm from '../../components/AuthForm';

const Auth: React.FC = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <AuthForm />
    </Box>
  );
};

export default Auth;
