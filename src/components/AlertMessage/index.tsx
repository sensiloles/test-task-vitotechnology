import React, { useState, useEffect } from 'react';
import {
  Snackbar,
  SnackbarContent,
  makeStyles,
  IconButton,
  Theme
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';

const useStyles = makeStyles((theme: Theme) => ({
  iconMessage: {
    fontSize: 25,
    marginRight: '10px'
  },
  iconClose: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  content: {
    backgroundColor: theme.palette.error.dark
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
}));

interface AlertMessageProps {
  open: boolean;
  message: string;
}

export default function AlertMessage({
  open,
  message
}: AlertMessageProps): JSX.Element {
  const classes = useStyles();

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setOpenSnackbar(open);
  }, [open]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      open={openSnackbar}
      autoHideDuration={6000}
      onClose={(): void => {
        setOpenSnackbar(false);
      }}
    >
      <SnackbarContent
        className={classes.content}
        message={
          <span className={classes.message}>
            <WarningIcon className={classes.iconMessage} />
            {message}
          </span>
        }
        aria-describedby="client-snackbar"
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={(): void => {
              setOpenSnackbar(false);
            }}
          >
            <CloseIcon className={classes.iconClose} />
          </IconButton>
        ]}
      />
    </Snackbar>
  );
}
