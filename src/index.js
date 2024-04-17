import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Signup from './frontend/components/Signup/Signup';
import Login from './frontend/components/Login/Login';
import Buyer from './frontend/components/Buyer/Buyer';
import Seller from './frontend/components/Seller/Seller';
import About from './frontend/components/About/About';
import Contact from  './frontend/components/Contact/Contact';
import Addproduct from './frontend/components/Addproduct/Addproduct';
import Myaccount from './frontend/components/Myaccount/Myaccount';
import Header from './frontend/components/Header/Header';
import LearnMore from './frontend/components/LearnMore/LearnMore';
import './index.css';


function Main() {
    const location = useLocation();
    const path = location.pathname;

    return (
        <React.StrictMode>
            {
                path !== '/' && path !== '/signup' ? <Header /> : null 
            }
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/buyer'  element={<Buyer/>}/>
                <Route path='/seller' element={<Seller/>}  />
                <Route path='/about'  element={<About/>}/>
                <Route path='contact' element={<Contact/>}/>
                <Route path='addproduct' element= {<Addproduct/>}/>
                <Route path='myaccount' element={<Myaccount/>}/>
                <Route path='/learnmore/:id' element={<LearnMore/>}/>
            </Routes>
        </React.StrictMode>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Main />
    </Router>
);
