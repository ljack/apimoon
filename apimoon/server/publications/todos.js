import {Meteor} from "meteor/meteor";
import {Todos} from "/lib/collections/todos.js";

Meteor.publish("todos", function() {
	return Todos.find({}, {});
});

Meteor.publish("todo", function(todoId) {
	return Todos.find({_id:todoId}, {});
});

Meteor.publish("todos_empty", function() {
	return Todos.find({_id:null}, {});
});

