import React from 'react';
import Navbar from '../SharedComponent/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../SharedComponent/Footer';

const Main = () => {
    return (
        <div>
         <Navbar></Navbar>
         {/* <Outlet></Outlet>
         <Footer></Footer> */}
        </div>
    );
};

export default Main;