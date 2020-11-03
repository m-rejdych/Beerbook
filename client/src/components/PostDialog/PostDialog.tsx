import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { ReactComponent as BeerSvg } from '../../assets/Beer.svg';
import { RootState } from '../../store/reducers';
import { deletePost, giveBeer } from '../../store/actions';
import UpdatePostDialog from '../AddPostDialog';

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  flexGrow: {
    flexGrow: 1,
  },
  svg: {
    width: 30,
    marginRight: theme.spacing(1),
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    marginLeft: theme.spacing(2),
  },
}));

interface Props {
  token: string;
  title: string;
  content: string;
  beers: number;
  _id: string;
  open: boolean;
  handleClose: () => void;
}

const PostDialog: React.FC<Props> = ({
  token,
  open,
  handleClose,
  title,
  content,
  beers,
  _id,
}) => {
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const classes = useStyles();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const selectedUserId = useSelector(
    (state: RootState) => state.users.selectedUser.userId,
  );
  const dispatch = useDispatch();

  const isMe = userId === selectedUserId;

  const toggleUpdateDialog = (): void => {
    setUpdateDialogOpen((prev) => !prev);
  };

  const toggleUpdatePost = (): void => {
    handleClose();
    toggleUpdateDialog();
  };

  const handleDeletePost = (): void => {
    dispatch(deletePost({ token, _id }));
  };

  const handleBeer = (): void => {
    dispatch(giveBeer({ token, _id }));
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle disableTypography className={classes.flexContainer}>
          <Typography variant="h4" className={classes.flexGrow}>
            {title}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>{content}</Typography>
        </DialogContent>
        <DialogActions>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {isMe ? (
              <>
                <Button
                  onClick={toggleUpdatePost}
                  color="primary"
                  variant="contained"
                >
                  Update post
                </Button>
                <Button
                  onClick={handleDeletePost}
                  variant="contained"
                  className={classes.deleteButton}
                >
                  Delete post
                </Button>
              </>
            ) : (
              <Button onClick={handleBeer} variant="outlined" color="primary">
                Give this man a beer!
              </Button>
            )}
            <Box display="flex" alignItems="center" ml={2}>
              <BeerSvg className={classes.svg} />
              <Typography>{beers}</Typography>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>
      <UpdatePostDialog
        open={updateDialogOpen}
        handleClose={toggleUpdateDialog}
        token={token}
        _id={_id}
        title={title}
        content={content}
        beers={beers}
        updating
      />
    </>
  );
};

export default PostDialog;
