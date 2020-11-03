import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, Box, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import { RootState } from '../../store/reducers';
import { setUser } from '../../store/actions';
import AddPostDialog from '../../components/AddPostDialog';

const PageWrapper: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const history = useHistory();
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');

  const handleLogout = async (): Promise<void> => {
    localStorage.clear();
    dispatch(setUser({ name: '', userId: '' }));
    history.push('/signup');
  };

  const toggleDialog = (): void => {
    setOpen((prev) => !prev);
  };

  return (
    <Box position="relative" height="100vh" width="100%">
      {userId ? (
        <Box
          position="absolute"
          display="flex"
          alignItems="center"
          top={3}
          right={2}
          zIndex={1}
        >
          <Box clone mr={2}>
            <Tooltip title="Add post">
              <IconButton onClick={toggleDialog}>
                <AddIcon color="secondary" fontSize="large" />
              </IconButton>
            </Tooltip>
          </Box>
          <Tooltip title="Logout">
            <IconButton onClick={handleLogout}>
              <PowerSettingsNewIcon color="secondary" fontSize="large" />
            </IconButton>
          </Tooltip>
          <AddPostDialog
            open={open}
            token={token as string}
            handleClose={toggleDialog}
          />
        </Box>
      ) : null}
      {children}
    </Box>
  );
};

export default PageWrapper;
