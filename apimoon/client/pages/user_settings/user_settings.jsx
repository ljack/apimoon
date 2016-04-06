import React from "react";
import {pathFor, menuItemClass} from "/client/lib/router_utils";
import {Loading} from "/client/pages/loading/loading.jsx";


export const UserSettings = React.createClass({
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
	<div className="page-container container">
		<div className="row">
			<div className="col-md-12" id="content">
				<div className="row" id="title_row">
					<div className="col-md-12">
						<div id="page_menu" className="pull-right">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div className="row">
			<div id="menu" className="col-sm-3 col-md-2">
				<h2>
				</h2>
				<UserSettingsSideMenu data={this.data} />
			</div>
			<div id="subcontent" className="col-sm-9 col-md-10">
				{this.props.subcontent}
			</div>
		</div>
	</div>
);
		}
	}
});
export const UserSettingsSideMenu = React.createClass({
	render() {
		return (
	<ul id="menu-items" className="nav nav-stacked nav-pills">
		<li id="menu-item-simple" className={menuItemClass('user_settings.profile')}>
			<a href={pathFor('user_settings.profile')}>
				<span className="item-title">
					Profile
				</span>
			</a>
		</li>
		<li id="menu-item-simple" className={menuItemClass('user_settings.change_pass')}>
			<a href={pathFor('user_settings.change_pass')}>
				<span className="item-title">
					Change password
				</span>
			</a>
		</li>
	</ul>
);
	}
});
