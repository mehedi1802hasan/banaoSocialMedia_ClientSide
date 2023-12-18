import React from 'react';
// import Navbar from '../SharedComponent/Navbar';
import Footer from '../SharedComponent/Footer';
import { Outlet  } from "react-router-dom";
import Navbar from '../SharedComponent/Navbar';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            {/* <Raf></Raf> */}
         <Outlet></Outlet>
         <Footer></Footer>
        </div>
    );
};

export default Main;