import React from "react";
import {pathFor, menuItemClass} from "/client/lib/router_utils";
import {Loading} from "/client/pages/loading/loading.jsx";
import {userEmail, userFullName} from "/client/lib/account_utils";


export const Layout = React.createClass({
	mixins: [
		ReactMeteorData
	],

	getMeteorData() {
		var data = {};

		data.currentUser = Meteor.user();

		return data;
	},

	render() {
		return this.data.currentUser ?
	<PrivateLayout content={this.props.content} />
:
	<PublicLayout content={this.props.content} />
}
});
export const FreeLayout = React.createClass({
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
	<div>
		<div id="content" className="sticky-wrapper">
			<div id="navbar" className="navbar navbar-fixed-top navbar-default" role="navigation">
				<div className="navbar-container container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
							<span className="sr-only">
								Toggle navigation
							</span>
							<span className="icon-bar">
							</span>
							<span className="icon-bar">
							</span>
							<span className="icon-bar">
							</span>
						</button>
						<a className="navbar-brand" href="#">
							apimoon
						</a>
					</div>
					<div id="menu" className="collapse navbar-collapse">
					</div>
				</div>
			</div>
			<div className="navbar-spacer">
			</div>
			{this.props.content}
		</div>
		<div id="footer" className="sticky-footer">
			<div className="footer-container container">
				<p className="text-muted">
					<a href="https://github.com/ljack/apimoon">
						https://github.com/ljack/apimoon
					</a>
					https://github.com/ljack/kitchen-templates/
				</p>
			</div>
		</div>
	</div>
);
		}
	}
});
export const PublicLayout = React.createClass({
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
	<div>
		<div id="content" className="sticky-wrapper">
			<div id="navbar" className="navbar navbar-inverse navbar-fixed-top" role="navigation">
				<div className="navbar-container container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
							<span className="sr-only">
								Toggle navigation
							</span>
							<span className="icon-bar">
							</span>
							<span className="icon-bar">
							</span>
							<span className="icon-bar">
							</span>
						</button>
						<a className="navbar-brand" href="#">
							apimoon
						</a>
					</div>
					<div id="menu" className="collapse navbar-collapse">
						<PublicLayoutLeftMenu data={this.data} />
						<PublicLayoutRightMenu data={this.data} />
					</div>
				</div>
			</div>
			<div className="navbar-spacer">
			</div>
			{this.props.content}
		</div>
		<div id="footer" className="sticky-footer">
			<div className="footer-container container">
				<p className="text-muted">
					<a href="https://github.com/ljack/apimoon">
						https://github.com/ljack/apimoon
					</a>
					https://github.com/ljack/kitchen-templates/
				</p>
			</div>
		</div>
	</div>
);
		}
	}
});
export const PublicLayoutLeftMenu = React.createClass({
	render() {
		return (
	<ul id="menu-items" className="nav navbar-nav">
		<li id="menu-item-simple" className={menuItemClass('home_public')}>
			<a href={pathFor('home_public')}>
				<span className="item-title">
					Home
				</span>
			</a>
		</li>
	</ul>
);
	}
});
export const PublicLayoutRightMenu = React.createClass({
	render() {
		return (
	<ul id="menu-items" className="nav navbar-nav navbar-right">
		<li id="menu-item-simple" className={menuItemClass('register')}>
			<a href={pathFor('register')}>
				<span className="item-title">
					Register
				</span>
			</a>
		</li>
		<li id="menu-item-simple" className={menuItemClass('login')}>
			<a href={pathFor('login')}>
				<span className="item-title">
					Login
				</span>
			</a>
		</li>
	</ul>
);
	}
});
export const PrivateLayout = React.createClass({
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
	<div>
		<div id="content" className="sticky-wrapper">
			<div id="navbar" className="navbar navbar-default navbar-fixed-top" role="navigation">
				<div className="navbar-container container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
							<span className="sr-only">
								Toggle navigation
							</span>
							<span className="icon-bar">
							</span>
							<span className="icon-bar">
							</span>
							<span className="icon-bar">
							</span>
						</button>
						<a className="navbar-brand" href="#">
							apimoon
						</a>
					</div>
					<div id="menu" className="collapse navbar-collapse">
						<PrivateLayoutLeftMenu data={this.data} />
						<PrivateLayoutRightMenu data={this.data} />
					</div>
				</div>
			</div>
			<div className="navbar-spacer">
			</div>
			{this.props.content}
		</div>
		<div id="footer" className="sticky-footer">
			<div className="footer-container container">
				<p className="text-muted">
					<a href="https://github.com/ljack/apimoon">https://github.com/ljack/apimoon</a> https://github.com/ljack/kitchen-templates/
				</p>
			</div>
		</div>
	</div>
);
		}
	}
});
export const PrivateLayoutLeftMenu = React.createClass({
	render() {
		return (
	<ul id="menu-items" className="nav navbar-nav">
		<li id="menu-item-simple" className={menuItemClass('home_private')}>
			<a href={pathFor('home_private')}>
				<span className="item-title">
					Home
				</span>
			</a>
		</li>
		<li id="menu-item-simple" className={menuItemClass('apimoons_page')}>
			<a href={pathFor('apimoons_page')}>
				<span className="item-title">
					My Apimoons
				</span>
			</a>
		</li>
		<li id="menu-item-simple" className={menuItemClass('pagetodos')}>
			<a href={pathFor('pagetodos')}>
				<span className="item-title">
					Todos
				</span>
			</a>
		</li>
	</ul>
);
	}
});
export const PrivateLayoutRightMenu = React.createClass({
	render() {
		return (
	<ul id="menu-items" className="nav navbar-nav navbar-right">
		<li id="menu-item-dropdown" className="dropdown ">
			<a href="#" className="dropdown-toggle" data-toggle="dropdown">
				<span className="item-title">
					{userEmail()}
				</span>
				<b className="caret">
				</b>
			</a>
			<ul id="menu-items" className="dropdown-menu">
				<li className={menuItemClass('user_settings')}>
					<a href={pathFor('user_settings')}>
						<span className="item-title">
							Settings
						</span>
					</a>
				</li>
				<li className={menuItemClass('logout')}>
					<a href={pathFor('logout')}>
						<span className="item-title">
							Logout
						</span>
					</a>
				</li>
			</ul>
		</li>
	</ul>
);
	}
});
