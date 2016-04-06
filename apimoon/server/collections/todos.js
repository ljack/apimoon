import {Todos} from "/lib/collections/todos.js";

Todos.allow({
	insert: function (userId, doc) {
		return Todos.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Todos.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Todos.userCanRemove(userId, doc);
	}
});

Todos.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Todos.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Todos.before.remove(function(userId, doc) {
	
});

Todos.after.insert(function(userId, doc) {
	
});

Todos.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Todos.after.remove(function(userId, doc) {
	
});
