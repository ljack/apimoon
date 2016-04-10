import React from "react";
import ReactDOM from "react-dom";
import polyfill from "es6-promise";
import fetch from 'isomorphic-fetch';
import Modal from 'react-modal';
import {
  callRest
}
from '/lib/methods.js'
import {
  Apiclients as PageCollection
}
from "/lib/collections/apiclients.js";

import FormSchema from '/lib/collections/apiclient-schema.js';

import {
  JsonComponent
}
from '/lib/utils/columns.jsx';

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


            var me = this;
            var update = (lastResult) => {
              let id = me.props.rowData._id;
              let values = {};
              values.lastResult = lastResult;
              me.PageCollection.update({
                _id: id
              }, {
                $set: values
              })
            };


            me.PageCollection = PageCollection;
            fetch(this.props.rowData.url, {
                credentials: 'include'
              })
              .then(function(response) {
                if (response.status >= 400) {
                  me.setState({
                    status: "failedToStart"
                  });
                  throw new Error("Bad response from server");
                }
                return response.text();
              }).catch(function(error) {

                console.log("error=", error);
                update(error);
              })
              .then(function(stories) {
                console.log("stories=", stories);
                me.setState({
                  status: "stopped"
                });
                update(stories);

              });
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

const ControlledModal = React.createClass({

  getInitialState() {
      return {
        showModal: false
      };
    },
    getDefaultProps: function() {
      return {
        title: 'default value',
        body: "Content here"
      };
    },
    close() {
      this.setState({
        showModal: false
      });
    },

    open() {
      this.setState({
        showModal: true
      });
    },

    render() {
      return (
        <div>
        <button onClick={this.open}>
          Launch modal
        </button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>{this.props.body}{ this.props.children }</div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
      );
    }
});
const CodeComponent = React.createClass({

  render() {
    console.log("CodeComponent render, this=", this);
    return (<ControlledModal title="Code"> <span>Code coming {this.props.rowData}</span> </ControlledModal>);
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
        hover: "fa fa-2x fa-code"
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
      ReactDOM.render(<CodeComponent rowData={this.props.rowData}/>, document.getElementById('code-component'));
    },
    render: function() {
      console.log("CodeComponent: render this=", this);

      return (
        <span id="code-button" onClick={this.click} onMouseEnter={this.hover} onMouseLeave={this.mouseOut} ><i  className={this.state.hover} /> 
         <span id="code-component"/>
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
      <CodeButton rowData={this.props.rowData} /> <EditComponent rowData={this.props.rowData} /> <DeleteComponent rowData={this.props.rowData} /> <JsonComponent title="lastResult" rowData={ this.props.rowData.lastResult } /> <StartButton rowData={this.props.rowData}/>
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
      if (r != null && r.slice ) return (
        <span>{r.slice(0,80).replace(/\s*/g,"").slice(0,30)+".."}</span>);
      else return <noscript/>;
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
