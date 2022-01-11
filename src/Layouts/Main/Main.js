import React, { Component } from 'react';
import axios from 'axios';


export class Main extends Component {


    state = {
        loading: false,
        attributes: []
    }
|
    getAttribute = async () => {
        const response = await axios.get('http://localhost:8090/api/v1/attributes/')
        // let aaa = response.data.attributes.data
        this.setState ({
            loading : response.status === 200 ? true : false,
            attributes: response.data.data
        });

        console.log(this.state)
        // console.log(response.data.data.name)
    }
    

    componentDidMount() {
        this.getAttribute();
        // console.log( this.getAttribute())
        // axios.get('http://localhost:8090/api/v1/attributes/1').then(reponse => {
        //     console.log(reponse.data);
        // })

    }


    render() {

        // console.log(this.state)
        const { attributes } = this.state;
        // console.log('attributes:',attributes);
        // const deviceList = devices.map((device,index)=>(<li className='sidebar_item_detail' key={index}>{device}</li>));
        // const attributeList = attributes.map((attribute,index)=> (<li key={}></li>)
        
        return (
            <div>
                {/* {attributes} */}
            </div>
        )
    }
}

export default Main
