import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Profile from '../assets/pralhad.jpg';
import Image from 'material-ui-image';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { connect } from 'react-redux';

const baseUrl = process.env.API_URL;
const payload = new FormData();

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    submit: {
        width: 100,
        color: 'white',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    hw: {
        width: 80,
        height: 80,
    }
});

class AdvisoryBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    handleClose = () => {
        const { dailogClose } = this.props;
        dailogClose()
    }


    componentDidMount() {
        const {loggedInUser} = this.props;
        payload.append('User_ID', loggedInUser.User_ID)
        
        axios.post(`${baseUrl}advisory_board.php`, payload)
        .then((res) => {
            this.setState({
                data: res.data.advisory
            })
        })
    }
    
    render() {
        const { classes, dailogOpen } = this.props;
        const { data } = this.state;
        console.log(data, "bablu")
        return (
            <Fragment>
              <Dialog open={dailogOpen} >
                <DialogContent>
                  <CssBaseline />
                  <AppBar position='absolute'>
                    <Toolbar>
                      <ArrowBackIcon
                        onClick={this.handleClose}
                        style={{ color: 'white', cursor: 'pointer' }}
                        className={classes.menuButton}
                      />
                      <Typography variant="h6" className={classes.title}>
                        Advisory Board
                      </Typography>
                    </Toolbar>
                  </AppBar>
                  <Box my={7}>
                    <Typography style={{ textAlign: 'center' }} component="h1" variant="h6">
                      Advisory Board
                    </Typography>
                    <hr></hr>
                  </Box>
                  {data.map((advisory) => (
                    <div>
                      <center>
                        <Box my={2}>
                          {/* <Image
                            src={Profile}
                            style={{ height: 140, width: 175, paddingTop: 0, backgroundColor: 'none' }}
                            imageStyle={{
                            width: 150,
                            height: 150,
                              }}
                          /> */}
                          <PersonPinIcon
                            style={{ width: 120, height: 120 }}
                          />
                        </Box>
                        {/* <Avatar alt="profile" src={Profile} /> */}
                        <Box my={2}>
                          <Typography component="h6" variant="h6" style={{ cursor: 'pointer' }}>
                            {advisory.name}
                          </Typography>
                          <Typography variant="h6" style={{color: 'coral'}}> About Me </Typography>
                        </Box>
                      </center>
                      <Box>
                        <p>{advisory.desc}</p>
                      </Box>
                    </div>
                  ))}
                </DialogContent>
              </Dialog>
            </Fragment >
        );
    }
}

const mapStateToProps = (state) => ({
    loggedInUser: state.auth.loggedInUser
});

export default withStyles(styles)(connect(mapStateToProps, undefined)(AdvisoryBoard));