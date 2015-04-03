'use strict';

var React = require('react'),
  mui = require('material-ui');


var ListItem = React.createClass({
  render: function() {
    var paperStyle = {
      //padding: '20px',
      //margin: '20px',
      //display: 'inline-block',
      //align: 'center',
      marginTop: '10px',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '420px',
      textAlign: 'center'
    };
    return (
      <mui.Paper zDepth={1} style={paperStyle}>
        <p>{this.props.title}</p>
      </mui.Paper>
    );
  }
});

module.exports = ListItem;
