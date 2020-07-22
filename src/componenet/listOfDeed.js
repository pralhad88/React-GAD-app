import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import Box from '@material-ui/core/Box';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { connect } from 'react-redux';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { Button, Container } from '@material-ui/core';
import MapListButton from './mapListbutton';
import logo from '../assets/pralhad.jpg';
import history from '../utils/history';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Spinner from 'react-spinner-material';
import { getDistance } from 'geolib';

const baseUrl = process.env.API_URL;
const payload = new FormData();
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(11),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  listIcons: {
    color: "#f05f40",
    marginBottom: -5,
    marginRight: 5
  },
  title: {
    flexGrow: 1,
  },
  divider: {
    marginTop: theme.spacing(1),
    backgroundColor: 'white'
  },
  submit: {
    marginLeft: -25,
    backgroundColor: "#eb7134",
    width: 102
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    maxWidth: 250,
  },
});
class ListOfDeed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listViewList: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchlistView();
  }

  async fetchlistView() {
    const { loggedInUser } = this.props;
    try {
      payload.append('user_id', parseInt(loggedInUser.User_ID))

      const response = await axios.post(`${baseUrl}deed_list.php`, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
      const listViewRes = response.data.deed_list;
      this.setState({
        listViewList: listViewRes,
        loading: false,
      })

    } catch (e) {
      console.log(e)
    }
  }

  onClick = () => {
    history.push('/seeMore')
  }

  getDistanceFromCureentLocation = (deedGeoPoints) => {
    const { geoPoints } = this.props;
    const latLog = deedGeoPoints.split(',')
    const distance = getDistance({
      latitude: geoPoints.lat,
      longitude: geoPoints.lng
    },
      {
        latitude: latLog[0],
        longitude: latLog[1]
      }
    )
    return <span style={{ color: "#f05f40" }}>{distance/1000} Km(s) away</span>
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //       console.log(position.coords)
    //       console.log(
    //           'You are ',
    //             getDistance({latitude: position.coords.latitude, longitude: position.coords.longitude }, {
    //               latitude: latLog[0],
    //               longitude: latLog[1],
    //           }),
    //           'meters away from 51.525, 7.4575'
    //       );
    //       return <p>Pralhad</p>
    //   },
    //   () => {
    //       alert('Position could not be determined.');
    //   }
    // );
  }

  render() {
    const { classes, history } = this.props;
    return (
      <div>
        <MapListButton />
        <Dialog
          open={this.state.loading}
        >
          <DialogContent className={classes.container}>
            <Spinner size={35} spinnercolor={"green"} spinnerwidth={5} visible={this.state.loading} />
          </DialogContent>
        </Dialog>
        <Container component="main" style={{ maxWidth: 690 }}>
          <div className={classes.paper}>
            <div style={{ textAlign: "center" }}>
              <List>
                <Divider className={classes.divider} />
                {this.state.listViewList.length ? <Box my={2}>
                  <Box my={3}>
                    <Typography><span style={{ color: "#f05f40", marginRight: 5 }}>{this.state.listViewList.length}</span>
                      Deed found near you
                    </Typography>
                    <hr></hr>
                  </Box>
                  {this.state.listViewList.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText>
                        <Box my={2} style={{ minWidth: 500, background: "#F8F8FF" }}>
                          <Grid container item xs={12} style={{ padding: 10 }} component="main" maxWidth="xs">
                            <Grid item xs={6}>
                              <img
                                src={logo}
                                style={{ height: 200, width: 215 }}
                              />
                            </Grid>
                            <Grid item xs={6} container >
                              <Grid item container item xs={12} component="main" maxWidth="xs">
                                <Grid item xs={6}>
                                  <Typography>
                                    {item.Tagged_Title}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography>
                                    <Moment format="D MMM YYYY" withTitle>{item.Tagged_Datetime}</Moment>
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography>
                                Location: {this.getDistanceFromCureentLocation(item.Geopoint)}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography>
                                  Address: {item.Address}
                                </Typography>
                              </Grid>
                              <Grid container item xs={12}>
                                <Grid item xs={4}>
                                  <Typography><CheckCircleSharpIcon className={classes.listIcons} />{item.Endorse}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography><VisibilityIcon className={classes.listIcons} />{item.Views}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={() => {
                                      history.push('/seeMore', item.Tagged_ID)
                                    }}
                                  >
                                    See More
                                          </Button>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </ListItemText>
                    </ListItem>
                  ))}
                </Box> : <Box my={2}>
                    <Typography style={{ color: "#0000FF", marginTop: 100, marginBottom: 250, fontSize: "x-large" }}>
                      No needy people around you
                    </Typography>
                  </Box>}
              </List>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  loggedInUser: state.auth.loggedInUser,
  geoPoints: state.auth.geoPoints
});

export default withStyles(styles)(connect(mapStateToProps, undefined)(ListOfDeed));

