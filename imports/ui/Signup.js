import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import { Link } from 'react-router';

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {error: ''};
	}
	onSubmit(e) {
		e.preventDefault();

		const email = this.refs.email.value.trim();
		const password = this.refs.password.value.trim();

		if (password.length < 8) {
			return this.setState({error: 'Password must be more than 7 characters long'});
		}

		Accounts.createUser({email, password}, err => {
			if (err) { this.setState({error: err.reason}); }
			else { this.setState({error: ''}); }
		});
	}
	render() {
		return (
			<div className="boxed-view">
				<div className="boxed-view__box">
					<h1>Signup to Short Lnk</h1>

					{this.state.error ? <p>{this.state.error}</p> : undefined}

					<form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
						<input name="email" ref="email" type="email" placeholder="Email"/>
						<input name="password" ref="password" type="password" placeholder="Password"/>
						<button className="button">Create Account</button>
					</form>

					<Link to="/">Already have an account?</Link>
				</div>
			</div>
		);
	}
}

export default Signup;
