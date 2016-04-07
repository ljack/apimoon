import {Meteor} from "meteor/meteor";
import {Todos} from "/lib/collections/todos.js";

Meteor.publish("todos", function() {
	return Todos.publishJoinedCursors(Todos.find({}, {transform:function(doc) { Meteor.users.find({ _id: doc.ownerId }).map(function(user) { doc.owner = user }); console.log('inside transform=',doc); return doc; },sort:["name"]}));
});

Meteor.publish("todo", function(todoId) {
	return Todos.publishJoinedCursors(Todos.find({_id:todoId}, {}));
});

Meteor.publish("todos_empty", function() {
	return Todos.publishJoinedCursors(Todos.find({_id:null}, {}));
});

