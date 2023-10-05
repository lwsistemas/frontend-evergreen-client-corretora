import {Toast} from 'react-bootstrap';
import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import animated from '../../images/animated-gif.gif'

function Loading(props) {
    const stilo = {
        position: 'absolute',
        zIndex: 999,
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        color: 'white',
        width: "150px",
        height: "150px;",
        top:"25%"


    }
    return (
        <div style={{
            display: props.show
        }}>
            <img src={animated}
                 style={stilo}></img>
        </div>)
}

export default Loading