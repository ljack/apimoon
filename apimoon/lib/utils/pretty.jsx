import React from "react";
import Highlight from 'react-highlight';

export default React.createClass({
    getDefaultProps() {
      return {
          title: "Pretty Debug",
          language: "JSON"
      }  
    },
    style: {
        backgroundColor: '#1f4662',
        color: '#fff',
        fontSize: '12px',
    },

    headerStyle: {
        backgroundColor: '#193549',
        padding: '5px 10px',
        fontFamily: 'monospace',
        color: '#ffc600',
    },

    preStyle: {
        display: 'block',
        padding: '10px 30px',
        margin: '0',
        overflow: 'scroll',
    },

    getInitialState() {
        return {
            show: true,
        };
    },

    toggle() {
        this.setState({
            show: !this.state.show,
        });
    },

    render() {
        return (
            <div style={this.style}>
                <div style={this.headerStyle} onClick={ this.toggle }>
                    <strong>{this.props.title}</strong>
                </div>
                {( this.state.show ?
                    <Highlight className={this.props.language}>
                        {JSON.stringify(this.props.data, null, 2) }
                    </Highlight> : false )}
            </div>
        );
    }
});
