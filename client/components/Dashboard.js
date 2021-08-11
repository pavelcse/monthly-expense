import React from 'react';
import Axios from 'axios';
import MonthlyExpense from './MonthlyExpense';

class Dashboard extends React.Component {
    state = {
        data: [],
        errors: {},
        baseUrl: 'http://localhost:4000',
        token: process.browser ? localStorage.getItem('token') : '',
    }

    componentDidMount() {
        
        Axios.defaults.headers.common['Authorization'] = this.state.token;
        Axios.get(this.state.baseUrl + '/api/expenses/list')
        .then(res => {
          this.setState({
            data: res.data.expenses,
          })
          
        })
        .catch(err => {
            console.log(err);
            this.setState({
                errors: err.response.data,
            })
        });
    }

    deleteExpense = (e) => {

        Axios.defaults.headers.common['Authorization'] = this.state.token;
        Axios.get(this.state.baseUrl + '/api/expenses/delete/'+ e)
        .then(res => {
            this.setState({
                data: this.state.data.filter(el => el._id !== e)
            })
          
        })
        .catch(err => {
            console.log(err);
            this.setState({
                errors: err.response ? err.response.data : '',
            })
        });
    }

    render() {
        let { data, errors, success, token } = this.state;
        return (
            <div className="card">
                <div className="card-body">
                { errors.message && 
                    <div className="alert alert-danger">{ errors.message }</div>
                }

                {
                    token 
                    ? 
                    <div className="row">
                        {
                            data.length == 0 ? 'No Data Available' : ''
                        }
                        {
                            data.map(d => (
                                <div key={d._id} className="col-md-4 mb-2">
                                    <MonthlyExpense deleteExpense={this.deleteExpense} data={d} />
                                </div>
                            ))
                        }
                        
                    </div>
                    :
                    <div className="alert alert-danger">Please Login First...</div>
                }
                </div>
            </div>
        )
    }
  }

export default Dashboard;