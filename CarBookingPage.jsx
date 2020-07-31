import React, { Component, Fragment } from 'react';
import CarBookingComp from '../../../../CarComp/CarDetailComp/CarBookingComp/CarBookingComp';
import { Redirect, withRouter } from 'react-router';
import './CarBookingPage.css';
import moment from 'moment';
import { connect } from 'react-redux';
import { getMobilById } from '../../../../../redux/actions/mobil.actions';
import { postTransaksi } from '../../../../../redux/actions/transaksi.actions';


class CarBookingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            isLoading: false,
            errorMsg: {},
            formTransaction: {
                id_user: 0,
                tgl_order: '',
                total_pembayaran: 0,
                status_pembayaran: 0,
                status_transaksi: 0
            },
            formDetailTransaction: {
                id_mobil: 0,
                tgl_sewa: '',
                tgl_akhir_penyewaan: '',
            },
            date_start: moment().format('YYYY-MM-DD'),
            date_end: moment().format('YYYY-MM-DD'),
            rental_time: new Date()
        }
    }
    
    componentDidMount() {
        if(sessionStorage.getItem("login")){
            this.onGetCarById();
        } else {
            this.setState({
                redirect: true
            })
        }
    }

    onGetCarById = async () => {
        let id = this.props.match.params.carID;
        this.setState({
            isLoading: true
        });
        try {
            await this.props.dispatch(getMobilById(localStorage.getItem('api_token'), id));
        } catch (error) {
            console.log(error);
        }
        this.setState({
            isLoading: false,
        });
    }

    handleStartDateChange = (date) => {
        // const date_start_new = new Intl.DateTimeFormat('fr-CA', {year: 'numeric', month: '2-digit', day: '2-digit'}).format(date);
        this.setState({
            date_start: date
        })
    }

    handleEndDateChange = (date) => {
        // const date_end_new = new Intl.DateTimeFormat('fr-CA', {year: 'numeric', month: '2-digit', day: '2-digit'}).format(date);
        this.setState({
            date_end: date
        })
    }

    handleTimeChange = (time) => {
        // const rental_time_new = new Intl.DateTimeFormat('fr', {hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(time);
        this.setState({
            rental_time: time
        })
    }

    onSubmit = (data) => {
        // console.log(this.state);
        let harga_mobil = data.harga_mobil;
        const startDate = moment(this.state.date_start);
        const endDate = moment(this.state.date_end);
        const diff = endDate.diff(startDate);
        const diffDuration = moment.duration(diff);
        const formTransactionNew = {...this.state.formTransaction};
        const formDetailTransactionNew = {...this.state.formDetailTransaction};
        if(this.handleValidation()) {
        formTransactionNew['id_user'] = sessionStorage.getItem('id_user');
        formTransactionNew['tgl_order'] = moment().format('YYYY-MM-DD hh:mm:ss');
        formDetailTransactionNew['id_mobil'] = this.props.match.params.carID;
        formDetailTransactionNew['tgl_sewa'] = moment(this.state.date_start).format('YYYY-MM-DD') + ' ' + moment(this.state.rental_time).format('hh:mm:ss');
        formDetailTransactionNew['tgl_akhir_penyewaan'] = moment(this.state.date_end).format('YYYY-MM-DD') + ' ' + moment(this.state.rental_time).format('hh:mm:ss');
        formTransactionNew['total_pembayaran'] = harga_mobil * diffDuration.days();
        this.setState({
            formTransaction: formTransactionNew,
            formDetailTransaction: formDetailTransactionNew
        });
            // alert('success');
            console.log('Total Pembayaran:', harga_mobil * diffDuration.days());
            console.log(diffDuration);
            console.log(formDetailTransactionNew);
            console.log(formTransactionNew);
            console.log('Ini State Transaksi',this.state.formTransaction);
            console.log('Ini State Detail Transaksi', this.state.formDetailTransaction);
        }
    }

    handleValidation = () => {
        let errorMsg = {};
        let isValid = true;

        if(!this.state.date_start) {
            isValid = false;
            errorMsg['date_start'] = "Cannot be empty";
        }

        if(!this.state.date_end) {
            isValid = false;
            errorMsg['date_end'] = "Cannot be empty";
        }

        if(this.state.date_end.length > 0) {
            if(this.state.date_end === this.state.date_start) {
                isValid = false;
                errorMsg['date_end'] = "Cannot be same";
            }
        }

        if(!this.state.rental_time) {
            isValid = false;
            errorMsg['rental_time'] = "Cannot be empty";
        }

        this.setState({
            errorMsg: errorMsg
        });

        return isValid;
    }

    onPostTransaksi = async () => {
        try {
            await this.props.dispatch(postTransaksi(localStorage.getItem('api_token'), this.state.formTransaction));
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        if(this.state.redirect === true) {
            return <Redirect to={'/login'} />
        }
        const { mobil } = this.props;
        const mobilDetail = mobil.data_detail_mobil ? (
            mobil.data_detail_mobil.message.map((item, index) => {
                return (
                    <CarBookingComp key={index} data={item} date_start={this.state.date_start} date_end={this.state.date_end} rental_time={this.state.rental_time} handleSubmit={this.onSubmit}
                    startDateChange={this.handleStartDateChange} endDateChange={this.handleEndDateChange} timeChange={this.handleTimeChange} error={this.state.errorMsg} />
                ) 
            })
        ) : (
            // <SkeletonLoader />
            <Fragment></Fragment>
        )
        
        return (
            <Fragment>
                {this.state.isLoading ? (<Fragment></Fragment>) : (mobilDetail) }
            </Fragment>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        mobil: state.mobil
    }
}

export default withRouter(connect(mapStatetoProps)(CarBookingPage));
