import {Meteor} from "meteor/meteor";
import {Todos} from "/lib/collections/todos.js";

Meteor.publish("todos", function() {
	return Todos.publishJoinedCursors(Todos.find({ownerId:this.userId}, {transform:function(doc) {doc.sharedToDoc={}; Meteor.users.find({ _id: doc.ownerId }).map(function(user) { doc.owner = user });  Meteor.users.find({ _id: {'$in': doc.sharedTo}}).map( function(user) {doc.sharedToDoc[user._id]=user; } ); console.log('doc=',doc);return doc;},sort:["name"]}));
});

Meteor.publish("todo", function(todoId) {
	return Todos.publishJoinedCursors(Todos.find({_id:todoId,ownerId:this.userId}, {}));
});

Meteor.publish("todos_empty", function() {
	return Todos.publishJoinedCursors(Todos.find({_id:null,ownerId:this.userId}, {}));
});

