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
				<PageHeader>Test API call</PageHeader>
				{this.state.user &&
				<div className="profile-user-info">
								<div className="profile-info-row">
									<div className="profile-info-name"> Email </div>

									<div className="profile-info-value">
										<span>{this.state.user.username}</span>
									</div>
								</div>

								<div className="profile-info-row">
									<div className="profile-info-name"> Name </div>

									<div className="profile-info-value">
										<span>{this.state.user.attributes.name}</span>
									</div>
								</div>

								<div className="profile-info-row">
									<div className="profile-info-name"> Info </div>
									<div className="profile-info-value">
										<span>{this.state.user.attributes.profile}</span>
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
