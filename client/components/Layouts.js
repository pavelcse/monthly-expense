import SideNav from '../components/SideNav'
import Header from '../components/Header'
import Head from "next/head";

const Layout = ({ children }) => {
    return (
        <div>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Expense </title>
            </Head>
            <Header />
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-3">
                        <SideNav />
                    </div>
                    <div className="col-md-9">
                        { children }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;
