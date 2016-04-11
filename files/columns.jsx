import React from "react";
import Pretty from '/lib/utils/pretty.jsx';
import Modal from 'react-modal';

// JSON 
export const JsonComponent = React.createClass({
  getInitialState() {
      return {
        modalIsOpen: this.props.modalIsOpen || false,
      };
    },
    getDefaultProps() {
      return {
        language: "JSON",
        title: "JSON",
        iconCss: "fa fa-info-circle fa-lg",
      };
    },
    show(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.setState({
        modalIsOpen: true
      });
    },
    closeModal() {
      this.setState({
        modalIsOpen: false
      });
    },
    render: function() {
      //console.log("JsonComponent: render this=", this);
      let data = "";
      try {
        if (this.props.rowData.lastResult)
          data = JSON.parse(this.props.rowData.lastResult);
      }
      catch (error) {
        console.log("JsonComponent, JSON.parse, error=", error);
      }
      return (<span>
            <Modal ref="modal" style={CustomStyle}  onRequestClose={this.closeModal} isOpen={this.state.modalIsOpen}>
              <button  className="btn btn-primary" onClick={this.closeModal}>close</button>
              <Pretty data={data} language={this.props.language} title={this.props.title}/> 
            </Modal>
            <span id="json-button" onClick={this.show} className={this.props.iconCss} title={this.props.title}></span>
      </span>);

    }
});

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