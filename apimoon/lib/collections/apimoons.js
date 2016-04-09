import {Mongo} from "meteor/mongo";

export const Apimoons = new Mongo.Collection("apimoons");

Apimoons.userCanInsert = function(userId, doc) {
	return true;
};

Apimoons.userCanUpdate = function(userId, doc) {
	return true;
};

Apimoons.userCanRemove = function(userId, doc) {
	return true;
};
