import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'font-awesome/css/font-awesome.css'
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import history from '../utils/history';
import logo from '../assets/pralhad.jpg';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from 'axios';
import DirectionsIcon from '@material-ui/icons/Directions';
import Moment from 'react-moment';
import AdjustIcon from '@material-ui/icons/Adjust';
import CommentIcon from '@material-ui/icons/Comment';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const baseUrl = process.env.API_URL;
const payload = new FormData();

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        marginTop: theme.spacing(9),
        display: 'flex',
        flexDirection: 'column',
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
        backgroundColor: "#eb7134",
        width: 102
    },
    textField: {
        width: 350,
    },
});


class SeeMore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            DeedDetailsList: [],
            comment: '',
            commentsList: []
        }
    }


    onChange = (event) => {
        this.setState({ comment: event.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const { comment } = this.state;
        const { loggedInUser } = this.props;


        try {
            payload.append('comment', comment)
            payload.append('deedId', parseInt('3115'))
            payload.append('userId', parseInt('644'))
            if (comment) {
                axios.post(`${baseUrl}post_comment.php`, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
                    .then((res) => {
                        if (res.data.status == 1) {
                            this.props.enqueueSnackbar('comment have been sent!', {
                                variant: 'success', anchorOrigin: {
                                    vertical: 'top',
                                    horizontal: 'center',
                                }
                            })

                        } else {
                            this.props.enqueueSnackbar('Something is wrong pleasse try again!', {
                                variant: 'error', anchorOrigin: {
                                    vertical: 'top',
                                    horizontal: 'center',
                                }
                            });
                        }
                    }
                    )
                    .then(data => {
                        this.setState({
                            comment: '',
                            commentsList: [...this.state.commentsList, {
                                comment: this.state.comment,
                                fName: this.state.DeedDetailsList.fName
                            }],
                        });
                    })

            } else {
                this.props.enqueueSnackbar('Please first write a comment!', {
                    variant: 'error', anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    }
                });
            }
        } catch (e) {
            console.log(e)
        }
    }

    componentDidMount() {
        this.fetchDeedDetails();
    }

    async fetchDeedDetails() {
        const { loggedInUser } = this.props;
        try {
            payload.append('deedId', parseInt('3115'))
            payload.append('userId', parseInt('644'))

            const response = await axios.post(`${baseUrl}deed_details.php`, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
            const DeedDetailsRes = response.data.deed_details[0];
            this.setState({
                DeedDetailsList: DeedDetailsRes,
                commentsList: DeedDetailsRes.comments,
            })
        } catch (e) {
            console.log(e)
        }
    }
    giftaDeedonClick = () => {
        history.push('/giftaDeed')
    }
    editDeedonClick = () => {
        history.push('/editDeed')
    }
    onClick = () => {
        history.push('/listOfdeed')
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar position="fixed" style={{ marginTop: 56, height: 40, backgroundColor: "rgb(235, 113, 52) " }}>
                    <center>
                        <Typography variant="h6">
                            Deed Details
                    </Typography>
                    </center>
                </AppBar>
                <Container component="main" maxWidth="xs" >
                    <div className={classes.paper}>
                        <Box my={2}>
                            <center>
                                <img
                                    src={logo}
                                    style={{ height: 150, width: 150 }}
                                />
                            </center>
                        </Box>

                        <Grid container component="main" maxWidth="xs" spacing={2}>
                            <Grid item xs={12} container>
                                <Grid item xs={4}>
                                    <AdjustIcon />
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography>
                                        {this.state.DeedDetailsList.tagName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>
                                        <Moment format="D MMM YYYY" withTitle>{this.state.DeedDetailsList.date}</Moment>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    {this.state.DeedDetailsList.tagName} Preferences for person / people: Umbrella for 1
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    Deed tagged by : {this.state.DeedDetailsList.fName}{this.state.DeedDetailsList.lName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} container>
                                <Grid item xs={6}>
                                    <Typography>
                                        Deed Location: {this.state.DeedDetailsList.address}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <DirectionsIcon style={{ color: "#f05f40", marginLeft: 80 }} />
                                    <Typography style={{ color: "#f05f40" }}>
                                        Get Directions 0.01 km(s) away
                                </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Story of need:"
                                    multiline
                                    rows="3"
                                    variant="outlined"
                                    style={{ marginBottom: 20 }}
                                    className={classes.textField}
                                    disabled inputProps={{ 'aria-label': 'description' }}
                                />
                            </Grid>
                            <Grid item xs={12} container>
                                <Grid item xs={4}>
                                    <Typography onClick={this.editDeedonClick}>
                                        <EditIcon className={classes.listIcons} />
                                    Edit
                                </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>
                                        <CheckCircleSharpIcon className={classes.listIcons} />
                                        {this.state.DeedDetailsList.endorse}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>
                                        <VisibilityIcon className={classes.listIcons} />
                                        {this.state.DeedDetailsList.views}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    Last endorsed on: 2020-04-14 10:41:30
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    COMMENT
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <form style={{ paddingTop: 0, padding: 0 }} onSubmit={this.onSubmit}>
                                <CommentIcon />
                                <input style={{ padding: 13, marginLeft: 28, width: 225 }} value={this.state.comment} onChange={this.onChange} />
                                    <button style={{ marginLeft: 23, background: "#eb7134", padding: 13, color: "white" }}>post</button>
                                </form>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    <QuestionAnswerIcon style={{ marginBottom: -5, marginRight: 9 }} />
                                    Comments
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12}>
                                {this.state.commentsList.length > 0 &&
                                <List>
                                    {this.state.commentsList.map((item, index) => (
                                        <ListItem>
                                            <ListItemText>
                                                <Typography key={index}>
                                                    <Typography style={{ color: "blue", background: "whitesmoke" }} >
                                                        {item.fName}
                                                    </Typography>
                                                    <hr></hr>
                                                    <Typography style={{background: "whitesmoke" }}>
                                                        {item.comment}
                                                    </Typography>
                                                </Typography>
                                            </ListItemText>
                                        </ListItem>
                                    ))}
                                </List> 
                                }
                            </Grid>

                            <Grid item xs={12} container style={{ marginLeft: 18, width: 150 }}>

                                <Grid item xs={6}>
                                    <Button
                                        type="submit"
                                        halfWidth
                                        variant="contained"
                                        justifyContent='center'
                                        color="primary"
                                        onClick={this.giftaDeedonClick}
                                        className={classes.submit}
                                    >
                                        Gift Now
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        type="submit"
                                        halfWidth
                                        variant="contained"
                                        justifyContent='center'
                                        color="primary"
                                        onClick={this.onClick}
                                        className={classes.submit}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                    </div>
                </Container>
            </div>
        );
    }
}

export default withSnackbar(withStyles(useStyles)(SeeMore)); 