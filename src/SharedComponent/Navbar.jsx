import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Authentication/Provider';
import { AiFillCamera } from 'react-icons/ai';
import { ImPencil2 } from 'react-icons/im';

const Navbar = () => {
  const {user,LogOut}=useContext(AuthContext);
  const handleLogOut=()=>{
      console.log('clicked')
      LogOut()
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  }
    return (
        <div>
            <div className="navbar bg-zinc-200">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
       <li><Link to='/'>Home</Link></li>
       <li><Link to='/media'>Media</Link></li>
    
      
        
      </ul>
    </div>
<div className='flex items-center gap-1'>
  <span className='text-3xl'> <AiFillCamera/></span>
  <a className=" normal-case text-xl font-serif font-semibold"><span>Upl</span><span className='text-red-500'>oa</span><span>dy</span> </a>
<span className='text-xl'><ImPencil2/></span>
</div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <li><Link to='/'>Home</Link></li>
       <li><Link to='/media'>All Media</Link></li>
      
    </ul>
  </div>
  <div className="navbar-end">
  {
    user ? <Link onClick={handleLogOut} to="/login" className="btn">Logout</Link> : <Link to='/login' className="btn">Login</Link>
  }
  </div>
</div>
        </div>
    );
};

export default Navbar;