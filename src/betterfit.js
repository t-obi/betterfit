var React = require('react'),
	mui = require('material-ui'),
	RaisedButton = mui.RaisedButton,
  IconButton = mui.IconButton,
  AppBar = mui.AppBar;

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
		console.log(this.getParams());
		return (
			<div>
			 Hello {this.getParams().studioId}!
			 <DayNav/>
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
	mixins: [Router.State],
	render: function() {
		return (
			<header>
			  <div className="dayNav">
			  	<DayLink studio={this.getParams().studioId} day="monday"/>
			  	<DayLink studio={this.getParams().studioId} day="tuesday"/>
			  	<DayLink studio={this.getParams().studioId} day="wednesday"/>
			  	<DayLink studio={this.getParams().studioId} day="thursday"/>
			  	<DayLink studio={this.getParams().studioId} day="friday"/>
			  	<DayLink studio={this.getParams().studioId} day="saturday"/>
			  	<DayLink studio={this.getParams().studioId} day="sunday"/>

			  </div>
			  <RouteHandler/>

			</header>
		);
	}
});

var StudioNav = React.createClass({
	render: function() {
		return (
			<header>
			  <div className="studioNav">
			  	<StudioLink studio="charlottenburg"/>
			  	<StudioLink studio="steglitz"/>
			  	<StudioLink studio="mitte"/>
			  	<StudioLink studio="friedrichshain"/>
			  	<StudioLink studio="tegel"/>
			  	<StudioLink studio="potsdam"/>
			  	<StudioLink studio="köpenick"/>
			  </div>
			</header>
		);
	}
});

var App = React.createClass({
  render: function () {
    var title = 'Hello World';
    var githubButton = (
      <IconButton
        className="github-icon-button"
        icon="mui-icon-github"
        href="https://github.com/callemall/material-ui"
        linkButton={true} />
    );

    return (
      <div>
        <AppBar
          className="mui-dark-theme"
          onMenuIconButtonTouchTap={this._onMenuIconButtonTouchTap}
          title={title}
          zDepth={0}>
          {githubButton}
        </AppBar>
        <StudioNav ref="leftNav"/>
        {/* this is the important part */}
        <RouteHandler/>
      </div>
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