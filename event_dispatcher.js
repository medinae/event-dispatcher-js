"use strict";

class EventDispatcher
{
    constructor() {
      this.listeners = [];
      this.isPropagationStopped = false;
    }

    addEventListener(eventName, callback, priority) {
      if (typeof eventName !== 'string') {
        throw "Given event name is not a string"
      }

      if (typeof callback !== 'function') {
        throw "Given callback is not a callable callback"
      }

      if ('undefined' === typeof this.listeners[eventName]) {
        this.listeners[eventName] = [];
      }

      this.listeners[eventName].push({
        callback: callback,
        priority: priority || 0
      });

      // make sure listeners are sorted by priority
      this.listeners = this.listeners.sort(function (a, b) {
        return b.priority - a.priority;
      });
    }

    removeEventListenersByEventName(eventName) {
      if ('undefined' === typeof this.listeners[eventName]) {
        // No listeners for this event
        return;
      }

      delete this.listeners[eventName];
    }

    dispatch(eventName, eventData) {
      if ('undefined' === typeof this.listeners[eventName]) {
        // No listeners for this event
        return;
      }

      this.listeners[eventName].some(function(listener, i, _listeners) {
        listener.callback(eventData, this);

        if (this.isPropagationStopped) {
          this.isPropagationStopped = false;

          return true;
        }

        return false;
      }.bind(this));
    }

    stopPropagation() {
      this.isPropagationStopped = true;
    }
}


module.exports.eventDispatcher = EventDispatcher;
