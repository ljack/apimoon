import t from 'tcomb-form'
import {
  Todos as MyCollection
}
from "/lib/collections/todos.js";
// this file should be generated from the application JSON

// see server.js for a example Apimoons.insert clauses which should match with this schema

// https://github.com/gcanti/tcomb-form/blob/master/GUIDE.md



// Import with  import FormSchema from "schema-apimoon.js";
export default function() {
  
  // this is like join field sharedTo: "users.profile.name" of type array in collection todos
  // displayHelper is in columns-todo.jsx
  var values = {};
  Meteor.users.find().fetch().map((user) => {
    values[user._id] = user.profile.name;
  });

  var User=t.Object("User");
  var Users = t.enums(values, "Users");
  
   
  var Schema = t.struct({
    _id: t.maybe(t.String),
    name: t.String, // a required string
    owner: t.maybe(User),
    sharedTo: t.list(Users),
    done: t.Boolean

  });

  return Schema;
}
