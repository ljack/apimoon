import {Mongo} from "meteor/mongo";

export const Todos = new Mongo.Collection("todos");

Todos.userCanInsert = function(userId, doc) {
	return true;
};

Todos.userCanUpdate = function(userId, doc) {
	return true;
};

Todos.userCanRemove = function(userId, doc) {
	return true;
};
