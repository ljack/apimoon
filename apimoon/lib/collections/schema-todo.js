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
  console.log("inside default function this=", this);
  var users = Meteor.users.find().fetch();
  var array = users.map((user) => {
    let id = user._id;
    return {  value: id, text: user.profile.name };
    
  });
  console.log("array=", array);
    
  var Users = t.enums(array);




  var Schema = t.struct({
    _id: t.maybe(t.String),
    name: t.String, // a required string
    owner: t.maybe(t.String),
    sharedTo: t.list(Users),
    done: t.Boolean

  });

  return Schema;
}
