import React from "react";
import {pathFor, menuItemClass} from "/client/lib/router_utils";
import {Loading} from "/client/pages/loading/loading.jsx";
import {Users} from "meteor-user-roles";


export const UserSettingsProfile = React.createClass({
		mixins: [
		ReactMeteorData
	],

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("current_user_data")
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

				current_user_data: Users.findOne({_id:Meteor.userId()}, {})
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
	</div>
);
		}
	}
});
