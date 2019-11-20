import React from 'react';
import { makeStyles } from '@material-ui/core';
import ImageItem from './ImageItem';

const useStyles = makeStyles(() => ({
  imageList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,28vw)',
    gridAutoRows: '28vw',
    gridGap: '2vw',
    marginBottom: '60px'
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
      <ImageItem
        key={image}
        className={classes.image}
        component="img"
        alt={image}
        image={image}
        status={status}
      />
    );
  });

  return <div className={classes.imageList}>{content}</div>;
}
