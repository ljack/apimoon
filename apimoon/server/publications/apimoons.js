import {Meteor} from "meteor/meteor";
import {Apimoons} from "/lib/collections/apimoons.js";

Meteor.publish("apimoons", function() {
	return Apimoons.find({}, {});
});

Meteor.publish("apimoon", function(apimoonId) {
	return Apimoons.find({_id:apimoonId}, {});
});

Meteor.publish("apimoons_empty", function() {
	return Apimoons.find({_id:null}, {});
});

