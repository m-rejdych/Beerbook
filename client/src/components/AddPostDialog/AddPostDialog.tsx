import React from 'react';
import {
  Dialog,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import AddPostForm from '../AddPostForm';

const useStyles = makeStyles((theme) => ({
  displayFlex: {
    display: 'flex',
    alignItems: 'center',
  },
  flexGrow: {
    flexGrow: 1,
  },
  paper: {
    minWidth: '50vw',
  },
}));

interface Props {
  open: boolean;
  token: string;
  handleClose: () => void;
  title?: string;
  content?: string;
  beers?: number;
  _id?: string;
  updating?: boolean;
}

const AddPostDialog: React.FC<Props> = ({
  open,
  token,
  handleClose,
  title,
  content,
  beers,
  _id,
  updating,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{ paperScrollPaper: classes.paper }}
    >
      <DialogTitle disableTypography className={classes.displayFlex}>
        <Typography variant="h5" component="h2" className={classes.flexGrow}>
          Add post
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <AddPostForm
        token={token}
        handleClose={handleClose}
        title={title}
        content={content}
        beers={beers}
        _id={_id}
        updating={updating}
      />
    </Dialog>
  );
};

export default AddPostDialog;
