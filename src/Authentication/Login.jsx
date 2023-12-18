import React, { useContext, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './Provider';
import Swal from 'sweetalert2';
import Navbar from '../SharedComponent/Navbar';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from './Firebase.config';
const auth = getAuth(app);

const Login = () => {

    const navigate=useNavigate();
    const location=useLocation();
    const from = location.state?.from?.pathname || '/';
    const {LoginUser,googleLogin}=useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = (event) => {
      event.preventDefault();
      const form=event.target;
      const email=form.email.value;
      const password =form.password.value;
      console.log(email,password);
       LoginUser(email,password)
       .then(result=>{
        const signinUser=result.user;
        console.log(signinUser);
        setEmail('');
        setPassword('');
    
        Swal.fire({
          title: 'Great!',
          text: 'Successfully Login ',
          icon: 'success',
          confirmButtonText: 'Done'
        });
        navigate(from, { replace: true }); 
  
       })
       .catch(error=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Login Failed!',
        })
       })
      
    };
    const emailref=useRef();
    const passwordref=useRef()
    const handleResetPassword=event=>{
      const email=emailref.current.value
      console.log(email);
      if(!email){
        alert('input your Email for reset your password')
        return;
      }
      sendPasswordResetEmail(auth, email)
      .then(() => {
      alert('Great! Please check your email & reset your password')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    
    }
  
    return (
        <div>
   <Navbar></Navbar>
        <form onSubmit={handleLogin} className="hero min-h-screen bg-base-100">
    <div className="hero-content flex-col lg:flex-row">
      <div className="text-center lg:text-left">
       <img src="https://i.ibb.co/By3vB3N/tablet-login-concept-illustration-114360-7883.jpg" alt="" />
      </div>
      <div className="card flex-shrink-0 w-full max-w-sm  bg-base-100">
        <div className="card-body font-serif">
         <div className='mb-2'>

  
         <h3 className='text-2xl mb-2 font-bold font-serif'>Sign In </h3>
          <p className='text-xl'>Enter your details to Login.</p>
         </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="text"           ref={emailref}
 name="email" placeholder="email" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password"           ref={passwordref}
 name='password' placeholder="password" className="input input-bordered" />
            <label className="label">
          
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn  btn-warning">Login</button>
          </div>
          <h3 className='mt-3'>Already have an account? <Link className='text-blue-500 font-serif' to='/registration'>Sign Up</Link> </h3>
         
        </div>
      </div>
    </div>
  </form>
  <div className='text-right flex justify-center'>
  <i>Are you forget password? please<button onClick={handleResetPassword} className='btn btn-link'> reset password</button></i>
</div>

      </div>
    );
};

export default Login;