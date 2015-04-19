'use strict';

var Reflux = require('reflux');
var PouchDB = require('pouchdb');

var actions = require('../actions/actions.js');

module.exports = Reflux.createStore({

	listenables: actions,

	init: function () {
		this.localDB = new PouchDB('betterfit_local');
		console.log('hello reflux store!');
		console.log('store actions:');
		console.log(actions);
		this.localDB.allDocs(
			{
				include_docs: true,
				descending: true
			},

			function (err, doc) {
				if (err) {
					console.log('error getting db data: ' + err);
				} else{
					console.log('db data upon init:');
					console.log(doc);
				}
			}
		);
		this.i = 0;
	},

	getInitialState: function () {
		return {
			counter: this.i
		};
	},

	onUpdateAction: function () {
		console.log('onUpdateDB store function');

		var remoteDB = new PouchDB('http://127.0.0.1:5984/betterfit_test');
		this.localDB.replicate.from(remoteDB);
		remoteDB.info().then(function (info) {
			console.log('updated db with following data:');
			console.log(info);
		});

		this.i++;
		console.log('updated counter: ' + this.i);

		this.trigger({counter: this.i});
	}
});