import React from "react";
import ReactDOM from "react-dom";
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';
import {
  Panel, Button, ButtonToolbar
}
from 'react-bootstrap'

import {
  Apimoons
}
from "/lib/collections/apimoons.js";
import FormSchema from '/lib/collections/apimoon-schema.js';

import {
  JsonComponent, ControlledModal
}
from '/lib/utils/columns.jsx';

// this file should be generated from the application JSON

// used by the the Griddle table
const ApimoonColumns = ["name", "left", "middle", "right", "rowButtons"];

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
          this.setState({
            status: "starting"
          });

          setTimeout(() => {
            this.setState({
              status: Math.random() < 0.5 ? "started" : "failedToStart"
            });
          }, baseDelay * Math.random());

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
        modalIsOpen: true,
        codeLeft: this.props.rowData.left.code,
        codeMiddle: this.props.rowData.middle.code,

        codeRight: this.props.rowData.right.code,

        mode: "javascript",
        readOnly: false
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
        lineNumbers: true,
        readOnly: this.state.readOnly,
        mode: this.state.mode
      };

      return (<ControlledModal  title="Code" showModal={this.state.modalIsOpen} rowData={this.props.rowData}>
              
              <ButtonToolbar >
                <StartButton rowData={this.props.rowData} />
                <Button bsStyle="primary">Save all and start</Button>
                <Button bsStyle="success">Save all</Button>
                
              </ButtonToolbar>
              <br/>
              
              <div className="col-md-4">
                  <Panel header="Code Left / Input / Client " bsStyle="info">
                    	<CodeMirror value={this.state.codeLeft} options={options}/>
                  </Panel>
              </div>
              
              <div className="col-md-4">
                  <Panel header="Code Middle / Schema " bsStyle="info">
                    	<CodeMirror value={this.state.codeMiddle} options={options}/>
                  </Panel>
              </div>
              
              <div className="col-md-4">
                  <Panel header="Code Right / Resolvers / Loaders / Backend" bsStyle="info">
                    	<CodeMirror value={this.state.codeRight} options={options}/>
                  </Panel>
              </div>
              <div className="col-md-12">
                <Panel header="Last Result" bsStyle="info">
                    {this.state.lastResult}
                </Panel>
              </div>
            </ControlledModal>);
    }
});
const CodeButton = React.createClass({

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
      ReactDOM.render(<CodeComponent rowData={this.props.rowData}/>, document.getElementById('code-area'));
    },
    render: function() {
      console.log("CodeComponent: render this=", this);

      return (
        <span id="code-button" onClick={this.click} onMouseEnter={this.hover} onMouseLeave={this.mouseOut} ><i  className={this.state.hover} />
          <div id="code-area"/>
        </span>
      );

    },
    destroy() {
      console.log("CodeButton destroy, this=", this);
      // ReactDOM.unmountComponentAtNode(document.fi);
    }
});

// Component which groups row buttons
const ButtonsComponent = React.createClass({
  render: function() {
    // console.log("ButtonsComponent: render this=", this);
    const paddingStyle = {
      leftPadding: "5px"
    };

    return (
      <form className="form-inline" style={paddingStyle}>
      <CodeButton rowData={this.props.rowData} /> <EditComponent rowData={this.props.rowData} /> <DeleteComponent rowData={this.props.rowData} /> <JsonComponent rowData={this.props.rowData} /> <StartButton rowData={this.props.rowData}/>
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

// now register the DotComponent as customComponent for the specified fields
const ColumnMeta = [{
    "columnName": "left",
    "customComponent": DotComponent
  }, {
    "columnName": "middle",
    "customComponent": DotComponent
  }, {
    "columnName": "right",
    "customComponent": DotComponent
  },

  {

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
    left: {
      fields: {
        code: {
          type: "textarea"
        }
      }
    },
    middle: {
      fields: {
        code: {
          type: "textarea"
        }
      }
    },
    right: {
      fields: {
        code: {
          type: "textarea"
        }
      }
    },
    name: {
      type: "text"
    }
  }
};

function DeleteObject(id) {

  // console.log("Deleting with id=", id);
  let collection = Apimoons;
  let selector = {
    _id: id
  };
  collection.remove(selector);
}


// this is pretty nasty, and totally different for meteor 1.3 with the client stubs and stuff..
function SaveCollection(document) {

  document = JSON.parse(JSON.stringify(document));
  // console.log("Saving values=", document);
  let collection = Apimoons;
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
