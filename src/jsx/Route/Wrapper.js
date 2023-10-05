import React from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux'
import { Redirect, Route } from 'react-router-dom';

function RouteWrapper({
  redirectTo, isPrivate, component: Component, ...rest
}) {
  
  const authenticated = useSelector(state => state.user)
  if (authenticated && !isPrivate){
    return <Redirect to={redirectTo} />;
  }
  if(authenticated && isPrivate){
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
  if(!authenticated && isPrivate){
    return <Redirect to={redirectTo} />;
  }
  if(!authenticated && !isPrivate){
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
  
}

RouteWrapper.propTypes = {
  redirectTo: PropTypes.string,
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  redirectTo: '/',
  isPrivate: false,
};

export default RouteWrapper;