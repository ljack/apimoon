import React from "react";
import {Meteor} from "meteor/meteor";
import {pathFor, menuItemClass} from "/client/lib/router_utils";
import {getFormData} from "/client/lib/form_utils";
import {Loading} from "/client/pages/loading/loading.jsx";


export const Login = React.createClass({
		mixins: [
		ReactMeteorData
	],

	isReady: function() {
		

		var subs = [
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	getMeteorData: function() {
		var data = { dataLoading: true };

		if(this.isReady()) {
			

			data = {

			};
		

			
		}
		return data;
	},


	getInitialState() {
		return {
			errorMessage: ""
		};
	},

	renderErrorMessage() {
		return (
	<div className="alert alert-warning">
		{this.state.errorMessage}
	</div>
);
	},

	onSubmit(e) {
		e.preventDefault();
		this.setState({ errorMessage: "" });

		let self = this;

		let submitButton = $(e.target).find("button[type='submit']");

		getFormData(e.target, {
			onSuccess: function(values) {
				submitButton.button("loading");
				Meteor.loginWithPassword(values.email, values.password, function(err) {
					submitButton.button("reset");
					if(err) {
						self.setState({ errorMessage: err.message });
						return false;
					}
				});
			},
			onError: function(message) {
				self.setState({ errorMessage: message });
			},
			fields: {
				email: { type: "email", required: true },
				password: { required: true }
			}
		});

		return false;
	},

	render() {
		if(this.data.dataLoading) {
			return (
	<Loading />
);
		} else {
			return (
	<div className="page-container container" id="content">
		<form id="login_form" className="account-form" role="form" onSubmit={this.onSubmit}>
			<h2>
				Please sign in
			</h2>
			{this.state.errorMessage ? this.renderErrorMessage() : null}
			<div id="login-with-password">
				<input type="text" id="login-email" name="email" className="form-control" placeholder="Email address" autoFocus />
				<input type="password" id="login-password" name="password" className="form-control" placeholder="Password" />
				<button className="btn btn-lg btn-primary btn-block" type="submit" data-loading-text="Please wait...">
					Sign in
				</button>
				<p className="account-form-text-after" id="register-link">
					Not a member?&nbsp;
					<a href={pathFor('register')}>
						Sign up here
					</a>
				</p>
				<p className="account-form-text-after" id="forgot-password-link">
					Forgot password?&nbsp;
					<a href={pathFor('forgot_password')}>
						Click here
					</a>
				</p>
			</div>
		</form>
	</div>
);
		}
	}
});
