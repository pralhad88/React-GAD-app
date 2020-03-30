import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ExtensionIcon from '@material-ui/icons/Extension';
import { Button } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DashboardIcon from '@material-ui/icons/Dashboard';
import StyleIcon from '@material-ui/icons/Style';
import InfoIcon from '@material-ui/icons/Info';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HelpIcon from '@material-ui/icons/Help';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import picture from '../assets/pralhad.jpg';
import Image from 'material-ui-image';
import Logout from '../screens/Logout'

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
        url: '/editDeed',
        name: 'Home',
        icon: <HomeIcon />
    },
    {
        url: '/firstLogin',
        name: 'My Tags',
        icon: <ExtensionIcon />
    },
    {
        url: '/tasks',
        name: 'My Fulfilled Tags',
        icon: <ExtensionIcon />
    },
    {
        url: '/report/dangling',
        name: 'Tag A Deed',
        icon: <StyleIcon />
    },
    {
        url: '/report/all',
        name: 'Top 10 Taggers',
        icon: <ExtensionIcon />
    },
    {
        url: '/feedbackble/report',
        name: "Top 10 Tag Fulfillers",
        icon: <ExtensionIcon />
    },
    {
        url: '/assign/user',
        name: 'Tag counter',
        icon: <ExtensionIcon />
    },
    {
        url: '/update/mobile/number',
        name: 'Dashboard',
        icon: <DashboardIcon />
    },
    {
        url: '/movies',
        name: 'About App',
        icon: <InfoIcon />
    },
    {
        url: '/movie',
        name: 'Terms And Conditions',
        icon: <AssignmentIcon />
    },
    {
        url: '/movi',
        name: 'Privacy Policy',
        icon: <AssignmentIcon />
    },
    {
        url: '/cookies-policy',
        name: 'Cookies Policy',
        icon: <AssignmentIcon />
    },
    {
        url: '/enduser-licenseagreement',
        name: 'End-User Licence Agreement',
        icon: <AssignmentIcon />
    },
    {
        url: '/disclaimer',
        name: 'Disclaimer',
        icon: <AssignmentIcon />
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

function PrivateNavList(props) {
    const { classes } = props;

    return (
        <List style={{ paddingTop: 0 }}>
          <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
              <Image
                src={picture}
                style={{ height: 140, width: 175, paddingTop: 0, backgroundColor: 'none' }}
                imageStyle={{
                  width: 99,
                  height: 93,
                  top: 37,
                  left: 36,
                  borderRadius: 50,
                }}
              />
              <Grid item>
                <Typography component="h6" variant="h6" style={{ color: 'white', marginTop: 3, }}>
                    Jadhav Pralhad
                </Typography>
              </Grid>
              <Grid item>
                <Button style={{ color: 'white', marginBottom: 16 }}>
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
          <Logout />
        </List>
    );
}

Navigator.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrivateNavList);