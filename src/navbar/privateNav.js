import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { Button } from '@material-ui/core';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ExtensionIcon from '@material-ui/icons/Extension';
import PhoneIcon from '@material-ui/icons/Phone';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DashboardIcon from '@material-ui/icons/Dashboard';
import StyleIcon from '@material-ui/icons/Style';
import HelpIcon from '@material-ui/icons/Help';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import picture from '../assets/pralhad.jpg';
import Image from 'material-ui-image';
import Logout from '../screens/Logout'
import history from '../utils/history';
import MyProfile from '../componenet/myProfile';

const styles = theme => ({
    item: {
        paddingTop: 1,
        paddingBottom: 1,
        color: 'rgba(255, 255, 255, 0.7)',
        // '&:hover,&:focus': {
        //   backgroundColor: 'rgba(255, 255, 255, 0.08)',
        // },
    },
    itemCategory: {
        backgroundColor: '#eb7134',
        boxShadow: '0 -1px 0 #404854 inset'
    },
    firebase: {
        fontSize: 24,
        color: theme.palette.common.white,
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
        marginTop: theme.spacing(2),
        backgroundColor: 'white'
    },
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        minWidth: 200,
        padding: 16
    },
    submit: {
        width: 146,
        backgroundColor: 'rgb(235, 113, 52)'
    },
    title: {
        flexGrow: 1,
    },

    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
});

const privateNavs = [
    {
        url: '/landing',
        name: 'Home',
        icon: <HomeIcon />
    },
    {
        url: '/tagadeed',
        name: 'Tag A Deed',
        icon: <StyleIcon />
    },
    {
        url: '/dashboard',
        name: 'Dashboard',
        icon: <DashboardIcon />
    },
    {
        url: '/pk',
        name: 'Help',
        icon: <HelpIcon />
    },
    {
        url: '/contact-us',
        name: 'Contact Us',
        icon: <PhoneIcon />
    },
    {
        url: '/pl',
        name: 'Notifications',
        icon: <NotificationsIcon />
    },
    // add new Nav links here as a json object, in this file the public navigations
];

class PrivateNavList extends Component {
  
  handelChnage = () => {
    history.push('/profile')
  }

  render() {
    const { classes, loggedInUser } = this.props;
    return (
        <List style={{ paddingTop: 0 }}>
          <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
              <PersonPinIcon style={{width: 130, height:130 }} />
              
              <Grid item>
                <Typography component="h6" variant="h6" style={{ color: 'white', marginTop: 3, }}>
                    {loggedInUser.Fname} {loggedInUser.Lname}
                </Typography>
              </Grid>
              <Grid item>
              <Button 
                style={{ color: 'white', marginBottom: 16 }}
                // onClick={this.handelChnage}
              >
                View Profile
              </Button>
              </Grid>
              </div>
            </Container >
          </ListItem>
          <Divider className={classes.divider} />
          {privateNavs.map(({ name, icon, url }) => (
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
          <Logout classes={classes}/>
        </List>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedInUser: state.auth.loggedInUser
});

export default withStyles(styles)(connect(mapStateToProps, undefined)(PrivateNavList));