import React, { Component } from 'react'
import { FrownOutlined } from '@ant-design/icons'
export class Footer extends Component {
    render() {
        return (
            <div style={{position:"fixed", bottom:0, width:"100%", textAlign:"center", fontSize:"15px",color:"white", backgroundColor:"#001529"}}>
                <FrownOutlined /> Happy Coding
            </div>
        )
    }
}

export default Footer

