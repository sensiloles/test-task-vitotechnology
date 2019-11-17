import React from 'react';
import { List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MenuItem from './MenuItem';

const useStyles = makeStyles(() => ({
  menuList: {
    width: '250px'
  }
}));

interface MenuListProps {
  toggleDrawer: () => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export default function MenuList({ toggleDrawer }: MenuListProps): JSX.Element {
  const classes = useStyles();

  const items = {
    home: {
      title: 'Home',
      path: '/',
      icon: <HomeIcon />
    },
    images: {
      title: 'Images',
      path: '/images',
      icon: <PermMediaIcon />
    },
    repositories: {
      title: 'Repositories',
      path: '/repos',
      icon: <FileCopyIcon />
    }
  };

  return (
    <div
      role="presentation"
      className={classes.menuList}
      onClick={toggleDrawer()}
      // TODO: Fix action with press enter
      onKeyDown={toggleDrawer()}
    >
      <List>
        {Object.values(items).map(item => (
          <MenuItem
            key={`menu-item_${item.title}`}
            title={item.title}
            path={item.path}
            icon={item.icon}
          />
        ))}
      </List>
    </div>
  );
}
