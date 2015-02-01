var React = require('react'),
	mui = require('material-ui'),
	RaisedButton = mui.RaisedButton,
  IconButton = mui.IconButton,
  AppBar = mui.AppBar,
  StudioNav = require('./components/StudioNav.jsx'),
  Studio = require('./components/Studio.jsx');

var injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

var Router = require('react-router'),
	Route = Router.Route,
	DefaultRoute = Router.DefaultRoute,
	RouteHandler = Router.RouteHandler,
	Link = Router.Link;

var data = {};
data.charlottenburg = require('../plans/charlottenburg.json');
data.friedrichshain = require('../plans/friedrichshain.json');
data.tegel = require('../plans/tegel.json');
data.steglitz = require('../plans/steglitz.json');
data.mitte = require('../plans/mitte.json');
data.potsdam = require('../plans/potsdam.json');
data.köpenick = require('../plans/köpenick.json');

var ScheduleList = React.createClass({
	render: function() {
		console.log(this.props.data);
		var scheduleItems = this.props.data.map(function(scheduleItem) {
			return (
					<ScheduleItem course={scheduleItem.name} startTime={scheduleItem.start}>
						Something Something
					</ScheduleItem>
				);
		});
		return (
				<div className="scheduleList">
					{scheduleItems}
				</div>
			);
	}
});

var ScheduleItem = React.createClass({
	render: function() {
		return (
			<div className="scheduleItem">
				<h2 className="courseTitle">
					{this.props.course}
				</h2>
				{this.props.startTime}
			</div>
		);
	}	
});

var Day = React.createClass({
	mixins: [ Router.State ],
	render: function() {
		console.log("data:");
		console.log(data);

		console.log("studioID:" + this.getParams().studioId);

		var studio = data[this.getParams().studioId];

		console.log("getting data for studio:");
		console.log(studio);

		return (
			<ScheduleBox data={studio}/>
		);
	}
});

var Dashboard = React.createClass({
	render: function() {
		return (
			<div>
			 Hello Dashboard!
			</div>
		);
	}
});

var App = React.createClass({
  
  mixins: [Router.State],

  render: function () {

    var title = 
      this.isActive('studio', {studioId: 'charlottenburg'}) ? 'Charlottenburg' :
      this.isActive('studio', {studioId: 'friedrichshain'}) ? 'Friedrichshain' :
      this.isActive('studio', {studioId: 'tegel'}) ? 'Tegel' :
      this.isActive('studio', {studioId: 'steglitz'}) ? 'Steglitz' :
      this.isActive('studio', {studioId: 'mitte'}) ? 'Mitte' :
      this.isActive('studio', {studioId: 'potsdam'}) ? 'Potsdam' :
      this.isActive('studio', {studioId: 'köpenick'}) ? 'Köpenick' :
      'btrFit';

    var githubButton = (
      <IconButton
        className="github-icon-button"
        icon="mui-icon-github"
        href="https://github.com/callemall/material-ui"
        linkButton={true} />
    );

    return (
      <mui.AppCanvas predefinedLayout={1}>
        <AppBar
          className="mui-dark-theme"
          onMenuIconButtonTouchTap={this._onMenuIconButtonTouchTap}
          title={title}
          zDepth={1}>
          {githubButton}
        </AppBar>
        
        <StudioNav ref="leftNav"/>
        {/* this is the important part */}        
        <RouteHandler/>

      </mui.AppCanvas>
    );
  },
  _onMenuIconButtonTouchTap: function() {
    console.log("hey there!");
    this.refs.leftNav.toggle();
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
  	<Route name="studio" path="studio/:studioId" handler={Studio}>
  		<Route name="day" path="day/:dayOfWeek" handler={Day}/>
  	</Route>
  	<Route name="test" path="/test" handler={Day}/>
    <DefaultRoute handler={Dashboard}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});