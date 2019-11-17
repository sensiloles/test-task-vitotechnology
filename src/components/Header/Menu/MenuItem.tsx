import React from 'react';
import { Link } from 'react-router-dom';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles({
  itemLink: { color: 'black', textDecoration: 'none' }
});

interface MenuItemProps {
  title: string;
  path: string;
  icon: JSX.Element;
}

export default function MenuItem({
  title,
  path,
  icon
}: MenuItemProps): JSX.Element {
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>
        <Link to={path} className={classes.itemLink}>
          {title}
        </Link>
      </ListItemText>
    </ListItem>
  );
}
