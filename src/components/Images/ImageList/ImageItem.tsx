import React from 'react';
import { CardMedia } from '@material-ui/core';
import placeholder from '../../../assets/images/image_placeholder.png';

interface ImageProps {
  image: string;
  status: string;
  className: string;
  component: string;
  alt: string;
}

export default function Image({
  image,
  status,
  ...rest
}: ImageProps): JSX.Element {
  const props =
    status === 'isLoaded'
      ? { image, ...rest }
      : { image: placeholder, ...rest };

  return <CardMedia {...props} />;
}
