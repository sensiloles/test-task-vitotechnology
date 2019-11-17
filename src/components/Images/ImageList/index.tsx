import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import ImageItem from './ImageItem';

const useStyles = makeStyles(theme => ({
  imageList: {
    marginBottom: '30px'
  },
  imageCardContainer: {
    marginBottom: '30px',
    [theme.breakpoints.only('lg')]: {
      marginBottom: '25px'
    },
    [theme.breakpoints.only('md')]: {
      marginBottom: '20px'
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '10px'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px'
    }
  },
  imageCard: {
    margin: '0 auto',
    width: '30em',
    height: '30em',
    [theme.breakpoints.only('lg')]: {
      width: '25em',
      height: '25em'
    },
    [theme.breakpoints.only('md')]: {
      width: '19em',
      height: '19em'
    },
    [theme.breakpoints.down('sm')]: {
      width: '13em',
      height: '13em'
    },
    [theme.breakpoints.down('xs')]: {
      width: '6em',
      height: '6em'
    }
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
}));

interface ImageListProps {
  images: {
    [key: string]: {
      status: string;
    };
  };
}

export default function ImageList({ images }: ImageListProps): JSX.Element {
  const classes = useStyles();

  const content = Object.keys(images).map(image => {
    const { status } = images[image];

    return (
      <Grid key={image} item xs={4} className={classes.imageCardContainer}>
        <div className={classes.imageCard}>
          <ImageItem
            className={classes.image}
            component="img"
            alt={image}
            image={image}
            status={status}
          />
        </div>
      </Grid>
    );
  });

  return (
    <Grid item lg={12} container className={classes.imageList}>
      {content}
    </Grid>
  );
}
