/**
 * @format
 */
type callBackType = (...args: any[]) => void;
import {userEventsMapInterface} from '../SDKAppWrapper';
import {createNanoEvents} from 'nanoevents';

interface eventsMapInterface extends userEventsMapInterface {
  addFpe?: callBackType;
  addFpeInit?: () => void;
  joinMeetingWithPhrase?: (
    phrase: string,
    resolve: () => void,
    reject: (e: Error) => void,
  ) => void;
}

const SDKEvents = createNanoEvents<eventsMapInterface>();

export default SDKEvents;
