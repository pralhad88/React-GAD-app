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
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

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
  numbering:{
    marginLeft: 9,
    backgroundColor:"white",
    padding: theme.spacing(1),
    borderRadius: 13,
    },
  nameText:{
    marginLeft: -60,
    padding: theme.spacing(1),
    textAlign: 'center',
  },
  button100:{
    marginRight: 9,
    backgroundColor:"#f05f40",
    paddingRight: 9,
    paddingLeft: 9,
    textAlign: 'center',
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


class TopTenTaggers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topTenTaggedlist: []
    };
  }

  componentDidMount() {
    this.fetchTopTenTaggers();
  }

  async fetchTopTenTaggers() {
    const { loggedInUser } = this.props;
    try {
      payload.append('userId', parseInt(loggedInUser.User_ID))

      const response = await axios.post(`${baseUrl}top_taggers.php`, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
      const allTopTenTaggers = response.data.RESULT;
      // console.log(allTopTenTaggers,"RESULT111111111111111111111111sssssssssssss")
      this.setState({
        topTenTaggedlist: allTopTenTaggers
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
                  Top 10 Taggers
              </Typography>
              </center>
              </Toolbar>
            </AppBar>
            <div style={{textAlign:"center"}}>
            <Box my={7} style={{marginBottom: -15}}>
              <Typography>
                List of top 10 taggers in your city
              </Typography>
            </Box>
            <List>
              <Divider className={classes.divider} />
              {this.state.topTenTaggedlist.length ? <Box my={2}>

              {this.state.topTenTaggedlist.map((item, index) => (

                  <ListItem
                      style={{width: 400}}
                  >
                    <ListItemText>
                      <Box my={2} style={{ color: "gray", background: "ghostwhite" }}>
                      <Grid container spacing={3}>
                        <Grid item xs={3}>
                          <span className={classes.numbering}>{index+1}</span>
                        </Grid>
                        <Grid item xs={3}>
              <span className={classes.nameText}>{item.First_Name}{item.Last_Name}</span>
                        </Grid>
                        <Grid item xs={3}>
                          <span className={classes.taggedScoreMargin}>Tagged Score</span>
                        </Grid>
                        <Grid item xs={3}>
                          <span className={classes.button100}>{item.Total_Credit_Point}</span>
                        </Grid>
                      </Grid>
                     </Box>
                    </ListItemText>
                  </ListItem>
              ))}
              </Box> : <Box my={2}>
              <Typography style={{color:"#0000FF",marginTop: 257,fontSize: "x-large"}}>
                No records found
              </Typography>
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

export default withStyles(styles)(connect(mapStateToProps, undefined)(TopTenTaggers));

