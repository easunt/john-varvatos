import React, { Component } from 'react'
import axios from 'axios';
import AttributeModal from './AttributeModal';
import AttributeRegModal from './AttributeRegModal';
import styled from 'styled-components';
import { FormOutlined } from '@ant-design/icons' // DeleteOutlined 삭제버튼
import { HOST_URL } from '../../../config';



const BoxOverlay = styled.div`
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    margin:150px 200px 120px 400px;
    justify-content:center;
    align-content:center;
`

const BoxWrapper = styled.div`
    width:230px;
    height:200px;
    background-color:lightgrey;
    z-index:1;
    margin:10px;
`

const BoxInner = styled.div`
    width:230px;
    height:40px;
    background-color: #001529;
    z-index:2;
    color:white;
`


export class Attributes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            attributes: [],
            modalVisible: false,
            regModalVisible: false,
            delbtnVisible: "hidden",
            data_id: null
        }

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenRegModal = this.handleOpenRegModal.bind(this);
        this.handleClickBtnVisible = this.handleClickBtnVisible.bind(this);
        this.handleClickBtnHidden = this.handleClickBtnHidden.bind(this);

    }

    handleOpenModal = (e) => {
        console.log(e.target)
        this.setState({
            modalVisible: !this.state.modalVisible,
            data_id: e.target.id
        })
    }

    handleCloseModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        })

    }

    handleOpenRegModal = (e) => {
        this.setState({
            regModalVisible: !this.state.regModalVisible,
        })
    }

    handleClickBtnVisible = () => {
        this.setState({
            delbtnVisible: '',
            data_id: null
        })
    }

    handleClickBtnHidden = () => {
        this.setState({
            delbtnVisible: 'hidden',
            modalVisible: false
        })
    }

    getAttributes = async () => {
        try {
            const response = await axios.get(`${HOST_URL}/attributes/`);
            this.setState({
                ...this.state,
                attributes: response.data.data
            })
        } catch (error) {
            alert(error);
        }
    }


    delAttribute = async (e) => {
        try {
            if (window.confirm('삭제ㄱ?')) {
                const attributeId = e.target.value
                await axios.delete(`${HOST_URL}/attributes/${attributeId}`)
                alert("삭.제.완.료.")
                window.location.replace("/sys/attributes")
            }
        } catch (error) {
            alert(error);
        }

    }

    componentDidMount() {
        this.getAttributes();
    }

    render() {

        return (
            <div>
                <BoxOverlay>
                    {this.state.attributes.map((attribute) => (<BoxWrapper key={attribute.id}
                        id={attribute.id}
                        onClick={this.handleOpenModal}
                        style={{ color: "transparent", textShadow: "0 0 2px #000", transition: "all 250ms ease-in", textAlign: "center" }}
                    >
                        <BoxInner>
                            <span style={{ padding: "10px", float: "left" }} key={attribute.id} id={attribute.id} onClick={this.handleOpenModal}><FormOutlined /> {attribute.name}</span>
                            <button style={{ padding: "10px", float: "right", height: "40px", border: "none", color: "white", backgroundColor: "#001529", zIndex:'1'}} value={attribute.id} onClick={this.delAttribute}>ㅡ </button>
                        </BoxInner>
                        naeyong-eul jeonbu bogo sip-eumyeon keullighaela. Click to view all contents. yeonsanboghabgwajeong-eun ~eul wanlyohago neunglyul-eul hyangsangsikigi"
                    </BoxWrapper>))}

                    <BoxWrapper style={{ textAlign: "center", lineHeight: "150px", fontSize: "30px", }} onClick={this.handleOpenRegModal}>
                        <BoxInner />
                        <b>+</b>
                    </BoxWrapper>
                </BoxOverlay>

                {
                    (this.state.modalVisible && this.state.delbtnVisible) && <AttributeModal visible={this.state.modalVisible}
                        closable={true}
                        maskClosable={true}
                        onClose={this.handleCloseModal}
                        id={this.state.data_id} />
                }

                {
                    this.state.regModalVisible && <AttributeRegModal visible={this.state.regModalVisible}
                        onClose={this.handleCloseModal}
                    />
                }

            </div>
        )
    }
}


export default Attributes
