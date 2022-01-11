import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import { CloseSquareOutlined } from '@ant-design/icons'


export class AttributeModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // id: this.props.id,
            readonly: false,
            submitVisible: false,
            visible: this.props.visible
        }

        this.formRef = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickModalClose = this.handleClickModalClose.bind(this);
    }


    isEmpty = (data) => {
        if (typeof (data) === 'object') {
            if (JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]') {
                return true;
            } else if (!data) {
                return true;
            }
            return false;
        } else if (typeof (data) === 'string') {
            if (!data.trim()) {
                return true;
            }
            return false;
        } else if (typeof (data) === 'number') {
            return false;
        } else if (typeof (data) === 'undefined') {
            return true;
        } else if (isNaN(data) === true) { // 신규 NaN 처리
            return true;
        } else if (data === 0) { // 신규 0 처리
            return true;
        } else {
            return false;
        }
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleClickModalClose = () => {
        this.setState({
            visible: false,
        })
    }

    //Attribute 등록
    postAttribute = async () => {
        try {
            let sendAttribute = { ...this.state }
            if (sendAttribute.supported !== undefined) {
                if (sendAttribute.supported.indexOf(',') === -1) {
                    const strSupported = sendAttribute.supported;
                    sendAttribute.supported = [];
                    sendAttribute.supported[0] = strSupported;

                } else {
                    sendAttribute.supported = sendAttribute.supported.split(',')
                }
            }
            if (sendAttribute.writable !== undefined) {
                if (sendAttribute.writable.indexOf(',') === -1) {
                    const strWritable = sendAttribute.writable;
                    sendAttribute.writable = [];
                    sendAttribute.writable[0] = strWritable;

                } else {
                    sendAttribute.writable = sendAttribute.writable.split(',')
                }
            }


            await axios.post(`http://localhost:8090/api/v1/attributes`, sendAttribute)

            this.setState({
                // ...this.state.attribute,
                submitVisible: false
            })
            alert('등.록.완.료.')
        } catch (error) {
            alert(error);
        }
    }

    //등록btn 클릭시 
    handleSubmit = (e) => {
        // e.preventDefault(); //창 닫히면서 새로고침-> 목록 재조회
        // const form = this.formRef.current
        this.postAttribute();
        this.setState({
            visible: false
        })

    }

    componentDidMount() {
    }


    render() {
        const { className } = this.props;
        // let { id, name, mutability, min, max, step, supported, writable } = this.state;


        return (
            <>
                <ModalOverlay visible={this.state.visible} />
                <ModalWrapper className={className} tabIndex="-1" visible={this.state.visible}>
                    <ModalInner tabIndex="0" className="modal-inner">
                        {/* {children} */}
                        <div className='close-box' style={{ position: 'fixed', top: '5px', right: '10px' }} ><CloseSquareOutlined onClick={this.handleClickModalClose} /></div>

                        <form onSubmit={this.handleSubmit}>
                            <button hidden={true} onClick={this.handleClick}>수정</button>
                            <input
                                type="submit"
                                value="저장" />
                            <div>
                                <input
                                    name="id"
                                    disabled={true}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={this.state.name || ''}
                                    onChange={this.handleChange} />
                            </div>
                            <div>
                                <input
                                    name="mutability"
                                    value={this.state.mutability || ''}
                                    onChange={this.handleChange} />
                            </div>
                            <div>
                                <input
                                    type="number"
                                    name="min"
                                    value={this.state.min || 0}
                                    onChange={this.handleChange} />
                            </div>
                            <div>
                                <input
                                    type="number"
                                    name="max"
                                    value={this.state.max || 0}
                                    onChange={this.handleChange} />
                            </div>

                            <div>
                                <input
                                    type="number"
                                    name="step"
                                    value={this.state.step || 0}
                                    onChange={this.handleChange} />
                            </div>
                            <div>
                                <input
                                    name="supported"
                                    value={this.state.supported || ''}
                                    onChange={this.handleChange} />
                            </div>
                            <div>
                                <input
                                    name="writable"
                                    value={this.state.writable || ''}
                                    onChange={this.handleChange} />
                            </div>
                        </form>
                    </ModalInner>
                </ModalWrapper>
            </>
        )
    }
}


const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  height: 500px;
  width: 500px;
  max-width: 600px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
`


AttributeModal.propTypes = {
    visible: PropTypes.bool,
}
export default AttributeModal


