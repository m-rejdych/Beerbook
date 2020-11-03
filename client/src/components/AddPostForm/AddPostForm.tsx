import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DialogContent,
  DialogActions,
  makeStyles,
  Button,
  CircularProgress,
  Box,
} from '@material-ui/core';
import { Formik } from 'formik';

import { addPost, updatePost } from '../../store/actions';
import { UpdatePostData } from '../../store/types/usersTypes';
import { RootState } from '../../store/reducers';
import InputElement from '../InputElement';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

interface InitialValues {
  title: string;
  content: string;
}

interface Props {
  handleClose: () => void;
  token: string;
  updating?: boolean;
  title?: string;
  content?: string;
  beers?: number;
  _id?: string;
}

const AddPostForm: React.FC<Props> = ({
  handleClose,
  token,
  title,
  content,
  beers,
  _id,
  updating,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdded && !loading && !error) {
      handleClose();
      setIsAdded(false);
    }
  }, [loading, isAdded, error]);

  const initialValues = {
    title: title || '',
    content: content || '',
  };

  const fields = [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      validate: (value: string): string | undefined => {
        let error;
        if (value.trim().length === 0) error = 'Title can not be empty!';
        return error;
      },
    },
    {
      name: 'content',
      type: 'text',
      label: 'Content',
      validate: (value: string): string | undefined => {
        let error;
        if (value.trim().length === 0) error = 'Content can not be empty!';
        return error;
      },
    },
  ];

  const handleSubmit = (values: InitialValues): void => {
    if (updating)
      dispatch(updatePost({ token, beers, _id, ...values } as UpdatePostData));
    else dispatch(addPost({ token, beers: 0, ...values }));
    setIsAdded(true);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ values }) => (
        <>
          <DialogContent className={classes.dialogContent}>
            {fields.map((field, index) => (
              <InputElement
                key={field.name}
                handleSubmit={(): void => handleSubmit(values)}
                multiline={index === fields.length - 1}
                rows={index === fields.length - 1 ? 3 : 1}
                {...field}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Box clone width={110}>
              <Button
                color="primary"
                variant="contained"
                onClick={(): void => handleSubmit(values)}
              >
                {loading ? (
                  <CircularProgress size={24} color="secondary" />
                ) : (
                  'Add post'
                )}
              </Button>
            </Box>
          </DialogActions>
        </>
      )}
    </Formik>
  );
};

export default AddPostForm;
