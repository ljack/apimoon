import t from 'tcomb-form'

// this file should be generated from the application JSON

// see server.js for a example Apimoons.insert clauses which should match with this schema

// https://github.com/gcanti/tcomb-form/blob/master/GUIDE.md



// Import with  import FormSchema from "schema-apimoon.js";
export default function() {
  const ApiClientSchema = t.struct({
    _id: t.maybe(t.String),
    name: t.String,
    url: t.String, // a required string
    method: t.enums.of("GET POST DELETE PUT"),
    params: t.maybe(t.list(t.String)),
    lastResult: t.maybe( t.String),
    runFromServer: t.Boolean,
  });
  return ApiClientSchema;
}