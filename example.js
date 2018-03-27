"use strict";

const EventDispatcher = require('./event_dispatcher.js').eventDispatcher;
var eventDispatcher = new EventDispatcher();

eventDispatcher.addEventListener('user.created', function(eventData, ed) {
  console.log('Send confirmation email');
});

eventDispatcher.addEventListener('user.created', function(eventData, ed) {
  console.log('Synchronize DynamoDB user data');
}, 100);

eventDispatcher.dispatch('user.created', {
  username: 'Ted',
  password: 'dsjh655gjgdhgsjds'
});
