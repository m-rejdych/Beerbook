import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, IconButton, makeStyles } from '@material-ui/core';

import { getSelectedUser } from '../../store/actions';
import { RootState } from '../../store/reducers';
import PageWrapper from '../../shared/components/PageWrapper';
import Post from '../../components/Post';
import { ReactComponent as BeerSvg } from '../../assets/Beer.svg';

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const useStyles = makeStyles((theme) => ({
  center: {
    transform: 'translate(-50%, -50%)',
  },
  svg: {
    width: 300,
    opacity: 0.7,
  },
}));

interface Props {
  token: string;
}

const User: React.FC<Props> = ({ token }) => {
  const posts = useSelector(
    (state: RootState) => state.users.selectedUser.posts,
  );
  const params = useParams<{ userId: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    const { userId } = params;
    dispatch(getSelectedUser({ token, userId }));
  }, []);

  const handleGoBack = (): void => {
    history.goBack();
  };

  return (
    <PageWrapper>
      <Box position="relative" height="100%" width="100%">
        {posts.map((post) => (
          <Post
            key={post._id}
            top={Math.floor(Math.random() * 90)}
            left={Math.floor(Math.random() * 80)}
            token={token as string}
            {...post}
          />
        ))}
        <Box clone position="absolute" top={3} left={2} zIndex={1}>
          <IconButton onClick={handleGoBack}>
            <KeyboardBackspaceIcon color="secondary" fontSize="large" />
          </IconButton>
        </Box>
      </Box>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        zIndex={-1}
        className={classes.center}
      >
        <BeerSvg className={classes.svg} />
      </Box>
    </PageWrapper>
  );
};

export default User;
