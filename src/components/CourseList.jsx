'use strict';

var React = require('react'),
  Router = require('react-router'),
  mui = require('material-ui'),
  ListItem = require('./ListItem.jsx');


var CourseList = React.createClass({
  mixins: [Router.Navigation, Router.State],
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
    console.log('courselist: ');
    console.log(this.state.courseList);
    if (this.state.courseList) {
      var listItems = this.state.courseList.map(function(course) {
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

  getInitialState: function () {
    console.log('hello initital state');

    var testdata = {
      courseList: ['one', 'two', 'three', 'four']
    };

    return testdata;
  },

  componentDidMount: function () {
    console.log('courselist mounted!');
    console.log('state:');
    console.log(this.state);
  }
});

module.exports = CourseList;
