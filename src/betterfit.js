var React = require('react'),
	mui = require('material-ui'),
	RaisedButton = mui.RaisedButton,
  IconButton = mui.IconButton,
  AppBar = mui.AppBar,
  Tabs = mui.Tabs,
  Tab = mui.Tab,
  StudioNav = require('./components/StudioNav.jsx');

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

var ScheduleBox = React.createClass({
	render: function() {
		console.log(this.props);
		//console.log(this.getParams().studio);
		return (
			<div className ="scheduleBox">
				<h1>Schedule for {this.props.data.studio}</h1>
				<ScheduleList data={this.props.data.days[0].scheduleItems}/>
			</div>		
		);
	}
});

var ScheduleForm = React.createClass({
	render: function() {
		return (
			<div>
				Hello, I am a ScheduleForm!
			</div>
		);
	}
});


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

var Dashboard = React.createClass({
	render: function() {
		return (
			<div>
			 Hello Dashboard!
			</div>
		);
	}
});

var StudioLink = React.createClass({
	render: function() {
		var target = "/studio/" + this.props.studio;
		return (
			<span><Link to={target}>{this.props.studio}</Link></span>
		);
	}
});

var DayLink = React.createClass({
	render: function() {
		var target = "/studio/" + this.props.studio + "/day/" + this.props.day;
		return (
			<span><Link to={target}>{this.props.day}</Link></span>
		);
	}
});


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