import Link from 'next/link';
import { useRouter } from "next/router";

export default function Header() {
    const router = useRouter();
    
    const logout = e => {
        e.preventDefault();
        localStorage.setItem('token', '');
        router.push('/');
    }
    
    let token = '';
    if (process.browser) {
        token = localStorage.getItem('token') || "";
    }

    return (
        <nav className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" href="/dashboard">Dashboard</Link>
            <div>
                {token 
                ? 
                <button type="button" onClick={ (e) => logout(e) } className="btn btn-danger btn-sm mx-2" href="#">Logout</button>
                :
                <>
                <Link className="btn btn-primary btn-sm mx-2" href="/">Login</Link>
                <Link className="btn btn-primary btn-sm mx-2" href="/registration">Register</Link>
                </>
                }
                

                
            </div>
        </nav>
    )
  }