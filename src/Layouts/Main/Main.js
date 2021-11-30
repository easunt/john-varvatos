import React, { Component } from 'react';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';

export class Main extends Component {
    render() {
        return (
            <div>
                <Header/>
                <SideBar/>
            </div>
        )
    }
}

export default Main
