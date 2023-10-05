import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, } from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import {User} from '../store/User/User.action'
import {useTranslation} from "react-i18next";
import axios from '../../services/index'
import CurrencyFormat from 'react-currency-format';
import LogoHeader from '../../images/brand/logoHeader.png'


const ProfileToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
        ref={ref}
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}
    >
    {children}
        <div className="profile_log">
            <div class="user">
                <span class="thumb"><i class="mdi mdi-account"></i></span>
                <span class="arrow"><i class="la la-angle-down"></i></span>
            </div>
        </div>
    </div>
));

function Header2() {
    const {t} = useTranslation()

    return (
        <>
            <div class="header dashboard">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xl-12" style={{
                            display: 'flex',
                            alignContent: 'center',
                            justifyContent: 'center'
                        }}>
                        <Link to={'/'}>
                        <img src={LogoHeader}
                            style={
                                {
                                    width: 100,
                                    maxHeight: '70px',
                                }
                        }></img>
                        </Link>
                        </div>       
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header2;