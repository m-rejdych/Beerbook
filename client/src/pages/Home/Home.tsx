import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, makeStyles } from '@material-ui/core';

import { getUsers } from '../../store/actions';
import { ReactComponent as BeerSvg } from '../../assets/Beer.svg';
import Users from '../../components/Users';
import PageWrapper from '../../shared/components/PageWrapper';

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

const Home: React.FC<Props> = ({ token }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getUsers(token));
  }, []);

  return (
    <PageWrapper>
      <Box position="relative" height="100%" width="100%">
        <Users />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          zIndex={-1}
          className={classes.center}
        >
          <BeerSvg className={classes.svg} />
        </Box>
      </Box>
    </PageWrapper>
  );
};

export default Home;
