'use strict';

var Reflux = require('reflux');
var PouchDB = require('pouchdb');
var Q = require('q');

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
				include_docs: true, //eslint-disable-line
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
		this.studios = [];

	},

	getInitialState: function () {
		return {
			counter: this.i
		};
	},

	onUpdateAction: function () {
		console.log('onUpdateDB store function');

		var context = this;

		var remoteDB = new PouchDB('http://127.0.0.1:5984/betterfit_test');
		this.localDB.replicate.from(remoteDB).on('complete', function(info) {
			console.log('replication done');
			console.log('processing new db data....');

			var dbQueries = [];

			context.localDB.query('studios/list').then(function (result) {
				context.studios = result.rows[0].value;

				for (var i = context.studios.length - 1; i >= 0; i--) {
					var queryString = 'courses/' + context.studios[i].toLowerCase();
					dbQueries.push(context.localDB.query(queryString));
				}

				Q.allSettled(dbQueries).then(function (results) {
					var resultMap = {};
					for (var j = results.length - 1; j >= 0; j--) {
						if (results[j].state === 'fulfilled' && results[j].value.rows[0]) {
							var courses = results[j].value.rows[0].value;
							var studio = results[j].value.rows[0].key.studio;
							resultMap[studio] = courses;
						} else{
							console.log('promise ' + j + ' is NOT fulfilled or result is empty..');
						}
					}

					context.trigger({
						studios: context.studios,
						plans: resultMap
					});
				});
			});
		});
	}

});