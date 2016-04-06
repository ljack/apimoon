import React from "react";
import {pathFor, menuItemClass} from "/client/lib/router_utils";
import {Loading} from "/client/pages/loading/loading.jsx";


export const HomePublic = React.createClass({
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


	render() {
		if(this.data.dataLoading) {
			return (
	<Loading />
);
		} else {
			return (
	<div className="page-container container" id="content">
		<div className="row" id="title_row">
			<div className="col-md-12">
				<div id="page_menu" className="pull-right">
				</div>
			</div>
		</div>
		<div className="jumbotron ">
			<div id="content" className="container">
				<h1 id="component-title">
					<span id="component-title-icon" className="">
					</span>
					Example application
				</h1>
				<p id="jumbotron-text">
					<b>This <a href="https://www.meteor.com" target="_blank">Meteor</a> application is made with <a href="http://www.meteorkitchen.com" target="_blank">meteor-kitchen</a> without manual coding.</b><br />It demonstrates how to create application with login, register and forgot password functions.<br />Source code (input file for generator) is <a href="https://github.com/perak/kitchen-examples/tree/master/example-accounts" target="_blank">here</a>.
				</p>
				<p id="jumbotron-button">
					<a href={pathFor('login')} className="btn btn-primary btn-lg" role="button">
						Continue &raquo;
					</a>
				</p>
			</div>
		</div>
	</div>
);
		}
	}
});
