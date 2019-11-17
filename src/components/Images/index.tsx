import React, { useState, useReducer, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import ImageForm from './ImageForm';
import ImageList from './ImageList';

const useStyles = makeStyles(() => ({
  content: {}
}));

interface ImageDataState {
  [key: string]: {
    status: string;
  };
}

interface ImageDataAction {
  type: string;
  payload: string;
}

const initialState: ImageDataState = {};

function splitState(state: ImageDataState, url: string): ImageDataState {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [url]: deletedUrl, ...stateRest } = state;

  return stateRest;
}

function imageDataReducer(
  state: ImageDataState,
  action: ImageDataAction
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
    case 'RESPONSE_NOT_VALID':
      return splitState(state, url);
    default: {
      return {
        ...state
      };
    }
  }
}

export default function ImageDownloader(): JSX.Element {
  const [query, setQuery] = useState('');
  const [queryError, setQueryError] = useState(false);
  const [imageData, setImageData] = useReducer(imageDataReducer, initialState);

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
        setImageData({ type: 'RESPONSE_NOT_VALID', payload: query });
        setQueryError(true);
        console.error(`Fetch request image is failed. Error: ${err.message}`);
      }
    };

    if (query) fetchData();
    setQuery('');
  }, [query]);

  const imageDataIsEmpty = !Object.keys(imageData).length;

  return (
    <Grid container alignContent="center" justify="center">
      <Grid item lg={4}>
        <ImageForm
          setQuery={setQuery}
          queryError={queryError}
          setQueryError={setQueryError}
        />
      </Grid>
      {imageDataIsEmpty ? (
        <Grid item container justify="center">
          <Typography>Not images</Typography>
        </Grid>
      ) : (
        <ImageList images={imageData} />
      )}
    </Grid>
  );
}
