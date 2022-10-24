interface IQueueEvent {
  data: any;
  uid: number | string;
  ts: number;
}

const EventsQueue = (function () {
  'use strict';

  let _eventsQueue: any = [];

  return {
    enqueue(q: IQueueEvent) {
      _eventsQueue.push(q);
    },
    dequeue() {
      if (_eventsQueue.length == 0) return;
      return _eventsQueue.pop();
    },
    isEmpty() {
      return _eventsQueue.length === 0;
    },
    size() {
      return _eventsQueue.length;
    },
    clear() {
      _eventsQueue = [];
    },
  };
})();

export default EventsQueue;
