import 'date-fns';
import React, { Fragment, Component } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Grid, Button, TextField, FormHelperText } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import './CarBookingComp.css';

class CarBookingComp extends Component {
    constructor(props) {
        super(props);
        this.state={
            selectedStartDate: new Date(),
            selectedEndDate: new Date(),
            selectedTime: new Date()
        }
    }

    handleStartDateChange = (date) => {
        this.setState({
            selectedStartDate: date
        })
    }

    handleEndDateChange = (date) => {
        this.setState({
            selectedEndDate: date
        })
    }
    
    handleTimeChange = (time) => {
        this.setState({
            selectedTime: time
        })
    }

    render(){

    // const dateNow = new Date(Date.now());

        return (
            <Fragment>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <IconButton color="inherit" onClick={() => window.history.back()}>
                            <ArrowBackIos />
                        </IconButton>
                        <Typography variant="h6" style={{flexGrow: 1}}>
                            Booking 
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="booking">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="center">
                            <Grid item>
                            {/* <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date picker dialog"
                                format="MM/dd/yyyy"
                                minDate={Date(Date.now())}
                                value={this.state.selectedStartDate}
                                onChange={this.handleStartDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                /> */}
                                <KeyboardDatePicker
                                error={this.props.error['date_start'] ? true : false}
                                margin="normal"
                                label="Pickup Date"
                                format="yyyy/MM/dd"
                                name="date_start"
                                minDate={Date(Date.now())}
                                value={this.props.date_start}
                                onChange={this.props.startDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                                {this.props.error['date_start'] ? <FormHelperText error id="name-helper-text">{this.props.error['date_start']}</FormHelperText> : '' }
                            </Grid>
                            <Grid item>
                                <KeyboardDatePicker
                                error={this.props.error['date_end'] ? true : false}
                                margin="normal"
                                label="Rental End Date"
                                format="yyyy/MM/dd"
                                name="date_end"
                                minDate={Date(Date.now())}
                                value={this.props.date_end}
                                onChange={this.props.endDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                                {this.props.error['date_end'] ? <FormHelperText error id="name-helper-text">{this.props.error['date_end']}</FormHelperText> : '' }
                            </Grid>
                            <Grid>
                                <KeyboardTimePicker
                                error={this.props.error['rental_time'] ? true : false}
                                margin="normal"
                                label="Rental Time"
                                name="rental_time"
                                value={this.props.rental_time}
                                format="hh:mm"
                                onChange={this.props.timeChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                />
                                {this.props.error['rental_time'] ? <FormHelperText error id="name-helper-text">{this.props.error['rental_time']}</FormHelperText> : '' }
                            </Grid>
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <div style={{display: 'flex', flex: '1'}}>
                        <Button variant="contained" onClick={() => this.props.handleSubmit(this.props.data)} size="medium" style={{backgroundColor: '#FF5E1F', color: '#fff', textTransform: 'capitalize', margin: '0 60px'}}>Continue</Button>
                    </div>
                </div>
            
            </Fragment>
        )
    }
}

export default CarBookingComp;
