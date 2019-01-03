import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: C,  props: cProps, ...rest }) => (
	<Route {...rest} render={props => props.isAuthenticated === true
    ? <C {...props} {...cProps} />
    : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
  }
    />
);
