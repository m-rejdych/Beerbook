import React, { useState } from 'react';
import { Card, CardHeader, makeStyles } from '@material-ui/core';

import PostDialog from '../PostDialog';

interface StyleProps {
  top: number;
  left: number;
}

const useStyles = makeStyles((theme) => ({
  card: {
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: 10,
    position: 'absolute',
    top: ({ top }: StyleProps): string => `${top}%`,
    left: ({ left }: StyleProps): string => `${left}%`,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:active': {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

interface Props extends StyleProps {
  title: string;
  content: string;
  beers: number;
  token: string;
  _id: string;
}

const Post: React.FC<Props> = ({ title, token, top, left, ...rest }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles({ top, left });

  const toggleDialog = (): void => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Card elevation={7} className={classes.card} onClick={toggleDialog}>
        <CardHeader title={title} />
      </Card>
      <PostDialog
        open={open}
        handleClose={toggleDialog}
        title={title}
        token={token}
        {...rest}
      />
    </>
  );
};

export default Post;
