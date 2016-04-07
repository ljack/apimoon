import React from "react";
import {
  Todos as MyCollection
}
from "/lib/collections/todos.js";
import FormSchema from '/lib/collections/schema-todo.js';

// this file should be generated from the application JSON

// used by the the Griddle table
const TableColumns = ["name", "done", "ownerId", "sharedTo", "rowButtons"];



const LookupComponent = React.createClass({
  render: function() {
    let data = this.props.data;
    if (data == null || data == undefined) {
      return (<span>No data</span>);
    }
    // owner[ownerId].name
    let columnName = this.props.metadata.columnName; // e.g. sharedTo
    console.log("LookupComponent columnName=", columnName);
    let rowData = this.props.rowData; // this is json of the row
    console.log("LookupComponent rowData=", rowData);
    console.log("LookupComponent props=", this.props);

    let valuePath = this.props.metadata.valuePath;
    console.log("LookupComponent valuePath=", valuePath);
    let result = "";
    if (valuePath) {
      // http://stackoverflow.com/questions/6393943/convert-javascript-string-in-dot-notation-into-an-object-reference
      if (Array.isArray(data)) {
        let arrayPath = this.props.metadata.arrayPath;
        console.log("arrayPath=", arrayPath);
        for (let di of data) {
          // valuePath=sharedToDoc[]
          try {
            let r = (di+"."+valuePath).split('.').reduce((o, i) => o[i], rowData[arrayPath]);
            result += r+" ";
          }
          catch (exception) {
            console.log(exception);
            result = "Error, WIP ;)";
          }
        }
      }
      else {
        try {
          result = valuePath.split('.').reduce((o, i) => o[i], rowData);
        }
        catch (exception) {
          result = "Error, WIP ;)";
        }
      }
    }
    let schema = FormSchema();
    return (
      <span>
  		{result}
	    </span>
    );
  }
});

// used with ColumnMeta by the Griddle Table to format certain columns
// used to display object.name name part of nested object.
const DotComponent = React.createClass({
  render: function() {
    //console.log("DotComponent: render this=", this);
    return (
      <span>
		{this.props.data.name}
	</span>
    );
  }
});

const ListComponent = React.createClass({
  render: function() {
    // console.log("ListComponent: render this=", this);
    return (
      <span>
  		{this.props.data.toString()}
	</span>
    );
  }
});

const BooleanComponent = React.createClass({
  getInitialState: function() {
    return {
      checked: this.props.data || false,
      inlineEdit: this.props.inlineEdit || true
    };
  },
  render: function() {
    if (this.state.inlineEdit) {
      return (
        <label>
            <input type="checkbox"
              name={this.props.name}
              defaultChecked={this.state.checked}
              onClick={this.handleClick}
              value={this.props.value} />
              {this.props.label}
      </label>);
    }
    else {
      return (this.props.data);
    }

  },
  handleClick: function(e) {
    // e.preventDefault();
    e.stopPropagation();
    const value = e.target.checked;
    this.setState({
      checked: value
    });

    const id = this.props.rowData._id;
    const fieldName = this.props.metadata.columnName;

    let values = {};
    values[fieldName] = value;
    MyCollection.update({
      _id: id
    }, {
      $set: values
    })
  }
});



const ButtonsComponent = React.createClass({
  render: function() {
    // console.log("ButtonsComponent: render this=", this);
    const paddingStyle = {
      leftPadding: "5px"
    };

    return (
      <form className="form-inline" style={paddingStyle}>
      <EditComponent rowData={this.props.rowData} /> <DeleteComponent rowData={this.props.rowData} />
		</form>
    );
  }
});

const DeleteComponent = React.createClass({

  delete(evt) {
      //  console.log("DeleteComponent, evt=", evt);
      evt.preventDefault();
      evt.stopPropagation();
      var id = this.props.rowData._id;
      console.log("DeleteComponent, deleting with id=", id);
      // eh, confirm here ? ;)
      let res = confirm("Really delete");
      if (res == true) {
        DeleteObject(id);
      }
      else {
        // not deleted, huh
      }
      return false;
    },
    render: function() {
      // console.log("DeleteComponent: render this=", this);
      return (
        <span id="delete-button" onClick={this.delete} className="fa fa-trash-o fa-lg" title="Delete">
     {this.props.data}
			</span>
      );
    }
});
const EditComponent = React.createClass({
  edit(evt) {
      //  console.log("EditComponent, evt=", evt);
      //evt.preventDefault();
      //evt.stopPropagation();
      //var id = this.props.rowData._id;
      //const rowData = this.props.rowData;
      //alert("Editing " + JSON.stringify((rowData)));

      //return false;
    },
    render: function() {
      //  console.log("EditComponent: render this=", this);

      return (
        <span id="edit-button" onClick={this.edit} className="fa fa-pencil  fa-lg" title="Edit">{this.props.data}
			</span>
      );
    }
});

// "displayHelpers"
// now register the DotComponent as customComponent for the specified fields
const ColumnMeta = [{
    "columnName": "done",
    "customComponent": BooleanComponent,
    "displayName": "Done"
  }, {
    "columnName": "name",
    "displayName": "Name"
  }, {
    "columnName": "ownerId",
    "valuePath": "owner.profile.name",
    "customComponent": LookupComponent,
    "displayName": "Owner Name"
  }, , {
    "columnName": "sharedTo",
    "customComponent": LookupComponent,
    "valuePath": "profile.name",
    "arrayPath": "sharedToDoc",
    "displayName": "Shared to"
  }, {
    "columnName": "rowButtons",
    "customComponent": ButtonsComponent,
    "displayName": ""
  }

];

// Used by tcomb-form to specify certain things about how the forms looks like
// https://github.com/gcanti/tcomb-form/blob/master/GUIDE.md#list-with-dynamic-items-different-structs-based-on-selected-value
const FormOptions = {
  fields: {
    _id: {
      type: "static",
      label: "ID"
    },
    name: {
      type: "text"
    },
    sharedTo: {
      type: "text"
    }
  }
};

function DeleteObject(id) {

  console.log("Deleting with id=", id);
  let collection = MyCollection;
  let selector = {
    _id: id
  };
  collection.remove(selector);
}


// this is pretty nasty, and totally different for meteor 1.3 with the client stubs and stuff..
function SaveCollection(document) {
  document = JSON.parse(JSON.stringify(document));
  console.log("Saving values=", document);
  let collection = MyCollection;
  let selector = {
    _id: document._id
  };



  if (collection.findOne(selector) != null) {
    delete document._id;
    collection.update(selector, {
      $set: document
    });
  }
  else {
    delete document._id;
    collection.insert(document);
  }

}


// These are needed by the data_view.jsx
export {
  TableColumns as TableColumns, ColumnMeta as ColumnMeta, FormOptions as FormOptions,
  SaveCollection, DeleteObject
};
