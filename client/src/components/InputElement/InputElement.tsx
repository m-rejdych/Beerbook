import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import { useField } from 'formik';

import { KEYS } from '../../shared/constants';

const useStyles = makeStyles((theme) => ({
  marginBottom: {
    '&:not(:last-child)': {
      marginBottom: theme.spacing(3),
    },
  },
}));

interface Props {
  name: string;
  type: string;
  validate: (value: string) => string | undefined;
  label: string;
  handleSubmit: () => void;
  multiline?: boolean;
  rows?: number;
}

const InputElement: React.FC<Props> = ({
  label,
  type,
  handleSubmit,
  multiline,
  rows,
  ...rest
}) => {
  const classes = useStyles();
  const [field, { touched, error }] = useField({ ...rest, type });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === KEYS.ENTER) handleSubmit();
  };

  return (
    <TextField
      {...field}
      className={classes.marginBottom}
      type={type}
      variant="outlined"
      label={label}
      helperText={touched && error}
      error={!!(touched && error)}
      onKeyPress={handleKeyPress}
      multiline={multiline}
      rows={multiline && rows ? rows : 1}
    />
  );
};

export default InputElement;
