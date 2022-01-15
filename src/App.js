import React, { Component, Suspense } from 'react';
import { Route, Routes } from "react-router-dom";
import Main from './Layouts/Main/Main';
import Header from './Layouts/Header/Header';
import Footer from './Layouts/Footer/Footer';
import SysMenu from './Layouts/SideBar/Section/SysMenu';
import UserMenu from './Layouts/SideBar/Section/UserMenu';
import './App.css';

export class App extends Component {
  render() {
    return (
      <Suspense>
        <Header />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="sys/*" element={<SysMenu />}/>          
          <Route path="/user" element={<UserMenu />} />
        </Routes>
        <Footer />
      </Suspense>
    );
  }
}

export default App
