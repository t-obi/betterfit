var React = require('react'),
  Router = require('react-router'),
  mui = require('material-ui'),
  DayNav = require('./DayNav.jsx');

var Studio = React.createClass({
  mixins: [ Router.State ],
  render: function() {
    return (
      <div className="mui-app-content-canvas">
        <DayNav studio={this.getParams().studioId}/>
      </div>
    );
  }
});

module.exports = Studio;
