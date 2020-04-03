import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Dialog from '@material-ui/core/Dialog';
import { connect } from 'react-redux';
import axios from 'axios';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';

const baseUrl = process.env.API_URL;
const payload = new FormData();

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  dailogStlye: {
    height: 750,
    marginLeft: -14
  },
  taggedScoreMargin: {
    marginLeft: -26
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
  media: {
    height: 150,
    width: 150,
    marginLeft: 45
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
    marginTop: theme.spacing(1),
    backgroundColor: 'white'
  },
});

class TagCounter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fulfilled: '',
      tagged: '',
    };
  }
  componentDidMount() {
    this.fetchTagCounter();
  }

  async fetchTagCounter() {
    const { loggedInUser } = this.props;
    try {
      payload.append('userId', parseInt(loggedInUser.User_ID))

      const response = await axios.post(`${baseUrl}tag_counter.php`, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
      console.log(response.data, "swati111111111111111111111111")
      this.setState({
        fulfilled: response.data.fulfilled,
        tagged: response.data.tagged,
      })

    } catch (e) {
      console.log(e)
    }
  }

  handleClose = () => {
    const { dailogClose } = this.props;
    dailogClose()
  };
  render() {
    const { classes, dailogOpen } = this.props;

    return (
      <Fragment>
        <Dialog open={dailogOpen}>
          <DialogContent className={classes.dailogStlye} >
            <CssBaseline />
            <AppBar position='absolute'>
              <Toolbar>
                <ArrowBackIcon
                  onClick={this.handleClose}
                  style={{ color: 'white', cursor: 'pointer' }}
                />
                <center>
                <Typography variant="h6" >
                    Tag Counter
                  </Typography>
                </center>
              </Toolbar>
            </AppBar>
            <div>
              <Box my={9}>
                <p style={{ color: "Gray", textAlign: "center" }}>
                  Tagged Deeds & Fulfilled Deeds for day
                  </p>
                <hr style={{ color: "Gray", marginBottom: -55 }}></hr>
              </Box>
              <Box my={9}>

                <p style={{ textAlign: "center", marginBottom: -60 }}>
                  <span style={{ color: '#f05f40', cursor: 'pointer', marginRight: 7 }}>
                    Today's Deed Deeds
                   </span>
                  <span style={{ color: 'MediumSeaGreen', cursor: 'pointer' }}>
                    Today's Fulfilled Deeds
                   </span>
                </p>
              </Box>
              <Box my={9}>

                <p>
                  <span style={{ cursor: 'pointer', marginLeft: 65 }}>
                    {this.state.tagged}

                  </span>
                  <span style={{ cursor: 'pointer', marginLeft: 121 }}>
                    {this.state.fulfilled}

                  </span>
                </p>
              </Box>
            </div>

          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedInUser: state.auth.loggedInUser
});

export default withStyles(styles)(connect(mapStateToProps, undefined)(TagCounter));

