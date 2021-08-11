import Link from 'next/link';
import React, {useState} from 'react';
import { useRouter } from "next/router";
import Axios from 'axios';

export default function Registration() {

    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');
    let [errors, setErrors] = useState({});
    let [success, setSuccess] = useState({});

    const router = useRouter();
    const baseUrl = 'http://localhost:4000';

    const getRegistration = e => {
      e.preventDefault();
  
      Axios.post(baseUrl + '/api/users/register', {name, email, password, confirmPassword})
      .then(res => {
        setSuccess(res.data);
        // router.push('/')
      })
      .catch(err => {
          setErrors(err.response.data);
          name= '';
          email= '';
          password= '';
          confirmPassword= '';
      });
    }


    return (
      <div className="card">
        <div className="card-header">
          Register For A Account
        </div>
        <div className="card-body">
          { success.message && 
            <div className="alert alert-success">{ success.message }</div>
          }
          { errors.message && 
            <div className="alert alert-danger">{ errors.message }</div>
          }
          <form onSubmit={ (e) => getRegistration(e) } className="row g-3">
              <div className="col-12">
                  <label>Name</label>
                  <input onChange={ (event) => setName(event.target.value) } type="text" name="name" className={errors.name ? 'form-control is-invalid' : 'form-control'} placeholder="Name" value={name} />
                  <div className="invalid-feedback">{ errors.name }</div>
              </div>
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
                  <label>Confirm Password</label>
                  <input onChange={ (event) => setConfirmPassword(event.target.value) } type="password" name="confirmPassword" className={errors.confirmPassword ? 'form-control is-invalid' : 'form-control'} placeholder="Confirm Password" value={confirmPassword} />
                  <div className="invalid-feedback">{ errors.confirmPassword }</div>
              </div>
              <div className="col-12">
                  <button type="submit" className="btn btn-dark float-end">Register</button>
              </div>
          </form>
          <hr className="mt-4" />
          <div className="col-12">
              <p className="text-center mb-0">Already have an account? <Link href="/">Login</Link></p>
          </div>
        </div>
      </div>
    )
  }
  