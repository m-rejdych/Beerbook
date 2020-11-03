import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';

import { RootState } from '../../store/reducers';
import User from './User';

const Users: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.users);

  return (
    <Box position="relative" height="100%" width="100%">
      {users.map((user) => (
        <User
          key={user.userId}
          {...user}
          top={Math.floor(Math.random() * 90)}
          left={Math.floor(Math.random() * 80)}
        />
      ))}
    </Box>
  );
};

export default Users;
