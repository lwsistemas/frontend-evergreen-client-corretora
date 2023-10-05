import React, {useState, useEffect} from 'react';
import {Dropdown} from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import axios from '../../services/index'
import {useSelector, useDispatch} from 'react-redux'
import banks from './banks.json'
import styled from "styled-components";
import brlIcon from '../../images/profile/brl.png'

const Inputstyle = styled.input` 
background-color: #485579!important;
margin-top: 15px!important;
&::-webkit-slider-thumb {
    position: relative;
    border: 0!important;
    height: 25px!important;
    width: 25px!important;
    appearance: none;
    background: url(${brlIcon})!important;
    background-size: cover!important;

  }
`

function SliderValue(props) {
    return (
        <Inputstyle type="range" min={0.00} step="0.0000001" max={props.max} value={props.value} onChange={e => {
            props.setQuantity(e.target.value)
            props.setQuantitySec((e.target.value * props.value).toFixed(2))
        }} />
    )
}
export default SliderValue
