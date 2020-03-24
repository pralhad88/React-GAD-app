import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PhoneIcon from '@material-ui/icons/Phone';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { NavLink } from 'react-router-dom';

const styles = theme => ({
  item: {
      paddingTop: 1,
      paddingBottom: 1,
      color: 'rgba(255, 255, 255, 0.7)',
      // '&:hover,&:focus': {
      //   backgroundColor: 'rgba(255, 255, 255, 0.08)',
      // },
  },
  itemActiveItem: {
      color: '#4fc3f7',
  },
  itemPrimary: {
      fontSize: 'inherit',
      color: 'black'
  },
  itemIcon: {
      minWidth: 'auto',
      marginRight: theme.spacing(2),
  },
  divider: {
      marginTop: theme.spacing(4),
      backgroundColor: 'white'
  },
});

const publicNavs = [
  {
    url: '/',
    name: 'Login',
    icon: <LockOpenIcon />
  },
  {
    url: '/register',
    name: 'Sign Up',
    icon: <PersonAddIcon />
  },
  {
    url: '/contact',
    name: 'Contact',
    icon: <PhoneIcon />
  },
  // add new Nav links here as a json object, in this file the public navigations
];

function PublicNavList (props) {
  const { classes } = props;
  return (
    <List style={{ paddingTop: 0, padding: 20 }}>
      <Divider className={classes.divider} />
      {publicNavs.map(({ name, icon, url }) => (
            <React.Fragment key={name}>
              <NavLink to={url} className="NavLinkItem" key={url} activeClassName="NavLinkItem-selected">
                <ListItem
                  key={name}
                  button
                  className={clsx(classes.item && classes.itemActiveItem)}
                >
                  <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary,
                    }}
                  >
                    {name}
                  </ListItemText>
                </ListItem>
              </NavLink>
            </React.Fragment>
          ))}
    </List>
  )
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PublicNavList);