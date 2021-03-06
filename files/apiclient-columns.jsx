import React from "react";
import ReactDOM from "react-dom";
import Modal from 'react-modal';
import Codemirror from 'react-codemirror';
import t from 'tcomb-form';
import {callRest} from '/lib/methods.js'

import {Apiclients as PageCollection } from "/lib/collections/apiclients.js";

import FormSchema from '/lib/collections/apiclient-schema.js';

import {JsonComponent,ControlledModal}from '/lib/utils/columns.jsx';

// this file should be generated from the application JSON

// used by the the Griddle table
const ApimoonColumns = ["name", "url", "method", "lastResult", "rowButtons"];

// used with ColumnMeta by the Griddle Table to format certain columns
// used to display object.name name part of nested object.
const DotComponent = React.createClass({
  render: function() {
    //// console.log("DotComponent: render this=", this);
    return (
      <span>
		{this.props.data.name}
	</span>
    );
  }
});

// Component to simulate start/stop failure scenario
const StartButton = React.createClass({

  forward() {
      const baseDelay = 4 * 1000;
      switch (this.state.status) {
        case 'recovering':

          break;
        case 'failedToStart':
          this.setState({
            status: "recovering"
          });
          setTimeout(() => {
            this.setState({
              status: Math.random() < 0.5 ? "stopped" : "started"
            });
          }, baseDelay * Math.random());

          break;
        case 'failedToStop':
          this.setState({
            status: "recovering"
          });
          setTimeout(() => {
            this.setState({
              status: Math.random() < 0.5 ? "stopped" : "started"
            });
          }, baseDelay * Math.random());

          break;

        case 'stopped':
          let id = this.props.rowData._id;
          let values = {};
          values.lastResult = "starting..";
          PageCollection.update({
            _id: id
          }, {
            $set: values
          });

          this.setState({
            status: "starting"
          });

          if (this.props.rowData.runFromServer == true) {
            // http://guide.meteor.com/methods.html#advanced-boilerplate
            callRest.call(this.props.rowData), (err, res) => {
              if (err) {
                alert(err);
                console.log("callRest err=", err);
              }
              else {
                console.log("callRest res=", res);
              }
            };
            this.setState({
              status: "started"
            });
          }
          else {



          }
          break;

        case 'starting':
          break;
        case 'started':
          this.setState({
            status: "stopping"
          });
          setTimeout(() => {
            this.setState({
              status: Math.random() < 0.5 ? "stopped" : "failedToStop"
            });

          }, baseDelay * Math.random());
          break;
        case 'stopping':

          break;
        default:
          this.setState({
            status: "unknown"
          });
      }
    },
    getInitialState() {
      return {
        status: "stopped",
        started: "fa fa-border fa-stop-circle fa-lg",
        starting: "fa fa-hourglass-start fa-spin fa-lg",
        stopping: "fa fa-refresh fa-spin fa-lg",
        stopped: "fa fa-border fa-play fa-lg",
        failedToStop: "fa  fa-border fa-exclamation-triangle fa-lg",
        failedToStart: "fa fa-border fa-exclamation-triangle fa-lg",
        recovering: "fa  fa-lg fa-cog fa-spin"
      }
    },
    toggle(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.forward();
    },
    render: function() {
      const paddingStyle = {
        leftPadding: "5px"
      };

      return (
        <span>
         <span id="start-button" onClick={this.toggle} title={this.state.status}><i  className={this.state[this.state.status]} /> {this.state.status}</span>
      </span>
      );
    }
});

const CodeComponent = React.createClass({
  getInitialState() {
      return {
        modalIsOpen: true
      }
    },
    closeModal() {
      this.setState({
        modalIsOpen: false
      });
    },
    deleteObject(evt) {
      evt.preventDefault();
      console.log("deleteObject, evt=", evt);
      // note that this doesn't allow delete if validation is failing, fixing this later ;)
      const value = this.refs.form.getValue();
      if (value) {
        let id = value._id;
        DeleteObject(id);
        this.closeModal();
      }
      else {
        console.log("Unable to delete.. maybe validation is failing ;)");
      }

    },
    onSubmit(evt) {
      console.log("onSubmit evt=", evt);
      console.log("onSubmit this=", this);
      evt.preventDefault();
      const value = this.refs.form.getValue();

      console.log("onSubmit value=", value);
      if (value) {
        SaveCollection(value);
        // add some sort nice alert message
        console.log("saved")
        // this.closeModal();
      }
      else {
        console.log("Validation error on form:");
        console.log(this.refs.form);
      }
      return;
    },
    render() {
      var options = {
        lineNumbers: true
      };
      return (<ControlledModal  title="Code" showModal={this.state.modalIsOpen} rowData={this.props.rowData}>
    
            <div className="col-md-4"> 
              		<form  onSubmit={this.onSubmit}>
        						<t.form.Form ref="form" type={FormSchema()} options={CodeFormOptions}  value={this.props.rowData}/>
        						<div className="btn-toolbar" role="toolbar">
          							<button type="submit" className="btn btn-primary">Save</button> <nbsp/>
          							<button onClick={this.closeModal} className="btn btn-secondary">Cancel</button> <nbsp/>
          							<button onClick={this.deleteObject} className="btn btn-secondary DELETE_BUTTON_CLASS">Delete</button>
          							<div className="btn-group" role="group"><StartButton rowData={this.props.rowData}/></div>
        						</div>
      						</form>
            </div>
            <div className="col-md-4"> </div>
            <div className="col-md-4"> 
              {this.props.rowData.lastResult}
            </div>
              
              
            </ControlledModal>);
    }
});

