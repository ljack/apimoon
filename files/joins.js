// Todos
import {Todos as Todos} from "/lib/collections/todos.js";
import {Meteor } from 'meteor/meteor';

// Todos
Todos.join(Meteor.Users, "ownerId", "owner", []);

