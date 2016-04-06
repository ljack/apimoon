import t from 'tcomb-form'
import {Todos as MyCollection } from "/lib/collections/todos.js";
// this file should be generated from the application JSON

// see server.js for a example Apimoons.insert clauses which should match with this schema

// https://github.com/gcanti/tcomb-form/blob/master/GUIDE.md



// Import with  import FormSchema from "schema-apimoon.js";
export default function() {
  console.log("inside default function this=",this );
  var array = [];
  var Users = t.enums.of(array);
  Meteor.call( "getUsers", {} , (err,res) => {
    console.log("err=",err," res=",res);
    if( err ) {
      
    } else {
      array.push(...res);
    }
  });
  
  

  var Schema = t.struct({
    _id: t.maybe(t.String),
    name: t.String, // a required string
    owner: t.maybe(t.String),
    sharedTo: t.list(Users),
    done: t.Boolean

  });
  console.log( JSON.stringify((Schema)));
  return Schema;
}
