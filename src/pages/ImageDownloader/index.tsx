import React, { useState, useReducer, useEffect } from 'react';
import axios from 'axios';
import { Typography, makeStyles } from '@material-ui/core';
import ImageForm from './ImageForm';
import ImageList from './ImageList';
import { ImageDataState, ImageDataActions } from '../../types/imageDownloader';

const useStyles = makeStyles(() => ({
  imageDownloader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  }
}));

function splitState(state: ImageDataState, url: string): ImageDataState {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [url]: deletedUrl, ...stateRest } = state;

  return stateRest;
}

function imageDataReducer(
  state: ImageDataState,
  action: ImageDataActions
): ImageDataState {
  const url = action.payload;

  switch (action.type) {
    case 'REQUEST_FETCHING':
      return {
        ...state,
        [url]: {
          status: 'loading'
        }
      };
    case 'REQUEST_SUCCESS':
      return {
        ...state,
        [url]: {
          status: 'isLoaded'
        }
      };
    case 'REQUEST_FAILED':
      return splitState(state, url);
    default: {
      return {
        ...state
      };
    }
  }
}

export default function ImageDownloader(): JSX.Element {
  const classes = useStyles();

  const [query, setQuery] = useState('');
  const [queryError, setQueryError] = useState(false);
  const [imageData, setImageData] = useReducer(
    imageDataReducer,
    {} as ImageDataState
  );

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setQueryError(false);
      const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
      setImageData({ type: 'REQUEST_FETCHING', payload: query });

      try {
        const result = await axios(CORS_PROXY + query);

        if (result.status === 200) {
          if (result.headers['content-type'].includes('image')) {
            setQueryError(false);
            setImageData({ type: 'REQUEST_SUCCESS', payload: query });
          } else {
            throw new Error('The content type of this URL is not an image');
          }
        }
      } catch (err) {
        setImageData({ type: 'REQUEST_FAILED', payload: query });
        setQueryError(true);
        console.error(`Fetch request image is failed. Error: ${err.message}`);
      }
    };

    if (query) {
      fetchData();
      setQuery('');
    }
  }, [query]);

  const imageDataIsEmpty = !Object.keys(imageData).length;

  return (
    <div className={classes.imageDownloader}>
      <ImageForm
        setQuery={setQuery}
        queryError={queryError}
        setQueryError={setQueryError}
      />
      {imageDataIsEmpty ? (
        <Typography color="textSecondary">Not images</Typography>
      ) : (
        <ImageList images={imageData} />
      )}
    </div>
  );
}
