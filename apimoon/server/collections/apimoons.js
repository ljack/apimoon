import {Apimoons} from "/lib/collections/apimoons.js";

Apimoons.allow({
	insert: function (userId, doc) {
		return Apimoons.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Apimoons.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Apimoons.userCanRemove(userId, doc);
	}
});

Apimoons.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Apimoons.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Apimoons.before.remove(function(userId, doc) {
	
});

Apimoons.after.insert(function(userId, doc) {
	
});

Apimoons.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Apimoons.after.remove(function(userId, doc) {
	
});
