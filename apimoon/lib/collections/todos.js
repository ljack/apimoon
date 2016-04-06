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

Schemas = this.Schemas || {};


Schemas.Todos_string = {
	name: {
		label: "Name",
		type: String,
		optional: true
	},
	done: {
		label: "Done",
		type: Boolean,
		optional: true
	},
	"owner.name": {
		label: "Owner",
		type: String,
		optional: true
	}
};
Schemas.Todos = new SimpleSchema({
	name: {
		label: "Name",
		type: String,
		optional: true
	},
	done: {
		label: "Done",
		type: Boolean,
		optional: true
	},
	"owner.name": {
		label: "Owner",
		type: String,
		optional: true
	}
});

/*  Schemas.Todos = {
	name: {
		label: "Name",
		type: String,
		optional: true
	},
	done: {
		label: "Done",
		type: Boolean,
		optional: true
	},
	"owner.name": {
		label: "Owner",
		type: String,
		optional: true
	}
};
*/
// for now dont attach the schema
//Todos.attachSchema(Schemas.Todos);
