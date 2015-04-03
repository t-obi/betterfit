'use strict';
var React = require('react'),
  Router = require('react-router'),
  mui = require('material-ui'),
  CourseList = require('./CourseList.jsx');

  var DayNav = React.createClass({
    mixins: [Router.Navigation, Router.State],
    render: function() {

      var tabs = this.state.days.map(function(day) {
        return (
          <mui.Tab label={day.name} route={day.id} onActive={day.route}>
            <CourseList/>
          </mui.Tab>
          );
      });

      return (
        <mui.Tabs>
          {tabs}
        </mui.Tabs>
      );
    },

    getInitialState: function () {
      return {
        days: [
          {
            id: 'monday',
            name: 'Monday',
            route: this._onActive
          },
          {
            id: 'tuesday',
            name: 'Tuesday',
            route: this._onActive
          },
          {
            id: 'wednesday',
            name: 'Wednesday',
            route: this._onActive
          },
          {
            id: 'thursday',
            name: 'Thursday',
            route: this._onActive
          },
          {
            id: 'friday',
            name: 'Friday',
            route: this._onActive
          },
          {
            id: 'saturday',
            name: 'Saturday',
            route: this._onActive
          },
          {
            id: 'sunday',
            name: 'Sunday',
            route: this._onActive
          }
        ]
      };
    },

    _onActive: function(tab){
      this.transitionTo('/studio/' + this.props.studio + '/day/' + tab.props.route);
    }
});

module.exports = DayNav;
