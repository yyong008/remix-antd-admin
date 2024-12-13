import * as eventHandlers from "./event-handler";
import * as eventTypes from "./event-type";

import { eventCenter } from "./event-center";

eventCenter.on(eventTypes.USER_AUTHORIZED, eventHandlers.unauthorizedHandler);
eventCenter.on(eventTypes.DATA_ERROR, eventHandlers.dataErrorHandler);

export { eventCenter };
