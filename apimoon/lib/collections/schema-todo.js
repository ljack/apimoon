import t from 'tcomb-form'
import {Todos as MyCollection } from "/lib/collections/todos.js";
// this file should be generated from the application JSON

// see server.js for a example Apimoons.insert clauses which should match with this schema

// https://github.com/gcanti/tcomb-form/blob/master/GUIDE.md



// Import with  import FormSchema from "schema-apimoon.js";
export default function() {
  console.log("inside default function this=",this );
  var Users = t.enums.of([]);
  Meteor.call( "getUsers", {} , (err,res) => {
    console.log("err=",err," res=",res);
    if( err ) {
      
    } else {
      
      Users = t.enums.of( res );
    }
  });
  
  


  var Schema = t.struct({
    _id: t.maybe(t.String),
    name: t.String, // a required string
    owner: t.maybe(t.String),
    sharedTo: t.list(Users),
    done: t.Boolean

  });
  return Schema;
}
