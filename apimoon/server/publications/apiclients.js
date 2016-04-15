import {Meteor} from "meteor/meteor";
import {Apiclients} from "/lib/collections/apiclients.js";

Meteor.publish("apiclients", function() {
	return Apiclients.find({}, {});
});

Meteor.publish("apiclient", function(apiclientId) {
	return Apiclients.find({_id:apiclientId}, {});
});

Meteor.publish("apiclients_empty", function() {
	return Apiclients.find({_id:null}, {});
});

