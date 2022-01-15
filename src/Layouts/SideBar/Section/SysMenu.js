import React, { Component } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import Attributes from '../../Main/Section/Attributes'
import Capabilities from '../../Main/Section/Capabilities'
import Devicetypes from '../../Main/Section/Devicetypes'
import { Menu } from 'antd';
import { AppstoreOutlined} from '@ant-design/icons';

const { SubMenu } = Menu;

export class SysMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuName: "",
            theme: 'dark',
            current: '1',
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.changeTheme = this.changeTheme.bind(this);

    }

    handleClick = (e) => {
        let menuSelect = e.currentTarget.id
        menuSelect = menuSelect.toUpperCase();
        this.setState({
            menuName: menuSelect
        })
    };


    changeTheme = value => {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    };

    handleToggle = e => {
        this.setState({
            current: e.key,
        });
    };

    render() {

        return (
            <>

                <Menu
                    theme={this.state.theme}
                    onClick={this.handleToggle}
                    style={{position: "fixed",
                        width: "15.5%",/*원하는 넓이 지정*/
                        height:"100%",
                        top:"100px",
                        left: "0px",
                        bottom: "0px",}}
                    defaultOpenKeys={['sub2']}
                    selectedKeys={[this.state.current]}
                    mode="inline"
                >
                    {/* <Switch
                        checked={this.state.theme === 'dark'}
                        onChange={this.changeTheme}
                        checkedChildren="Dark"
                        unCheckedChildren="Light"
                        right="0px"
                    /> */}

                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation">
                        <Menu.Item key="1"><Link to="devicetype">DeviceType</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="capabilities">Capabilities</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="attributes">Attributes</Link></Menu.Item>
                    </SubMenu>

                </Menu>

                <Routes>
                    <Route path="attributes" element={<Attributes />} />
                    <Route path="capabilities" element={<Capabilities />} />
                    <Route path="devicetype" element={<Devicetypes />} />
                </Routes>

            </>
        )
    }
}


export default SysMenu

