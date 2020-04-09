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
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const baseUrl = process.env.API_URL;
const payload = new FormData();

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    content: {
      maxWidth: 500
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    submit: {
        width: 250
    },
});

class Filters extends Component {

    constructor(props) {
        super(props);
        this.state = {
          value: 35,
          kmValue: 0
        };

        this.data = [
          { title: 'All', id: 1 },
          { title: 'Food', id: 2 },
          { title: 'Clothes', id: 3 },
          { title: 'Shelter', id: 4 },
          { title: 'Water', id: 5 },
          { title: 'Medical Emergency', id: 6 },
          { title: 'Books/Toys', id: 7 },
          { title: 'Live Update-Coronavirus', id: 8 },
          { title: 'Medical Supplies', id: 9 },
          { title: 'Live Update-Fire', id: 10 },
          { title: 'Live Update-Accident', id: 11 },
          { title: 'Groceries', id: 12 },
        ]
    }
    
    handleChange = selectedValue => {
        console.log(parseInt(selectedValue));

        this.setState({
            Country_ID: parseInt(selectedValue)
        });
    }
    sliderChange = (event, value) => {
      const valueinKM = Math.trunc(value/1000);
      this.setState({
        value: value,
        kmValue: valueinKM
      })
    }
    
    categoryHandleChange = (event, values) => {
      this.setState({

      })
    }
    
    handleClose = () => {
        const { dailogClose } = this.props;
        dailogClose()
    };
    render() {
        const { classes, dailogOpen } = this.props;
        const {value, kmValue } = this.state;
        return (
          <Fragment>
            <Dialog open={dailogOpen}>
              <DialogContent className= {classes.content}>
                <CssBaseline />
                <AppBar position='absolute'>
                  <Toolbar>
                    <ArrowBackIcon
                      onClick={this.handleClose}
                      style={{ color: 'white', cursor: 'pointer' }}
                      className={classes.menuButton}
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
                   <Typography id="non-linear-slider" gutterBottom style={{ marginTop: -40 }}>
                      Radius
                   </Typography>
                  </Box>
                  <Slider 
                    style={{ marginBottom: 5, marginTop: -10 }}
                    min={35}
                    step={50}
                    max={100000}
                    onChange={this.sliderChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="non-linear-slider"
                  />
                  <Box my={2}>
                  <Typography>
                    {this.state.value} Metres { kmValue > 0 ? `(${kmValue} kms)`: null }
                  </Typography>
                  </Box>
                  <Box my={2}>
                  <Autocomplete
                      id="disable-portal"
                      onChange={this.categoryHandleChange}
                      options={this.data}
                      getOptionLabel={option => option.title}
                      defaultValue={this.data[0]}
                      renderInput={params => <TextField {...params} label="Select Category" margin="normal" />}
                  />
                  </Box>
                  <Box my={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.handleClose}
                  >
                    Apply
                  </Button>
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

export default withStyles(styles)(connect(mapStateToProps, undefined)(Filters));