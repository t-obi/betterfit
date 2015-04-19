'use strict';

var React = require('react'),
  Router = require('react-router'),
  mui = require('material-ui'),
  menuItems = [
    {route: '/studio/charlottenburg', text: 'Charlottenburg' },
    {route: '/studio/steglitz', text: 'Steglitz' },
    {route: '/studio/mitte', text: 'Mitte' },
    {route: '/studio/friedrichshain', text: 'Friedrichshain' },
    {route: '/studio/tegel', text: 'Tegel' },
    {route: '/studio/potsdam', text: 'Potsdam' },
    {route: '/studio/köpenick', text: 'Köpenick' }
  ];

var StudioNav = React.createClass({
  mixins: [Router.Navigation, Router.State],

  render: function(){

    var header = <div className="logo" onClick={this._onHeaderClick}>btrFit</div>;

    return (
      <mui.LeftNav
        ref='leftNav'
        header={header}
        docked={false}
        menuItems={menuItems}
        selectedIndex={this._getSelectedIndex()}
        onChange={this._onLeftNavChange} />
    );
  },

  toggle: function() {
    this.refs.leftNav.toggle();
  },

  _getSelectedIndex: function() {
    var currentItem;

    for (var i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.isActive(currentItem.route)) {
        return i;
      }
    }
  },

  _onLeftNavChange: function(e, key, payload) {
    this.transitionTo(payload.route);
  },

  _onHeaderClick: function() {
    this.transitionTo('root');
    this.refs.leftNav.close();
  }
});

module.exports = StudioNav;