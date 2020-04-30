import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import picture from "../assets/logo.png";
import { Grid } from '@material-ui/core/';
import AboutApp from './aboutApp';
import AdvisoryBoard from './advisoryBoard';
import TermsAndConditions from '../screens/Register/TermAndConditions';
import PrivacyAndPolicy from '../screens/Register/PrivacyAndPolicy';
import EndUserLicenseAgreement from './endUserLicenseAgreement';
import CookiesPolicy from './cookiespolicy';
import Disclaimer from './disclaimer';
import MyTags from './myTags';
import MyFulfilledTags from './myFulfilledTags';
import TagCounters from './tagCounter';
import TopTenTaggers from './topTenTaggers';
import TopTenTagFulfillers from './topTenTagFullfiller';

const useStyles = (theme => ({
    root: {
        maxWidth: 250,
        height: 250
    },
    media: {
        height: 150,
        width: 150,
        marginLeft: 45
    },
    paper: {
        marginTop: theme.spacing(7),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    root1: {
        flexGrow: 1,
        // padding: theme.spacing(2),
        marginTop: theme.spacing(8)
    },
    title: {
        flexGrow: 1,
    },
}));

class Dashaboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aboutDailogOpen: false,
            privacyDailogOpen: false,
            termsDailogOpen: false,
            advisoryDailogOpen: false,
            cookiesDailogOpen: false,
            endUserDailogOpen: false,
            disclaimerDailogOpen: false,
            myTagDailogOpen: false,
            MyFulfilledTagsDailogOpen: false,
            TagCountersDailogOpen: false,
            TopTenTaggersDailogOpen: false,
            TopTenTagFulfillersDailogOpen: false,

        }

    }

    handleClose = () => {
        this.setState({
            aboutDailogOpen: false,
            privacyDailogOpen: false,
            termsDailogOpen: false,
            advisoryDailogOpen: false,
            cookiesDailogOpen: false,
            endUserDailogOpen: false,
            disclaimerDailogOpen: false,
            myTagDailogOpen: false,
            MyFulfilledTagsDailogOpen: false,
            TagCountersDailogOpen: false,
            TopTenTaggersDailogOpen: false,
            TopTenTagFulfillersDailogOpen: false,
        })
    };

    myTag = () => {
        this.setState({
            myTagDailogOpen: true
        })
    }
    MyFulfilledTag = () => {
        this.setState({
            MyFulfilledTagsDailogOpen: true
        })
    }
    TopTenTagger = () => {
        this.setState({
            TopTenTaggersDailogOpen: true,
        })
    }
    TopTenTagFulfiller = () => {
        this.setState({
            TopTenTagFulfillersDailogOpen: true
        })
    }
    TagCounter = () => {
        this.setState({
            TagCountersDailogOpen: true
        })
    }
    endUserAgreement = () => {
        this.setState({
            endUserDailogOpen: true
        });
    }

    disclaimer = () => {
        this.setState({
            disclaimerDailogOpen: true
        });
    }

    cookies = () => {
        this.setState({
            cookiesDailogOpen: true
        });
    }
    aboutApp = () => {
        this.setState({
            aboutDailogOpen: true
        })
    }

    privacyAndPolicyOpen = () => {
        this.setState({
            privacyDailogOpen: true
        })
    }

    termsAndConditionsOpen = () => {
        this.setState({
            termsDailogOpen: true
        })
    }
    advisoryBoard = () => {
        this.setState({
            advisoryDailogOpen: true,
        })
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.paper}>
                <AppBar position="fixed" style={{ marginTop: 56, height: 40, background: 'rgb(235, 113, 52)', borderRadius: '.25em .25em .4em .4em' }}>
                    <center>
                        <Typography variant="h6" >
                            Dashaboard
                        </Typography>
                    </center>
                </AppBar>
                <Container>
                    <div className={classes.root1}>
                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start"
                        >
                            {/* <Grid item xs={12} sm={6} md={3} >
                                <Card className={classes.root}>
                                    <CardActionArea onClick={this.myTag}>
                                        <CardMedia
                                            className={classes.media}
                                            image={picture}
                                            title="Contemplative Reptile"
                                        />
                                        <center>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {"MY TAGS"}
                                                </Typography>
                                            </CardContent>
                                        </center>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} >
                                <Card className={classes.root}>
                                    <CardActionArea onClick={this.MyFulfilledTag}>
                                        <CardMedia
                                            className={classes.media}
                                            image={picture}
                                            title="Contemplative Reptile"
                                        />
                                        <center>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {"My Fulfilled Tags"}
                                                </Typography>
                                            </CardContent>
                                        </center>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} >
                                <Card className={classes.root}>
                                    <CardActionArea onClick={this.TopTenTagger}>
                                        <CardMedia
                                            className={classes.media}
                                            image={picture}
                                            title="Contemplative Reptile"
                                        />
                                        <center>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {"Top 10 Taggers"}
                                                </Typography>
                                            </CardContent>
                                        </center>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} >
                                <Card className={classes.root}>
                                    <CardActionArea onClick={this.TopTenTagFulfiller}>
                                        <CardMedia
                                            className={classes.media}
                                            image={picture}
                                            title="Contemplative Reptile"
                                        />
                                        <center>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {"Top 10 Tag Fulfillers"}
                                                </Typography>
                                            </CardContent>
                                        </center>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} >
                                <Card className={classes.root}>
                                    <CardActionArea onClick={this.TagCounter}>
                                        <CardMedia
                                            className={classes.media}
                                            image={picture}
                                            title="Contemplative Reptile"
                                        />
                                        <center>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {"Tag Counter"}
                                                </Typography>
                                            </CardContent>
                                        </center>
                                    </CardActionArea>
                                </Card>
                            </Grid> */}
                            <Grid item xs={12} sm={6} md={3} >
                                <Card className={classes.root}>
                                    <CardActionArea onClick={this.aboutApp}>
                                        <CardMedia
                                            className={classes.media}
                                            image={picture}
                                            title="Contemplative Reptile"
                                        />
                                        <center>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {"ABOUT APP"}
                                                </Typography>
                                            </CardContent>
                                        </center>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} >
                                <Card className={classes.root}>
                                    <CardActionArea onClick={this.termsAndConditionsOpen}>
                                        <CardMedia
                                            className={classes.media}
                                            image={picture}
                                            title="Contemplative Reptile"
                                        />
                                        <center>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {"TERM AND CONDITION"}
                                                </Typography>
                                            </CardContent>
                                        </center>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} >
                                <Card className={classes.root}>
                                    <CardActionArea onClick={this.privacyAndPolicyOpen}>
                                        <CardMedia
                                            className={classes.media}
                                            image={picture}
                                            title="Contemplative Reptile"
                                        />
                                        <center>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {"PRIVACY AND POLICY"}
                                                </Typography>
                                            </CardContent>
                                        </center>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card className={classes.root}>
                                    <CardActionArea onClick={this.advisoryBoard}>
                                        <CardMedia
                                            className={classes.media}
                                            image={picture}
                                            title="Contemplative Reptile"
                                        />
                                        <center>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {"ADVISORY BOARD"}
                                                </Typography>
                                            </CardContent>
                                        </center>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card className={classes.root}>
                                    <CardActionArea onClick={this.cookies}>
                                        <CardMedia
                                            className={classes.media}
                                            image={picture}
                                            title="Contemplative Reptile"
                                        />
                                        <center>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {"COOKIES POLICY"}
                                                </Typography>
                                            </CardContent>
                                        </center>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card className={classes.root}>
                                    <CardActionArea onClick={this.endUserAgreement}>
                                        <CardMedia
                                            className={classes.media}
                                            image={picture}
                                            title="Contemplative Reptile"
                                        />
                                        <center>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {"END-USER AGREEMENT"}
                                                </Typography>
                                            </CardContent>
                                        </center>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card className={classes.root}>
                                    <CardActionArea onClick={this.disclaimer}>
                                        <CardMedia
                                            className={classes.media}
                                            image={picture}
                                            title="Contemplative Reptile"
                                        />
                                        <center>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {"DISCLAIMER"}
                                                </Typography>
                                            </CardContent>
                                        </center>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                    <TermsAndConditions
                        dailogOpen={this.state.termsDailogOpen}
                        dailogClose={this.handleClose}
                    />
                    <PrivacyAndPolicy
                        dailogOpen={this.state.privacyDailogOpen}
                        dailogClose={this.handleClose}
                    />
                    <AdvisoryBoard
                        dailogOpen={this.state.advisoryDailogOpen}
                        dailogClose={this.handleClose}
                    />
                    <AboutApp
                        dailogOpen={this.state.aboutDailogOpen}
                        dailogClose={this.handleClose}
                    />
                    <Disclaimer
                        dailogOpen={this.state.disclaimerDailogOpen}
                        dailogClose={this.handleClose}
                    />
                    <EndUserLicenseAgreement
                        dailogOpen={this.state.endUserDailogOpen}
                        dailogClose={this.handleClose}
                    />
                    <CookiesPolicy
                        dailogOpen={this.state.cookiesDailogOpen}
                        dailogClose={this.handleClose}
                    />
                    <MyTags
                        dailogOpen={this.state.myTagDailogOpen}
                        dailogClose={this.handleClose}
                    />
                    <MyFulfilledTags
                        dailogOpen={this.state.MyFulfilledTagsDailogOpen}
                        dailogClose={this.handleClose}
                    />
                    <TopTenTaggers
                        dailogOpen={this.state.TopTenTaggersDailogOpen}
                        dailogClose={this.handleClose}
                    />
                    <TopTenTagFulfillers
                        dailogOpen={this.state.TopTenTagFulfillersDailogOpen}
                        dailogClose={this.handleClose}
                    />
                    <TagCounters
                        dailogOpen={this.state.TagCountersDailogOpen}
                        dailogClose={this.handleClose}
                    />
                </Container>
            </div>
        );
    }
}

export default withStyles(useStyles)(Dashaboard);