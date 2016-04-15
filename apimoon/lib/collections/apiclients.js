import {Mongo} from "meteor/mongo";

export const Apiclients = new Mongo.Collection("apiclients");

Apiclients.userCanInsert = function(userId, doc) {
	return true;
};

Apiclients.userCanUpdate = function(userId, doc) {
	return true;
};

Apiclients.userCanRemove = function(userId, doc) {
	return true;
};
