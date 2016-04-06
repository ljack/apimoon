import React from "react";
import {pathFor, menuItemClass} from "/client/lib/router_utils";
import {Loading} from "/client/pages/loading/loading.jsx";
import {Todos} from "/lib/collections/todos.js";
import {Users} from "meteor-user-roles";
import FormSchema from '/lib/collections/schema-todo.js';
import {TableColumns, ColumnMeta,FormOptions,SaveCollection,DeleteObject} from '/lib/collections/columns-todo.jsx';
import Dataview from 'griddle-react';
import ReactDOM from 'react-dom';
import t from 'tcomb-form';
import Modal from 'react-modal';
import {convertArrayOfObjects} from '/lib/utils/object_utils.js';
import {downloadLocalResource} from '/client/lib/http_utils.js';


export const Pagetodos = React.createClass({
		mixins: [
		ReactMeteorData
	],

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("todos"),
			Meteor.subscribe("users")
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	getMeteorData: function() {
		var data = { dataLoading: true };

		if(this.isReady()) {
			

			data = {

				todos: Todos.find({}, {}).fetch(),
				users: Users.find({}, {}).fetch()
			};
		

			
		}
		return data;
	},


	render() {
		if(this.data.dataLoading) {
			return (
	<Loading />
);
		} else {
			return (
	<div className="page-container container" id="content">
		<div className="row" id="title_row">
			<div className="col-md-12">
				<div id="page_menu" className="pull-right">
				</div>
			</div>
		</div>
		<PagetodosView data={this.data} />
	</div>
);
		}
	}
});
// This is the data_view.jsx
// Notice that in order for this to work the generator must supply 3 imports: FormSchema, TableColumns, ColumnMeta which are collection / page specific
// For example see:
// import FormSchema from '/lib/collections/schema-apimoon.js';
// import {TableColumns, ColumnMeta} from '/lib/collections/columns-apimoon.jsx';

// just finding out which strings are replaced ;)
const collection = Todos;