const CodeButton = React.createClass({
  componentWillReceiveProps(nextProps) {
    console.log("CodeButton componentWillReceiveProps nextProps=",nextProps);
  },
  getInitialState() {
      return {
        hover: "fa fa-lg fa-code"
      };
    },
    hover() {
      this.setState({
        hover: "fa fa-lg fa-code"
      });
    },
    mouseOut() {
      this.setState({
        hover: "fa fa-lg fa-code"
      });
    },
    click(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      ReactDOM.render(<CodeComponent showModal={true} rowData={this.props.rowData}/>, document.getElementById('code-component'));
    },
    render: function() {
      return (
        <span id="code-button" onClick={this.click} onMouseEnter={this.hover} onMouseLeave={this.mouseOut} ><i  className={this.state.hover} /> 
         <span id="code-component"/>
        </span>
      );

    },
    destroy() {
      console.log("CodeButton destroy, this=", this);
    }
});

const NavigateButton = React.createClass( {
  onClick(evt){
    evt.preventDefault();
    evt.stopPropagation();
    console.log("trying to navigate to..");
    
    FlowRouter.go("/apiclients_page/edit/"+this.props.rowData._id, {apiclientId: this.props.rowData._id} );
    
  },
  render() {
      return (<button onClick={this.onClick} >GO</button>);
  }  
} );

// Component which groups row buttons
const ButtonsComponent = React.createClass({
  render: function() {
    // console.log("ButtonsComponent: render this=", this);
    const paddingStyle = {
      leftPadding: "5px"
    };

    return (
      <form className="form-inline" style={paddingStyle}>
      <NavigateButton rowData={this.props.rowData} targetPage="details/details.jsx"/> <CodeButton rowData={this.props.rowData} /> <EditComponent rowData={this.props.rowData} /> <DeleteComponent rowData={this.props.rowData} /> <JsonComponent title="lastResult" rowData={ this.props.rowData } /> <StartButton rowData={this.props.rowData}/>
		</form>
    );
  }
});

// row button to delete the selected row
const DeleteComponent = React.createClass({

  delete(evt) {
      // console.log("DeleteComponent, evt=", evt);
      evt.preventDefault();
      evt.stopPropagation();
      var id = this.props.rowData._id;
      // console.log("DeleteComponent, deleting with id=", id);
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

// Row button to "edit" the current row
const EditComponent = React.createClass({
  edit(evt) {
      // // console.log("EditComponent, evt=", evt);
      // evt.preventDefault();
      // evt.stopPropagation();
      // var id = this.props.rowData._id;
      // const rowData = this.props.rowData;
      // alert("Editing " + JSON.stringify((rowData)));
      // return false;
    },
    render: function() {
      // console.log("EditComponent: render this=", this);
      return (
        <span id="edit-button" onClick={this.edit} className="fa fa-pencil  fa-lg" title="Edit">{this.props.data}
			</span>
      );
    }
});

//


const ListComponent = React.createClass({
  render: function() {
    const value = this.props.data;
    return (
      <span>
		{ value.toString() }
	</span>
    );
  }
});



// GriddleGriddle ColumnMeta's with some custom components 
const ColumnMeta = [{
    "columnName": "name",
  }, {
    "columnName": "url",
    "displayName": "URL"
  }, {
    "columnName": "method",
  }, {
    "columnName": "lastResult",
    "customComponent": (props) => {
      let r = props.rowData.lastResult;
      let msg = ("" + r).slice(0, 80).replace(/\s*/g, "").slice(0, 30) + "..";
      return (
        <span>{msg}</span>);
    }
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
    }
  }
};

const CodeFormOptions = {
  fields: {
    _id: {
      type: "static",
      label: "ID"
    },
    name: {
      type: "text"
    },
    lastResult: {
      type: "hidden",
      disabled: true
    }
  }
};


function DeleteObject(id) {

  // console.log("Deleting with id=", id);
  let collection = PageCollection;
  let selector = {
    _id: id
  };
  collection.remove(selector);
}



// this is pretty nasty, and totally different for meteor 1.3 with the client stubs and stuff..
function SaveCollection(document) {

  document = JSON.parse(JSON.stringify(document));
  console.log("SaveCollection values=", document);
  let collection = PageCollection;
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
  ApimoonColumns as TableColumns, ColumnMeta as ColumnMeta, FormOptions as FormOptions,
  SaveCollection, DeleteObject
};


const CustomStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content: {
    zIndex: '255',
    position: 'absolute',
    top: '60px', // changed to 60px to get below the top menu
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'

  }
};