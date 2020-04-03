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
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import Link from '@material-ui/core/Link';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import { theme } from '../../theme/theme';

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
    submit: {
        margin: theme.spacing(1.5, 0, 1),

        width: 300
      },
});



class Filters extends Component {

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
            console.log(allMyTag, "111111111111111111111111")
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
                                        Filters
            </Typography>
                                </center>
                            </Toolbar>
                        </AppBar>
                        <Box my={7} style={{ marginBottom: -15 }}>
                            <Typography>
                                Apply Filters
            </Typography>
                        </Box>

                        <Autocomplete
                            id="disable-portal"
                            disablePortal
                            renderInput={params => <TextField {...params} label="Select Category" margin="normal" />}
                        />

                        <Button
                            type="submit"
                            halfWidth
                            variant="contained"
                            justifyContent='center'
                            color="primary"
                            className={classes.submit}>
                            Apply
              </Button>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    loggedInUser: state.auth.loggedInUser
});

export default withStyles(styles)(connect(mapStateToProps, undefined)(Filters));

