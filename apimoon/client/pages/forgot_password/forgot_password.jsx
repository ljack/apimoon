import React from "react";
import {pathFor, menuItemClass} from "/client/lib/router_utils";
import {Loading} from "/client/pages/loading/loading.jsx";
import {getFormData} from "/client/lib/form_utils";


export const ForgotPassword = React.createClass({
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
			errorMessage: "",
			resetPasswordSent: false
		};
	},

	renderErrorMessage() {
		return (
	<div className="alert alert-warning">
		{this.state.errorMessage}
	</div>
);
	},

	renderInfo() {
		return(
	<div className="accounts-info-box">
		<h2>
			Forgot password
		</h2>
		<p>
			Password reset instructions are sent to your e-mail address.
		</p>
		<a href={pathFor('login')} className="btn btn-lg btn-primary" id="reset-password-sent">
			OK
		</a>
	</div>
);
	},

	renderForm() {
		return(
	<form id="forgot_password_form" className="account-form" role="form" onSubmit={this.onSubmit}>
		<h2 className="account-form-heading">
			Forgot password
		</h2>
		{this.state.errorMessage ? this.renderErrorMessage() : null}
		<div className="form-group">
			<label htmlFor="email">
				Please enter your e-mail address:
			</label>
			<input id="reset-email" type="text" name="email" className="form-control" placeholder="Email address" autoFocus />
		</div>
		<button className="btn btn-lg btn-primary btn-block" type="submit" data-loading-text="Please wait...">
			Submit
		</button>
	</form>
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
				Accounts.forgotPassword({email: values.email}, function(err) {
					submitButton.button("reset");
					if (err) {
						self.setState({ errorMessage: err.message });
					} else {
						self.setState({
							errorMessage: "",
							resetPasswordSent: true
						});
					}
				});
			},
			onError: function(message) {
				self.setState({ errorMessage: message });
			},
			fields: {
				email: { type: "email", required: true }
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
		{this.state.resetPasswordSent ? this.renderInfo() : this.renderForm()}
	</div>
);
		}
	}
});
