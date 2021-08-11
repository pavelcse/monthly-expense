import Link from 'next/link'

export default function Dashboard() {
    let token = '';
    if (process.browser) {
        token = localStorage.getItem('token') || "";
    }

    return (
        <div className="row">
            <div className="col-md-12">
            {token && 
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link href="/dashboard" className="btn btn-sm btn-info d-block text-white">Dashboard</Link>
                    </li>
                    <li className="list-group-item">
                        <Link href="/items/expense-items" className="btn btn-sm btn-info d-block text-white">Expense Items</Link>
                    </li>
                    <li className="list-group-item">
                        <Link href="/expense/add" className="btn btn-sm btn-info d-block text-white">Monthly Expense</Link>
                    </li>
                </ul>
            }
                
            </div>
        </div>
    )
  }