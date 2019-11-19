import React from 'react';
import { makeStyles } from '@material-ui/core';
import ImageItem from './ImageItem';

const useStyles = makeStyles(() => ({
  imageList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gridTemplateRows: '1fr',
    gridGap: '5px',
    marginBottom: '60px',
    height: '100%'
  },
  imageCard: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '100%'
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
      // TODO: Fix grid squares
      // <div key={image} className={classes.imageCard}>
      <ImageItem
        key={image}
        className={classes.image}
        component="img"
        alt={image}
        image={image}
        status={status}
      />
      // </div>
    );
  });

  return <div className={classes.imageList}>{content}</div>;
}
