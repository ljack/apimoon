import {Apiclients} from "/lib/collections/apiclients.js";

Apiclients.allow({
	insert: function (userId, doc) {
		return Apiclients.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Apiclients.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Apiclients.userCanRemove(userId, doc);
	}
});

Apiclients.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Apiclients.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Apiclients.before.remove(function(userId, doc) {
	
});

Apiclients.after.insert(function(userId, doc) {
	
});

Apiclients.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Apiclients.after.remove(function(userId, doc) {
	
});
