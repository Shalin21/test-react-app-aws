import React, { Component } from 'react';
import { PageHeader, ListGroup } from 'react-bootstrap';
import { API, Auth } from 'aws-amplify';
import './Home.css';

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			testApiCall: [],
			user:null,
		};

	}

	async componentDidMount() {
		if (!this.props.isAuthenticated) {
			return;
		}

		Auth.currentAuthenticatedUser({
		bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
	}).then(user => {localStorage.setItem('user', JSON.stringify(user)); this.setState({user: JSON.parse(localStorage.getItem('user'))});})
		.catch(err => console.log(err));

		this.setState({ isLoading: false });
	}

	testApiCall() {
		return API.get('testApiCall', '/hello');
	}



	renderLander() {
		return (
			<div className="lander">
				<h1>Test web app</h1>
				<p>A simple react test app</p>
			</div>
		);
	}

	renderTest() {
		return (
			<div className="test">
				<PageHeader>Test App</PageHeader>
						{this.state.user &&
						<div className="container bootstrap snippet">
						<div className="panel-body inf-content">
						    <div className="row">
								<div className="col-xs-12 col-sm-3 center">
						 <span className="profile-picture">
							 <img className="editable img-responsive" alt=" Avatar" id="avatar2" src="http://bootdey.com/img/Content/avatar/avatar6.png" ></img>
						 </span>

						 <div className="space space-4"></div>

					 </div>
						        <div className="col-md-6">
						            <strong>Information</strong><br/>
						            <div className="table-responsive">
						            <table className="table table-condensed table-responsive table-user-information">
						                <tbody>
						                    <tr>
						                        <td>
						                            <strong>
						                                <span className="glyphicon glyphicon-user  text-primary"></span>
						                                Name
						                            </strong>
						                        </td>
						                        <td className="text-primary">
						                            {this.state.user.attributes.name}
						                        </td>
						                    </tr>
						                    <tr>
						                        <td>
						                            <strong>
						                                <span className="glyphicon glyphicon-envelope text-primary"></span>
						                                Email
						                            </strong>
						                        </td>
						                        <td className="text-primary">
						                            {this.state.user.username}
						                        </td>
						                    </tr>
																<tr>
						                        <td>
						                            <strong>
						                                <span className="glyphicon glyphicon-info  text-primary"></span>
						                                Some info about me
						                            </strong>
						                        </td>
						                        <td className="text-primary">
						                            {this.state.user.attributes.profile}
						                        </td>
						                    </tr>
						                </tbody>
						            </table>
						            </div>
						        </div>
						    </div>
						</div>
						</div>
					}
			</div>

		);
	}

	render() {
		return <div className="Home">{this.props.isAuthenticated ? this.renderTest() : this.renderLander()}</div>;
	}
}
