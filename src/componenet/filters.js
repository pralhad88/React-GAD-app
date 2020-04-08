import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Dialog from '@material-ui/core/Dialog';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import SelectCategory from '../componenet/selectCategory';

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
        width: 250,
        marginTop: 200,

    },

});

class Filters extends Component {

    constructor(props) {
        super(props);
        this.state = {
         
        };
    }
    
    handleChange = selectedValue => {
        console.log(parseInt(selectedValue));

        this.setState({
            Country_ID: parseInt(selectedValue)
        });
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
              <DialogContent >
                <CssBaseline />
                <AppBar position='absolute'>
                  <Toolbar>
                    <ArrowBackIcon
                      onClick={this.handleClose}
                      style={{ color: 'white', cursor: 'pointer' }}
                    />
                    <Typography variant="h6" >
                      Filters
                    </Typography>
                  </Toolbar>
                </AppBar>
                <div style={{ color: "gray" }}>
                  <Box my={7}>
                    <Typography variant="h6" style={{ fontSize: 22 }}>
                        Apply Filters
                    </Typography>
                  </Box>
                  <Box my={4}>
                   <Typography id="non-linear-slider" gutterBottom style={{ marginTop: -46 }}>
                      Radius
                   </Typography>
                  </Box>
                  <Slider 
                    style={{ marginBottom: 86 }}
                    // value={value}
                    min={0}
                    step={0.1}
                    max={6}
                    scale={(x) => x ** 10}
                    // getAriaValueText={valueLabelFormat}
                    // valueLabelFormat={valueLabelFormat}
                    // onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="non-linear-slider"
                  />
                  <SelectCategory country_Id={this.handleChange} />
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.handleClose}
                  >
                    Apply
                  </Button>
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

export default withStyles(styles)(connect(mapStateToProps, undefined)(Filters));