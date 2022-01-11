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
            readonly: true,
            submitVisible: false,
            visible: this.props.visible,
            attribute: {}
        }

        this.formRef = React.createRef();

        this.handleClick = this.handleClick.bind(this);
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

    handleClick = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            readonly: false,
            submitVisible: true,
            name: this.state.attribute.name,
            mutability: this.state.attribute.mutability,
            max: this.state.attribute.max,
            min: this.state.attribute.min,
            step: this.state.attribute.step,
            supported: this.state.attribute.supported,
            writable: this.state.attribute.writable,
        })
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

    //Attribute 수정
    putAttribute = async () => {

        let sendAttribute = this.state
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




        await axios.put(`http://localhost:8090/api/v1/attributes/${this.props.id}`, sendAttribute)

        this.setState({
            submitVisible: false
        })
        alert('수.정.완.료.')
    }

    //수정btn 클릭시 
    handleSubmit = (e) => {
        e.preventDefault();
        // const form = this.formRef.current
        this.putAttribute();
    }


    //Attribute Detail
    getAttribute = async () => {

        // console.log(this.state.id)
        const response = await axios.get(`http://localhost:8090/api/v1/attributes/${this.props.id}`)

        this.setState({
            attribute: response.data.data
        })
    }



    componentDidMount() {
        this.getAttribute();
    }


    render() {

        const { className } = this.props;
        let { id, name, mutability, min, max, step, supported, writable } = this.state.attribute;

        return (
            <>
                <ModalOverlay visible={this.state.visible} />
                <ModalWrapper className={className} tabIndex="-1" visible={this.state.visible}>
                    <ModalInner tabIndex="0" className="modal-inner">
                        {/* {children} */}
                        <div className='close-box' style={{ position: 'fixed', top: '5px', right: '10px' }} ><CloseSquareOutlined onClick={this.handleClickModalClose} /></div>
                        <form onSubmit={this.handleSubmit}>
                            <button onClick={this.handleClick}>수정</button>
                            <input
                                style={this.state.submitVisible ? {} : { display: 'none' }}
                                type="submit"
                                value="저장" />
                            <div style={this.isEmpty(id) ? { display: 'none' } : {}}>
                                <input
                                    defaultValue={id || ''}
                                    readOnly={true} />
                            </div>
                            <div style={this.isEmpty(name) ? { display: 'none' } : {}}>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={this.state.submitVisible ? this.state.name : (name || '')}
                                    readOnly={this.state.readonly}
                                    onChange={this.handleChange} />
                            </div>
                            <div style={this.isEmpty(mutability) ? { display: 'none' } : {}}>
                                <input
                                    name="mutability"
                                    defaultValue={this.state.submitVisible ? this.state.mutability : (mutability || '')}
                                    readOnly={this.state.readonly}
                                    onChange={this.handleChange} />
                            </div>
                            {/* <div style={min !== null || min !== undefined  ? {}:{display:'none'}}><input value={min} readOnly /></div> */}
                            <div style={this.isEmpty(min) ? { display: 'none' } : {}}>
                                <input
                                    type="number"
                                    name="min"
                                    defaultValue={this.state.submitVisible ? this.state.min : (min || '')}
                                    readOnly={this.state.readonly}
                                    onChange={this.handleChange} />
                            </div>
                            <div style={this.isEmpty(max) ? { display: 'none' } : {}}>
                                <input
                                    type="number"
                                    name="max"
                                    defaultValue={this.state.submitVisible ? this.state.max : (max || '')}
                                    readOnly={this.state.readonly}
                                    onChange={this.handleChange} />
                            </div>
                            <div style={this.isEmpty(step) ? { display: 'none' } : {}}>
                                <input
                                    type="number"
                                    name="step"
                                    defaultValue={this.state.submitVisible ? this.state.step : (step || '')}
                                    readOnly={this.state.readonly}
                                    onChange={this.handleChange} />
                            </div>
                            <div style={this.isEmpty(supported) ? { display: 'none' } : {}}>
                                <input
                                    name="supported"
                                    defaultValue={this.state.submitVisible ? this.state.supported : (supported || '')}
                                    readOnly={this.state.readonly}
                                    onChange={this.handleChange} />
                            </div>
                            <div style={this.isEmpty(writable) ? { display: 'none' } : {}}>
                                <input
                                    name="writable"
                                    defaultValue={this.state.submitVisible ? this.state.writable : (writable || '')}
                                    readOnly={this.state.readonly}
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


