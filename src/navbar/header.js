import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Badge from '@material-ui/core/Badge';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

import PublicNavList from './publicNav';
import PrivateNavList from './privateNav';
import history from '../utils/history'

import { logout } from '../store/actions/auth';
import { withStyles } from '@material-ui/core/styles';

import Filters from '../componenet/filters';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(1)
  },
  title: {
    flexGrow: 1,
  },
});

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      componentsmenuopen: false,
      modalOpen: false,
      filtersDailogOpen: false,

    };
  }
  filtersHandleClose = () => {
    this.setState({
      filtersDailogOpen: false,

    })
  };
  Filter = () => {
    this.setState({
      filtersDailogOpen: true
    })
  }
  onLeftIconButtonClick = () => {
    this.setState({ open: true });
  };

  toggleDrawer = (open) => () => {
    this.setState({
      open: open,
    });
  };

  handleClose = event => {
    if (this.target1.contains(event.target) || this.target2.contains(event.target)) {
      return;
    }

    this.setState({ componentsmenuopen: false });
  };

  renderProgressBar = () => this.props.isFetching ? (<LinearProgress />) : (<span></span>)

  goTotagDeed = () => {
    history.push('/tagadeed')
  }
  
  render() {
    const { classes, history } = this.props;
    return (
      <div>
        <Drawer open={this.state.open} onClose={this.toggleDrawer(false)} >
          {this.props.isAuthenticated && (<React.Fragment>
            <PrivateNavList />
          </React.Fragment>
          )}
          {!this.props.isAuthenticated && (<React.Fragment>
            <PublicNavList />
          </React.Fragment>)}
        </Drawer>
        <div className="appbarwrapper">
          <AppBar
            position="fixed"
          >
            {this.renderProgressBar()}
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between', background: '#eb7134' }}>
              <Box style={{ display: 'flex' }}>
                <IconButton className="iconbuttonsyle" color="inherit" aria-label="Menu" onClick={this.onLeftIconButtonClick}>
                  <MenuIcon />
                </IconButton>
              </Box>
              {this.props.isAuthenticated && (history.location['pathname'] == '/landing' || history.location['pathname'] == '/listOfdeed') && (<React.Fragment>
                <Typography variant="h5">
                  Tagged Deed
              </Typography>
              </React.Fragment>)}
              {/* {this.props.isAuthenticated && history.location['pathname'] !== '/landing' && (<React.Fragment>
                <Typography variant="h5">
                  Gift a Deed
              </Typography>
              </React.Fragment>)} */}
              {!this.props.isAuthenticated && (<React.Fragment>
                <Typography variant="h5">
                  Gift a Deed
              </Typography>
              </React.Fragment>)}
              <div className={classes.root} />
              {history.location['pathname'] == '/landing' || history.location['pathname'] == '/listOfdeed' ?
                <div>
                  <IconButton color="inherit">
                    <Badge color="secondary">
                      <CameraAltOutlinedIcon
                        onClick={this.goTotagDeed} 
                      />
                    </Badge>
                  </IconButton>

                  <IconButton color="inherit" onClick={this.Filter}>
                    <Badge color="secondary">
                      <SettingsInputComponentIcon />
                    </Badge>
                  </IconButton> </div> : null
              }
            </Toolbar>
          </AppBar>
          <Filters
            dailogOpen={this.state.filtersDailogOpen}
            dailogClose={this.filtersHandleClose}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isFetching: state.auth.isFetching
});

const mapDispatchToProps = (dispatch, props) => ({
  startLogout: () => dispatch(logout())
});

export default withRouter(withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(Header)))