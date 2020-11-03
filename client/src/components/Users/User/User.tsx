import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardHeader, makeStyles } from '@material-ui/core';

import { UserInfo } from '../../../types/UserData';

interface StylesProps {
  top: number;
  left: number;
}

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'absolute',
    top: ({ top }: StylesProps): string => `${top}%`,
    left: ({ left }: StylesProps): string => `${left}%`,
    cursor: 'pointer',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 10,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:active': {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

type Props = UserInfo & StylesProps;

const User: React.FC<Props> = ({ userId, email, name, top, left }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const classes = useStyles({ top, left });
  const history = useHistory();

  const handleClick = (): void => {
    history.push(`/user/${userId}`);
  };

  return (
    <Card
      ref={cardRef}
      className={classes.card}
      onClick={handleClick}
      elevation={7}
    >
      <CardHeader title={name} subheader={email} />
    </Card>
  );
};

export default User;
