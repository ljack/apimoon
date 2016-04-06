import React from "react";
import {mount} from "react-mounter";
import {Layout} from "/client/pages/layout/layout.jsx";
import {NotFound} from "/client/pages/not_found/not_found.jsx";
import {HomePublic} from "/client/pages/home_public/home_public.jsx";
import {Login} from "/client/pages/login/login.jsx";
import {Register} from "/client/pages/register/register.jsx";
import {ForgotPassword} from "/client/pages/forgot_password/forgot_password.jsx";
import {ResetPassword} from "/client/pages/reset_password/reset_password.jsx";
import {Pagetodos} from "/client/pages/pagetodos/pagetodos.jsx";
/*IMPORTS*/

Tracker.autorun(function() {
	var userId = Meteor.userId();
	var user = Meteor.user();
	if(userId && !user) {
		return;
	}

	var currentContext = FlowRouter.current();
	var route = currentContext.route;
	if(route) {
		if(user) {
			if(route.group.name == "public") {
				FlowRouter.reload();
			}
		} else {
			if(route.group.name == "private") {
				FlowRouter.reload();
			}
		}
	}
});

const publicRouteNames = [
	"home_public",
	"login",
	"register",
	"forgot_password",
	"reset_password"
];

const privateRouteNames = [
	"pagetodos",
	"pagetodos.insert",
	"pagetodos.details",
	"pagetodos.edit",
	"home_private",
	"apimoons_page",
	"apimoons_page.insert",
	"apimoons_page.details",
	"apimoons_page.edit",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass",
	"logout"
];

const freeRouteNames = [
	
];

const roleMap = [
	
];

const firstGrantedRoute = function(preferredRoute) {
	if(preferredRoute && routeGranted(preferredRoute)) return preferredRoute;

	var grantedRoute = "";

	_.every(privateRouteNames, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	_.every(publicRouteNames, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	_.every(freeRouteNames, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	if(!grantedRoute) {
		console.log("All routes are restricted for current user.");
		return "notFound";
	}

	return "";
};

// this function returns true if user is in role allowed to access given route
const routeGranted = function(routeName) {
	if(!routeName) {
		// route without name - enable access (?)
		return true;
	}

	if(!roleMap || roleMap.length === 0) {
		// this app doesn't have role map - enable access
		return true;
	}

	var roleMapItem = _.find(roleMap, function(roleItem) { return roleItem.route == routeName; });
	if(!roleMapItem) {
		// page is not restricted
		return true;
	}

	if(!Meteor.user() || !Meteor.user().roles) {
		// user is not logged in or doesn't have "role" member
		return false;
	}

	// this page is restricted to some role(s), check if user is in one of allowedRoles
	var allowedRoles = roleMapItem.roles;
	var granted = _.intersection(allowedRoles, Meteor.user().roles);
	if(!granted || granted.length === 0) {
		return false;
	}

	return true;
};

const freeRoutes = FlowRouter.group({
	name: "free",
	triggersEnter: [
		function(context, redirect, stop) {
			if(!routeGranted(context.route.name)) {
				// user is not in allowedRoles - redirect to first granted route
				var redirectRoute = firstGrantedRoute("");
				redirect(redirectRoute);
			}
		}
	]
});

const publicRoutes = FlowRouter.group({
	name: "public",
	triggersEnter: [
		function(context, redirect, stop) {
			if(Meteor.user()) {
				var redirectRoute = firstGrantedRoute("home_private");
				redirect(redirectRoute);
			}
		}
	]
});

const privateRoutes = FlowRouter.group({
	name: "private",
	triggersEnter: [
		function(context, redirect, stop) {
			if(!Meteor.user()) {
				// user is not logged in - redirect to public home
				var redirectRoute = firstGrantedRoute("home_public");
				redirect(redirectRoute);
			} else {
				// user is logged in - check role
				if(!routeGranted(context.route.name)) {
					// user is not in allowedRoles - redirect to first granted route
					var redirectRoute = firstGrantedRoute("home_private");
					redirect(redirectRoute);
				}
			}
		}
	]
});

FlowRouter.notFound = {
	action () {
		mount(Layout, {
			content: (<NotFound />)
		});
	}
};

publicRoutes.route("/", {
    name: "home_public",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	mount(Layout, {
			content: (
				<HomePublic />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

publicRoutes.route("/login", {
    name: "login",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	mount(Layout, {
			content: (
				<Login />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

publicRoutes.route("/register", {
    name: "register",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	mount(Layout, {
			content: (
				<Register />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

publicRoutes.route("/forgot_password", {
    name: "forgot_password",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	mount(Layout, {
			content: (
				<ForgotPassword />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

publicRoutes.route("/reset_password/:resetPasswordToken", {
    name: "reset_password",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	mount(Layout, {
			content: (
				<ResetPassword />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/pagetodos", {
    name: "pagetodos",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	mount(Layout, {
			content: (
				<Pagetodos />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});
