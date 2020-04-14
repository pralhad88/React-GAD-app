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
import MapListButton from './mapListbutton'
import logo from '../assets/pralhad.jpg'
const baseUrl = process.env.API_URL;
const payload = new FormData();
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        marginTop: theme.spacing(6),
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
});
class ListOfDeed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listViewList: []
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
                listViewList: listViewRes
            })

        } catch (e) {
            console.log(e)
        }
    }
    
    onClick = () => {
        // go to deed details page using history.
    }
    
    render() {
        const { classes } = this.props;
        return (
            <div>
              <MapListButton />
                <Container component="main" maxWidth="xs" style={{ maxWidth: 690 }}>
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
                          {this.state.listViewList.map((item) => (
                            <ListItem>
                              <ListItemText>
                                <Box my={2} style={{ minWidth: 500, background: "#F8F8FF" }}>
                                  <Grid container xs={12} style={{ padding: 10 }} component="main" maxWidth="xs">
                                    <Grid item xs={6}>
                                      <img
                                        src={logo}
                                        style={{ height: 200, width: 215 }}
                                      />
                                    </Grid>
                                    <Grid item xs={6} container >
                                      <Grid item container xs={12} component="main" maxWidth="xs">
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
                                          Location: <span style={{ color: "#f05f40" }}>0.01 km(s) away</span>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12}>
                                        <Typography>
                                          Address: {item.Address}
                                        </Typography>
                                      </Grid>
                                      <Grid container item xs={12}>
                                        <Grid item xs={4}>
                                          <CheckCircleSharpIcon className={classes.listIcons} />{item.Endorse}
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
                                            onClick={this.onClick}
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
                                    No records found
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
    loggedInUser: state.auth.loggedInUser
});

export default withStyles(styles)(connect(mapStateToProps, undefined)(ListOfDeed));

