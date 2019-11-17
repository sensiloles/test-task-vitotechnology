import React, { useState } from 'react';
import { SwipeableDrawer, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuList from './MenuList';

export default function Menu(): JSX.Element {
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
        <MenuList toggleDrawer={toggleDrawer} />
      </SwipeableDrawer>
    </div>
  );
}
