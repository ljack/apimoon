import React from "react";
import {pathFor, menuItemClass} from "/client/lib/router_utils";
import {Loading} from "/client/pages/loading/loading.jsx";
import {Todos} from "/lib/collections/todos.js";


export const PagetodosInsert = React.createClass({
		mixins: [
		ReactMeteorData
	],

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("todos_empty")
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

				todos_empty: Todos.findOne({_id:null}, {})
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
