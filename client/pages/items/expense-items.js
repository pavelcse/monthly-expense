import React from 'react';
import Axios from 'axios';

class ExpenseItems extends React.Component {
    state = {
        item_name: '',
        item_cost: '',
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


    addItems = event => {
        event.preventDefault();

        let { item_name, item_cost } = this.state;

        Axios.post(this.state.baseUrl + '/api/items/add', {item_name, item_cost})
        .then(res => {
          this.setState({
            item_name: '',
            item_cost: '',
            data: this.state.data.concat(res.data.item),
            success: res.data.message
          })
          
        })
        .catch(err => {
            console.log(err);
            this.setState({
                item_name: '',
                item_cost: '',
                errors: err.response.data,
            })
        });
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    deleteItem = (id) => {
        Axios.get(this.state.baseUrl + '/api/items/delete/'+ id)
        .then(res => {
            console.log(res.data);
            this.setState({
                data: this.state.data.filter(el => el._id !== id)
            })
        })
        .catch(err => {
            console.log(err);
            this.setState({
                errors: err.response.data,
            })
        });
    }

    render() {
        let { item_name, item_cost, errors, success, data } = this.state;

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
                             <div className="col-md-6 table-responsive">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Item</th>
                                            <th>Cost</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        data.map((item, i) => (
                                            <tr key={item._id}>
                                                <td>{ i + 1 }</td>
                                                <td>{ item.item_name }</td>
                                                <td>{ item.item_cost } tk</td>
                                                <td><button key={i} onClick={ () => this.deleteItem(item._id) } type="button" className="btn btn-danger btn-sm">Delete</button></td>
                                            </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                             </div>
                             <div className="col-md-6">
                                 <form onSubmit={ this.addItems }>
                                    <div className="form-group">
                                        <label htmlFor="item_name">Item Name: </label>
                                        <input onChange={ this.changeHandler } type="" className={errors.item_name ? 'form-control is-invalid' : 'form-control'} id="item_name" name="item_name" value={item_name} />
                                        <div className="invalid-feedback">{ errors.item_name }</div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="item_cost">Item Cost: </label>
                                        <input onChange={ this.changeHandler } type="" className={errors.item_cost ? 'form-control is-invalid' : 'form-control'} id="item_cost" name="item_cost" value={item_cost} />
                                        <div className="invalid-feedback">{ errors.item_cost }</div>
                                    </div>
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

export default ExpenseItems;