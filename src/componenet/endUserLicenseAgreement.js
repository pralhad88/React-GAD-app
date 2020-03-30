import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';

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
});

class EndUserLicenseAgreement extends Component {
    handleClose = () => {
        const { dailogClose } = this.props;
        dailogClose()
    };
    render() {
        const { classes, dailogOpen } = this.props;

        return (
            <Fragment>
                <Dialog open={dailogOpen}>
                    <DialogContent className={classes.root}>
                        <CssBaseline />
                        <AppBar position='absolute'>
                            <Toolbar>
                                <ArrowBackIcon
                                    onClick={this.handleClose}
                                    style={{ color: 'white', cursor: 'pointer' }}
                                    className={classes.menuButton}
                                />
                                <Typography variant="h6" className={classes.title}>
                                    End-User License Agreement
              </Typography>
                            </Toolbar>
                        </AppBar>
                        <Box my={7}>
                            <Typography style={{ textAlign: 'center' }} component="h1" variant="h6">
                                End-User License Agreement ("Agreement")
              </Typography>
                            <hr></hr>
                        </Box>
                        <Box my={2}>
                            <p>Last updated: August 06, 2017</p>
                            <p>Please read this End-User License Agreement ("Agreement") carefully before clicking the "I Agree" button, downloading or using Navision Limited ("Application").</p>
                            <p>By clicking the "I Agree" button, downloading or using the Application, you are agreeing to be bound by the terms and conditions of this Agreement.</p>
                            <p>This Agreement is a legal agreement between you (either an individual or a single entity) and Navision Limited and it governs your use of the Application made available to you by Navision Limited.</p>
                            <p>If you do not agree to the terms of this Agreement, do not click on the "I Agree" button and do not download or use the Application.</p>
                            <p>The Application is licensed, not sold, to you by Navision limited for use strictly in accordance with the terms of this Agreement. This EULA is licensed by TermsFeed Generator to Navision Limited.</p>
                        </Box>
                        <Box my={2}>
                            <Typography variant="h6">License</Typography>
                            <p>Navision Limited grants you a revocable, non-exclusive, non-transferable, limited license to download, install and use the Application solely for your personal, non-commercial purposes strictly in accordance with the terms of this Agreement.</p>
                        </Box>

                        <Box my={2}>
                            <Typography variant="h6">Third-Party Services</Typography>
                            <p>The Application may display, include or make available third-party content (including data, information, applications and other products services) or provide links to third-party websites or services ("Third-Party Services").</p>
                            <p>You acknowledge and agree that Navision Limited shall not be responsible for any Third-Party Services, including their accuracy, completeness, timeliness, validity, copyright compliance, legality, decency, quality or any other aspect thereof Navision Limited does not assume and shall not have any liability or responsibility to you or any other person or entity for any Third-Party Services.</p>
                            <p>Third-Party Services and links thereto are provided solely as a convenience to you and you access and use them entirely at your own risk and subject to such third parties' terms and conditions.</p>
                        </Box>
                        <Box my={2}>
                            <Typography variant="h6">Term and Termination</Typography>
                            <p>This Agreement shall remain in effect until terminated by you or Navision Limited.</p>
                            <p>Navision Limited may, in its sole discretion, at any time and for any or no reason, suspend or terminate this Agreement with or without prior notice.</p>
                            <p>This Agreement will terminate immediately, without prior notice from Navision Limited, in the event that you fail to comply with any provision of this Agreement. You may also terminate this Agreement by deleting the Application and all copies thereof from your mobile device or from your compute</p>
                            <p>Upon termination of this Agreement, you shall cease all use of the Application and delete all copies of the Application from your mobile device or from your computer.</p>
                            <p>Termination of this Agreement will not limit any of Navision Limited’s rights or remedies at law or in equity in case of breach by you (during the term of this Agreement) of any of your obligations under the present Agreement.</p>
                        </Box>
                        <Box my={2}>
                            <Typography variant="h6">Amendments to this Agreement</Typography>
                            <p>Navision Limited reserves the right, at its sole discretion, to modify or replace this Agreement at any time. If a revision is material we will provide at least 60 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
                            <p>By continuing to access or use our Application after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Application.</p>
                        </Box>
                        <Box my={2}>
                            <Typography variant="h6">Governing Law</Typography>
                            <p>The laws of Hong Kong, India, U.K., U.S.A., Singapore excluding its conflicts of law rules, shall govern this Agreement and your use of the Application. Your use of the Application may also be subject to other local, state, national, or international laws.</p>
                        </Box>
                        <Box my={2}>
                            <Typography variant="h6">Contact Information</Typography>
                            <p>If you have any questions about this Agreement, please contact us.</p>
                        </Box>
                        <Box my={2}>
                            <Typography variant="h6">Entire Agreement</Typography>
                            <p>The Agreement constitutes the entire agreement between you and Navision Limited regarding your use of the Application and supersedes all prior and contemporaneous written or oral agreements between you and Navision Limited.</p>
                            <p>You may be subject to additional terms and conditions that apply when you use or purchase other Navision Limited's services, which Navision Limited will provide to you at the time of such use or purchase.</p>
                        </Box>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}
export default withStyles(styles)(EndUserLicenseAgreement);