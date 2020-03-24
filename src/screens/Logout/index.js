import React, { Fragment } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { logout } from '../../store/actions/auth';
import { withRouter } from 'react-router-dom';
import { Dialog } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import Toolbar from '@material-ui/core/Toolbar';
import Image from 'material-ui-image';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Box } from '@material-ui/core';
import { theme } from '../../theme/theme';
import logo from '../../assets/logo.png';

const styles = theme => ({
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
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
    color: 'black'
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)'
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
})

export class Logout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    }
  }

  logout = () => {
    const { history, startLogout } = this.props;
    startLogout()
    this.setState({
      modalOpen: false
    });
    history.push('/');
  };

  handleOpen = () => {
    this.setState({
      modalOpen: true
    })
  }

  handleClose = () => {
    this.setState({
      modalOpen: false
    })
  };

  render = () => {
    const { classes } = this.props;
    return (
      <Fragment>
        <Button onClick={this.handleOpen}>
          <ListItem className={clsx(classes.item && classes.itemActiveItem)}>
            <ListItemIcon className={classes.itemIcon}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText
              classes={{
                primary: classes.itemPrimary,
              }}
            >
              Logout
            </ListItemText>
          </ListItem>
        </Button>
        <Dialog
          open={this.state.modalOpen}
          onClose={this.handleClose}
        >
          <DialogContent className={classes.container}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Toolbar style={{ backgroundColor: '#eb7134', height: 30, position: 'static', minHeight: 50 }}>
                  <Image
                    color="inherit"
                    src={logo}
                    style={{ height: -70, width: -120, paddingTop: 0 }}
                    imageStyle={{ height: 50, width: 80, left: 83 }}
                  />
                </Toolbar>
                <Box style={{ height: theme.spacing(4) }} />
                <Typography component="h1" variant="h5">Do you really want to logout?</Typography>
                <Box style={{ height: theme.spacing(3) }} />
                <Grid container item>
                  <Grid item xs={6}>
                    <Button
                      type="submit"
                      halfWidth
                      variant="contained"
                      justifyContent='center'
                      color="primary"
                      onClick={this.logout}
                      className={classes.submit}
                    >
                      Yes
                      </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      type="submit"
                      halfWidth
                      variant="contained"
                      justifyContent='center'
                      color="primary"
                      onClick={this.handleClose}
                      className={classes.submit}
                    >
                      No
                      </Button>
                  </Grid>
                </Grid>
                <Box style={{ height: theme.spacing(2) }} />
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  };
};

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(logout())
});

export default withSnackbar(withRouter(withStyles(styles)(connect(undefined, mapDispatchToProps)(Logout))))