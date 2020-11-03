import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  makeStyles,
  CircularProgress,
  Typography,
  Box,
} from '@material-ui/core';
import { Formik } from 'formik';
import { useHistory, useLocation } from 'react-router-dom';

import InputElement from '../InputElement';
import { RootState } from '../../store/reducers';
import { signup, login, setAuthError } from '../../store/actions';
import InitialValues from '../../types/AuthValues';

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 500,
    borderRadius: 10,
    position: 'relative',
    overflow: 'visible',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  switchLink: {
    position: 'absolute',
    top: `calc(100% + ${theme.spacing(1)}px)`,
    left: theme.spacing(2),
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  errorMessage: {
    color: theme.palette.error.main,
    maxWidth: 500,
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
  },
}));

interface FieldData {
  name: string;
  type: string;
  label: string;
  hidden?: boolean;
  validate: (value: string) => string | undefined;
}

const AUTH_URLS = {
  LOGIN: '/login',
  SIGNUP: '/signup',
};

const AuthForm: React.FC = () => {
  const error = useSelector((state: RootState) => state.auth.error);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const url = location.pathname;
  const loginMode = url === AUTH_URLS.LOGIN;

  const renderFields = (values: InitialValues): FieldData[] => [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      validate: (value: string): string | undefined => {
        let error: string | undefined;
        if (
          !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value,
          )
        ) {
          error = 'Please, enter a valid email!';
        }
        return error;
      },
    },
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      hidden: loginMode,
      validate: (value: string): string | undefined => {
        let error: string | undefined;
        if (value.trim().length < 2)
          error = 'Name should be at least 2 characters long!';
        return error;
      },
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      validate: (value: string): string | undefined => {
        let error: string | undefined;
        if (!/^(?=.*\d).{4,8}$/.test(value))
          error =
            'Password should be at least 4 characters long and contain a number!';
        return error;
      },
    },
    {
      name: 'confirmPassword',
      type: 'password',
      label: 'Confirm password',
      hidden: loginMode,
      validate: (value: string): string | undefined => {
        let error: string | undefined;
        if (values.password !== value || value.trim() === '')
          error = 'Passwords should be the same!';
        return error;
      },
    },
  ];

  const handleSwitch = (handleReset: () => void): void => {
    handleReset();
    dispatch(setAuthError(null));
    history.push(loginMode ? AUTH_URLS.SIGNUP : AUTH_URLS.LOGIN);
  };

  const handleSubmit = (values: InitialValues): void => {
    dispatch(loginMode ? login(values) : signup(values));
  };

  const initialValues = loginMode
    ? {
        email: '',
        password: '',
      }
    : {
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
      };

  return (
    <div>
      {error && (
        <Typography className={classes.errorMessage}>{error}</Typography>
      )}
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({ values, isValid, dirty, handleReset }) => (
          <Card className={classes.card} elevation={3}>
            <CardContent className={classes.cardContent}>
              {renderFields(values)
                .filter(({ hidden }) => !hidden)
                .map((field) => (
                  <InputElement
                    key={field.name}
                    handleSubmit={(): void => handleSubmit(values)}
                    {...field}
                  />
                ))}
            </CardContent>
            <CardActions>
              <Box clone width={100}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!isValid || !dirty}
                  onClick={(): void => handleSubmit(values)}
                >
                  {loading ? (
                    <CircularProgress size={24} color="secondary" />
                  ) : loginMode ? (
                    'Log in'
                  ) : (
                    'Sign up'
                  )}
                </Button>
              </Box>
            </CardActions>
            <Typography
              variant="caption"
              color="textSecondary"
              className={classes.switchLink}
              onClick={() => handleSwitch(handleReset)}
            >
              {loginMode
                ? "I don't have an account yet!"
                : 'I already have an account!'}
            </Typography>
          </Card>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;
