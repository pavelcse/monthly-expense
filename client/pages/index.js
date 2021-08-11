import Link from 'next/link';
import React, {useState} from 'react';
import { useRouter } from "next/router";
import Axios from 'axios';

export default function Registration() {
    const router = useRouter();

    if(process.browser && localStorage.getItem('token')) {
      router.push('/dashboard');
    }

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [errors, setErrors] = useState({});

    
    
    const baseUrl = 'http://localhost:4000';
      
      const getLogin = e => {
        e.preventDefault();
    
        Axios.post(baseUrl + '/api/users/login', {email, password})
        .then(res => {
          let { token } = res.data;
    
          localStorage.setItem('token', token)
          router.push('/dashboard')
          
        })
        .catch(err => {
            setErrors(err.response.data);
            email= '';
            password= '';
        });
      }

    return (
        <div className="card">
          <div className="card-header">
            Login To Your Account
          </div>
          <div className="card-body">

            { errors.message && 
             <div className="alert alert-danger">{ errors.message }</div>
            }
            
  
            <form onSubmit={ (e) => getLogin(e) } className="row g-3">
                <div className="col-12">
                    <label>Email</label>
                    <input onChange={ (event) => setEmail(event.target.value) } type="email" name="email" className={errors.email ? 'form-control is-invalid' : 'form-control'} placeholder="Email" value={email} />
                    <div className="invalid-feedback">{ errors.email }</div>
                </div>
                <div className="col-12">
                    <label>Password</label>
                    <input onChange={ (event) => setPassword(event.target.value) } type="password" name="password" className={errors.password ? 'form-control is-invalid' : 'form-control'} placeholder="Password" value={password} />
                    <div className="invalid-feedback">{ errors.password }</div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-dark float-end">Login</button>
                </div>
            </form>
            <hr className="mt-4" />
            <div className="col-12">
                <p className="text-center mb-0">Have not account yet? <Link href="/registration">Signup</Link></p>
            </div>
          </div>
        </div>
      )
}