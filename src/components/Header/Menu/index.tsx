import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) => ({
  menuList: {
    width: '300px'
  }
}));

export default function Menu(): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => (
    event: React.KeyboardEvent | React.MouseEvent
  ): void => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(!open);
  };

  const menuItems = (
    <div
      role="presentation"
      className={classes.menuList}
      onClick={toggleDrawer()}
      // TODO: Fix action with press enter
      onKeyDown={toggleDrawer()}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText color="red">
            <Link to="/">Home</Link>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PermMediaIcon />
          </ListItemIcon>
          <ListItemText>
            <Link to="/images">Images</Link>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FileCopyIcon />
          </ListItemIcon>
          <ListItemText>
            <Link to="/repos">Repositories</Link>
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className="menu">
      <IconButton onClick={toggleDrawer()}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        open={open}
        onClose={toggleDrawer()}
        onOpen={toggleDrawer()}
      >
        {menuItems}
      </SwipeableDrawer>
    </div>
  );
}
