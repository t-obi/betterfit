'use strict';

var React = require('react'),
  Router = require('react-router'),
  mui = require('material-ui'),
  ListItem = require('./ListItem.jsx'),
  Reflux = require('reflux'),
  dataStore = require('../stores/store.js');


var CourseList = React.createClass({
  mixins: [
    Router.Navigation,
    Router.State,
    Reflux.connect(dataStore, 'data')
  ],

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

    if (this.state.data.plans) {
      console.log('in courselist render, state plans: ');
      console.log(this.state.data.plans);
      var listItems = this.state.data.plans.mitte.map(function(course) {
        return (
          <ListItem title={course} />
          );
      });

      return (
        <div>
          {listItems}
        </div>
        );
    } else{
      return (
        <mui.Paper zDepth={1} style={paperStyle}>
          <p>Hello Courselist</p>
        </mui.Paper>
      );
    }
  },

  componentDidMount: function () {
    console.log('courselist mounted!');
    console.log('state:');
    console.log(this.state);
  }

});

module.exports = CourseList;
