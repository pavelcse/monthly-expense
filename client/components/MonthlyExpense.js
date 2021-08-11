import Link from 'next/link';

export default function MonthlyExpense({data, deleteExpense}) {
  return (
      <div className="card">
          <div className="card-header">
              { data.month_name } <Link href={'expense/details?id='+data._id}>Details</Link>
              <button onClick={() =>deleteExpense(data._id) } className="btn btn-sm btn-danger">X</button>
          </div>
          <div className="card-body">
              <table>
                  <thead>
                      <tr>
                        <th>Total Inc.</th>
                        <th>: {data.total_income}/-</th>
                      </tr>
                      <tr>
                        <th>Total Exp.</th>
                        <th>: {data.total_exp}/-</th>
                      </tr>
                      <tr>
                        <th>In Bal.</th>
                        <th>: {data.in_balance}/-</th>
                      </tr>
                  </thead>
              </table>
          </div>
      </div>
    )
  }