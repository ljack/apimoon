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

Schemas = this.Schemas || {};


Schemas.Apimoons_string = {
	name: {
		label: "Name",
		type: String,
		optional: true
	},
	left: {
		label: "Name",
		type: String,
		optional: true
	},
	middle: {
		label: "Middle",
		type: String,
		optional: true
	},
	right: {
		label: "Name",
		type: Object,
		blackbox: true,
		optional: true
	},
	common: {
		label: "Name",
		type: String,
		optional: true
	}
};
Schemas.Apimoons = new SimpleSchema({
	name: {
		label: "Name",
		type: String,
		optional: true
	},
	left: {
		label: "Name",
		type: String,
		optional: true
	},
	middle: {
		label: "Middle",
		type: String,
		optional: true
	},
	right: {
		label: "Name",
		type: Object,
		blackbox: true,
		optional: true
	},
	common: {
		label: "Name",
		type: String,
		optional: true
	}
});

/*  Schemas.Apimoons = {
	name: {
		label: "Name",
		type: String,
		optional: true
	},
	left: {
		label: "Name",
		type: String,
		optional: true
	},
	middle: {
		label: "Middle",
		type: String,
		optional: true
	},
	right: {
		label: "Name",
		type: Object,
		blackbox: true,
		optional: true
	},
	common: {
		label: "Name",
		type: String,
		optional: true
	}
};
*/
// for now dont attach the schema
//Apimoons.attachSchema(Schemas.Apimoons);
