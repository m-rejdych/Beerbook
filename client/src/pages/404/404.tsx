import React from 'react';
import { Box, Typography } from '@material-ui/core';

import { ReactComponent as NotFoundSvg } from '../../assets/NotFound.svg';
import PageWrapper from '../../shared/components/PageWrapper';

const NotFound: React.FC = () => {
  return (
    <PageWrapper>
      <Box
        height="100%"
        flexDirection="column"
        display="flex"
        alignItems="center"
        justifyContent="center"
        pb={20}
      >
        <Box clone width={500} mb={-20}>
          <NotFoundSvg />
        </Box>
        <Typography variant="h2" color="textSecondary">
          Page not found!
        </Typography>
      </Box>
    </PageWrapper>
  );
};

export default NotFound;
