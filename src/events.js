const slice = Array.prototype.slice;
const dispatcherEvents = new WeakMap();

/**
 * Simple event dispatcher
 */
export class EventDispatcher {

  /**
   * Adds an event listener
   */
  on(type, listener) {
    getEventListeners(this, type).add(listener);
  }

  /**
   * Removes a previously added event listener
   */
  off(type, listener) {
    getEventListeners(this, type).delete(listener);
  }

  /**
   * Dispatches an event calling all listeners with the given args (minus type).
   */
  dispatchEvent(type /*[, args]*/) {
    var args = slice.call(arguments, 1);
    getEventListeners(this, type).forEach(function(listener) {
      listener.apply(this, args);
    }, this);
    return this;
  }

  /**
   * Dispatches an event but stops on the first listener to return false. Returns true if no listeners cancel the action
   * by returning false. Use for "cancelable" actions to check if they can be performed.
   */
  dispatchEventCheck(type /*[, args]*/) {
    var args = slice.call(arguments, 1);
    return Array.from(getEventListeners(this, type).values()).every(function(listener) {
      return listener.apply(this, args) !== false;
    }, this);
  }
}


/**
 * Get the listeners for the given object by the given event type.
 */
function getEventListeners(obj, type) {
  var events = dispatcherEvents.get(obj);
  if (!events) {
    events = {};
    dispatcherEvents.set(obj, events);
  }
  if (!events.hasOwnProperty(type)) {
    events[type] = new Set();
  }
  return events[type];
}
