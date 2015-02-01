var React = require('react'),
  Router = require('react-router'),
  mui = require('material-ui'),
  Tabs = mui.Tabs,
  Tab = mui.Tab;

  var DayNav = React.createClass({
    mixins: [Router.Navigation, Router.State],
    render: function() {
      return (
        <Tabs>
          <Tab 
            label="Monday"
            route="monday"
            onActive={this._onActive}
        />
        <Tab 
          label="Tuesday"
          route="tuesday"
          onActive={this._onActive}
        />
        <Tab 
          label="Wednesday"
          route="wednesday"
          onActive={this._onActive}
        />
        <Tab 
          label="Thursday"
          route="thursday"
          onActive={this._onActive}
        />
        <Tab 
          label="Friday"
          route="friday"
          onActive={this._onActive}
        />
        <Tab 
          label="Saturday"
          route="saturday"
          onActive={this._onActive}
        />
        <Tab 
          label="Sunday"
          route="sunday"
          onActive={this._onActive}
        />
      </Tabs>
		);
	},

  _onActive: function(tab){ 
    this.transitionTo("/studio/" + this.props.studio + "/day/" + tab.props.route); 
  }
});

module.exports = DayNav;