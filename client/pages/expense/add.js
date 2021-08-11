import React from 'react';
import Axios from 'axios';

const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                    ];

class AddExpense extends React.Component {
    state = {
        total_income: '',
        month_name: monthNames[new Date().getMonth()] + ' - ' + new Date().getFullYear(),
        expenses: [],
        data: [],
        errors: {},
        success: '',
        baseUrl: 'http://localhost:4000',
        token: process.browser ? localStorage.getItem('token') : '',
    }

    componentDidMount() {
        
        Axios.get(this.state.baseUrl + '/api/items/list')
        .then(res => {
          this.setState({
            data: res.data.items,
          })
          
        })
        .catch(err => {
            console.log(err);
            this.setState({
                errors: err.response.data,
            })
        });
    }


    addIExpense = event => {
        event.preventDefault();

        let { total_income, month_name, expenses} = this.state;
        let masterData = {};
        masterData.totalIncome = total_income;
        masterData.monthName = month_name;
        masterData.expenses = [];
        let totalExp = 0;
        expenses.map(exp => {
            let item = exp.split('-');
            let data = {
                expItem:  item[0],
                expCost:  item[1]
            }
            totalExp = parseInt(totalExp) + parseInt(item[1]);
            masterData.expenses.push(data);
            masterData.totalExp = totalExp;
        })

        masterData.inBalance = parseInt(total_income) - parseInt(totalExp);


        Axios.defaults.headers.common['Authorization'] = this.state.token;

        Axios.post(this.state.baseUrl + '/api/expenses/add', masterData)
        .then(res => {
          this.setState({
            total_income: '',
            month_name: monthNames[new Date().getMonth()] + ' - ' + new Date().getFullYear(),
            expenses: [],
            success: res.data.message
          })
          document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
          
        })
        .catch(err => {
            console.log(err);
            this.setState({
                total_income: '',
                month_name: monthNames[new Date().getMonth()] + ' - ' + new Date().getFullYear(),
                expenses: [],
                errors: err.response.data,
            })
        });
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    changeCheckboxHandler = (e) => {
        if (this.state.expenses.some(item => item == e)) {
            this.setState({
                expenses: this.state.expenses.filter(el => el !== e)
            })
          } else {
            this.setState({
                expenses: [...this.state.expenses, e],
            })
          }
    }

    render() {
        let { total_income, month_name, errors, success, data } = this.state;

        const currentYear = new Date().getFullYear();
    
        return (
            <div>
                <div className="card">
                     <div className="card-header">Expense Items</div>
                     <div className="card-body">
                        { success && 
                            <div className="alert alert-success">{ success }</div>
                        }
                        { errors.message && 
                            <div className="alert alert-danger">{ errors.message }</div>
                        }

                         <div className="row">
                             <div className="col-md-12">
                                 <form onSubmit={ this.addIExpense }>
                                    <div className="form-group">
                                        <label htmlFor="total_income">Total Income: </label>
                                        <input onChange={ this.changeHandler } type="number" className={errors.total_income ? 'form-control is-invalid mb-2' : 'form-control mb-2'} name="total_income" value={total_income} />
                                        <div className="invalid-feedback">{ errors.total_income }</div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="month_name">Month Name: </label>
                                        <select onChange={ this.changeHandler } value={month_name} className={errors.month_name ? 'form-control is-invalid mb-2' : 'form-control mb-2'} id="month_name" name="month_name">
                                            {monthNames.map((month, i) => (
                                                <option key={i} value={month + ' - ' + currentYear}>{month + ' - ' + currentYear}</option>
                                            ))}
                                        </select>
                                        
                                        <div className="invalid-feedback">{ errors.month_name }</div>
                                    </div>
                                    {
                                        data.map((item, i) => (
                                            <div key={item._id} className="form-group">
                                                <label>
                                                    <input onChange={ () => this.changeCheckboxHandler(item.item_name+'-'+item.item_cost) } type="checkbox" value={item.item_name+'-'+item.item_cost} /> {item.item_name} - {item.item_cost}
                                                </label>
                                                
                                            </div>
                                            ))
                                        }
                                    <div className="form-group">
                                        <input type="submit" className="form-control btn btn-sm btn-success mt-3" name="submit_item" value="Add Item" />
                                    </div>
                                 </form>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
        )
    }
}

export default AddExpense;