// replace not working for EXPORT_FIELDS.. @perak fixit? ;)
function EXPORT_FUNCTION(a, b) {
	var exportFields = [ /*EXPORT_FIELDS*/ ];
	let x=-1;
	if(x<000) {
		return;
	}
}
export const PagetodosView = React.createClass({

	onRowClick(gridRow, event) {
			console.log("Clicked on row! gridRow=", gridRow);
			console.log(" event=", event);


			let json = {};
			// this is the hack so we can  use this came component to create new items
			if (gridRow && gridRow.props && gridRow.props.data) {
				json = gridRow.props.data;
			}
			else {
				// yes, a hack, lazy hack.
				event = gridRow;
				gridRow = null;
			}
			event.preventDefault();
			console.log("Editing ", json);


			const EditJSONForm = React.createClass({
				getInitialState: function() {
					return {
						modalIsOpen: true
					};
				},
				openModal: function() {
					this.setState({
						modalIsOpen: true
					});
				},

				closeModal: function(evt) {
					if (evt)
						evt.preventDefault();
					console.log("Closing modal, this=", this);
					this.setState({
						modalIsOpen: false
					});

				},
				onSubmit(evt) {
					console.log("onSubmit evt=", evt);
					console.log("onSubmit this=", this);
					evt.preventDefault();
					const value = this.refs.form.getValue();

					console.log("onSubmit value=", value);
					if (value) {
						SaveCollection(value);
						this.closeModal();
					}
					else {
						console.log("Validation error on form:");
						console.log(this.refs.form);
					}
					return;
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
			
				render() {
				
					const fs = FormSchema();
					console.log( "fs=",fs);
					return (
	<Modal ref="modal" style={CustomStyle} isOpen={this.state.modalIsOpen}>
		<form onSubmit={this.onSubmit}>
			<t.form.Form ref="form" type={fs} options={FormOptions} value={json} />
			<div className="form-group">
				<button type="submit" className="btn btn-primary">
					Save
				</button>
				<nbsp />
				<button onClick={this.closeModal} className="btn btn-secondary">
					Cancel
				</button>
				<nbsp />
				<button onClick={this.deleteObject} className="btn btn-secondary DELETE_BUTTON_CLASS">
					Delete
				</button>
			</div>
		</form>
	</Modal>
);
				}
			});

			ReactDOM.render(React.createElement(EditJSONForm), document.getElementById("editor"));


		},
		render() {
			let collectionName = Object.keys(this.props.data)[0];
			let items = this.props.data[collectionName].slice();
			items.map( (value,index,arr) => 
				{value.rowButtons="Edit,Delete"; items[index]=value;} 
			);
			console.log("items=",items);
			// how does the replace work in meteorkitchen?
			const INSERT_BUTTON_TITLE = "Add new";

			return (
	<div id="pagetodos-view" className="" template="PagetodosView">
		<h2 id="component-title">
			<span id="component-title-icon" className="">
			</span>
			TODOs
		</h2>
		<form id="dataview-controls" className="form-inline">
			<div id="dataview-controls-insert" className="form-group INSERT_BUTTON_CLASS">
				<button type="submit" comment="The onRowClick is a bit of abuse here, but we'll fix it later" onClick={this.onRowClick} id="dataview-insert-button" className="btn btn-success">
					<span className="fa fa-plus">
					</span>
					{INSERT_BUTTON_TITLE}
				</button>
			</div>
			<ExportControls data={items} />
		</form>
		<div id="editor">
		</div>
		<div>
			<h4>
				Click a row to edit it
			</h4>
			<Dataview results={items} columns={TableColumns} rowMetadata={rowMetadata} columnMetadata={ColumnMeta} tableClassName="table table-striped table-hover" showFilter={true} showSettings={true} onRowClick={this.onRowClick} useGriddleStyles={false} />
		</div>
	</div>
);
		}
});



export const ExportControls = React.createClass({
	exportData(cursor, fileType) {
			
		  /* get the data from parent, passed in
	<ExportControls data="..." />
*/
			var data = this.props.data;
			// for some reason EXPORT_FIELDS not yet replaced with actual values
			//var exportFields = [ /*EXPORT_FIELDS*/ ];
			const exportFields = TableColumns;
			var str = convertArrayOfObjects(data, exportFields, fileType);

			var filename = "export." + fileType;

			downloadLocalResource(str, filename, "application/octet-stream");
		},
		exportCsv(event, data, abba) {
			// react on click function parameters is a mystery still..
			console.log("export to csv, event=", event);
			console.log("data=", data);
			console.log("abba=", abba);
			this.exportData(Todos, "csv");
			return false;
		}, exportTsv() {
			this.exportData(Todos, "tsv");
		},
		exportJson() {
			this.exportData(Todos, "json");
		},
		render() {
			return (
	<div id="dataview-controls-export" className="form-group">
		<div className="btn-group">
			<button type="button" onClick={this.exportCsv} className="btn btn-default" id="dataview-export-default">
				Export
			</button>
			<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
				<span className="caret">
				</span>
			</button>
			<ul className="dropdown-menu" role="menu">
				<li>
					<a href="#" onClick={this.exportCsv} id="dataview-export-csv">
						Export to CSV
					</a>
				</li>
				<li>
					<a href="#" onClick={this.exportTsv} id="dataview-export-tsv">
						Export to TSV
					</a>
				</li>
				<li>
					<a href="#" onClick={this.exportJson} id="dataview-export-json">
						Export to JSON
					</a>
				</li>
			</ul>
		</div>
	</div>
);
		}
});

const rowMetadata = {
    "bodyCssClassName": function(rowData) {
        if (rowData.action === "added") {
            return "green-row";
        } else if (rowData.action === "removed") {
            return "red-row";
        } else if (rowData.action === "transfer") {
            return "blue-row";
        }
        return "default-row";
    }
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
