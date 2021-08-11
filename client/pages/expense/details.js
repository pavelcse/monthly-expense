import React from 'react';
import Axios from 'axios';
import Link from 'next/link';


class ExpenseDetails extends React.Component {

    state = {
        data: [],
        baseUrl: 'http://localhost:4000',
        token: process.browser ? localStorage.getItem('token') : '', 
        errors: []
    }

    componentDidMount () {
        let expenseId = '';
        if (typeof window !== "undefined") {
            const queryParams = new URLSearchParams(window.location.search);
            expenseId = queryParams.get('id');
        }

        Axios.get(this.state.baseUrl + '/api/expenses/details/' + expenseId)
        .then(res => {
          this.setState({
            data: res.data.expense,
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
        let { data } = this.state;
        
        return (
            <div className="card">
                <div className="card-header">
                <Link href="/dashboard">Back</Link>
                &nbsp;
                    Expense Details of Month {data.month_name}
                    
                    
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6 p-2 table-responsive">
                            <table className="table table-hover table-bordered">
                                <tr>
                                    <th>Total Income</th>
                                    <th>: {data.total_income}</th>
                                </tr>
                                <tr>
                                    <th>Total Expense</th>
                                    <th>: {data.total_exp}</th>
                                </tr>
                                <tr>
                                    <th>In Balance</th>
                                    <th>: {data.in_balance}</th>
                                </tr>
                            </table>
                        </div>
                        <div className="col-md-6 p-2 table-responsive">
                        <table className="table table-hover table-bordered">
                            
                            {
                                
                                data.expenses && data.expenses.map((d, i) => (
                                    <tr key={i}>
                                        <th>{d.expItem}</th>
                                        <th>: {d.expCost}</th>
                                    </tr>
                                ))
                            }
                                
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ExpenseDetails;

// async function ExpenseDetails() {
//     const router = useRouter()
//     const { sid } = router.query

//     const baseUrl = 'http://localhost:4000';
//     let token = process.browser ? localStorage.getItem('token') : '';
    
//     const getExpenseDetails = async (sid, token) => {
  
//         Axios.defaults.headers.common['Authorization'] = token;
//         return await Axios.get(baseUrl + '/api/expenses/details/' + sid)
//             .then(res => res.data.expense)
//             .catch(err => nse.data);
//     } 

//     console.log(await getExpenseDetails(sid, token));
  
//     return <p>Post: {sid}</p>
//     }
  
//   export default ExpenseDetails;