import React, { useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import validateUrl from '../../../utils/validateUrl';
import Message from '../../Message';

const useStyles = makeStyles(() => ({
  imageForm: {
    justifyContent: 'center',
    display: 'flex',
    margin: '50px 0px'
  },
  urlInput: {
    marginRight: '5px'
  }
}));

interface ImageFormProps {
  setQuery: (imageUrl: string) => void;
  queryError: boolean;
  setQueryError: (error: boolean) => void;
}

export default function ImageForm({
  setQuery,
  queryError,
  setQueryError
}: ImageFormProps): JSX.Element {
  const classes = useStyles();

  const [imageUrl, setImageUrl] = useState('');
  const [formError, setFormError] = useState(false);

  function submitForm(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (!imageUrl) return;

    if (!validateUrl(imageUrl)) {
      setQueryError(true);
      setImageUrl('');
    } else {
      setQueryError(false);
      setQuery(imageUrl);
      setImageUrl('');
    }
  }

  function onChangeImageUrlInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const { value } = e.currentTarget;
    setImageUrl(value);

    if (!value) {
      setFormError(true);
    } else {
      setFormError(false);
    }

    setQueryError(false);
  }

  return (
    <form
      noValidate
      autoComplete="off"
      className={classes.imageForm}
      onSubmit={submitForm}
    >
      <TextField
        value={imageUrl}
        onChange={onChangeImageUrlInput}
        fullWidth
        variant="outlined"
        margin="none"
        required
        className={classes.urlInput}
        error={queryError || formError}
      />
      <Button
        type="submit"
        variant="contained"
        color="default"
        startIcon={<CloudDownloadIcon />}
        disabled={formError || queryError}
      >
        Upload
      </Button>
      <Message open={queryError} />
    </form>
  );
}
