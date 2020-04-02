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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import Link from '@material-ui/core/Link';

const baseUrl = process.env.API_URL;
const payload = new FormData();
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  dailogStlye:{
    height: 750,
    marginLeft: -14
  },
  taggedScoreMargin: {
    marginLeft:-26
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



class MyTags extends Component {

  constructor(props) {
    super(props);
    this.state = {
      myTagsList: []
    };
  }

  componentDidMount() {
    this.fetchTagged();
  }

  async fetchTagged() {
    const { loggedInUser } = this.props;
    try {
      payload.append('userId', parseInt(loggedInUser.User_ID))

      const response = await axios.post(`${baseUrl}MyTags.php`, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
      const allMyTag = response.data.Taggedlist;
      console.log(allMyTag,"111111111111111111111111")
      this.setState({
        myTagsList: allMyTag
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
                My fulfilled Tags
            </Typography>
            </center>
            </Toolbar> 
          </AppBar>
          <div style={{textAlign:"center"}}>
          <Box my={7} style={{marginBottom: -15}}>
            <Typography>
              List of My fulfilled Tags
            </Typography>
          </Box>
          <List>
            <Divider className={classes.divider} />
            {this.state.myTagsList.length ? <Box my={2}>

            {this.state.myTagsList.map((item) => (

                <ListItem
                    style={{width: 400}}
                >
                  <ListItemText>
                    <Box my={2} style={{ color: "gray", background: "ghostwhite" }}>
                    <Grid container spacing={5}>
                      
                    </Grid>
                   </Box>
                  </ListItemText>
                </ListItem>
            ))}
            </Box> : <Box my={2}>
            <Typography style={{marginTop: 257,fontSize: "larger"}}>Hey, looks like you haven't tagged any need yet <Link href="/landing" style={{ color: '#f05f40' }}>
                  <span>Click here</span>
                </Link> to get started</Typography>
            
            </Box>}
          </List>
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

export default withStyles(styles)(connect(mapStateToProps, undefined)(MyTags));

