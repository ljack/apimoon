import {
	Users
}
from "meteor-user-roles";
import {
	Apimoons
}
from "/lib/collections/apimoons.js";
import {
	Todos
}
from "/lib/collections/todos.js";


import {
	ApimoonTests
}
from "/lib/collections/apimoon-tests.js";

Meteor.startup(function() {

	console.log("Client startup running at " + new Date().toISOString());
	// read environment variables from Meteor.settings
	if (Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
		for (var variableName in Meteor.settings.env) {
			process.env[variableName] = Meteor.settings.env[variableName];
		}
	}

	// A hack to create Collections global which can be accessed on the browser easily

	MyCollections = {};
	MyCollections.Apimoons = Apimoons;
	MyCollections.Todos = Todos;
	MyCollections.ApimoonTests = ApimoonTests;
	console.log(MyCollections);

	let args = {
		userIn: Meteor.userId(),
		date: new Date(),
		event: "login"
	};
	Meteor.call("connection_status", args);

});
