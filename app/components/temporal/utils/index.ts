import { Temporal } from "@js-temporal/polyfill";

export const gnDateFn = () => Temporal.Now.zonedDateTimeISO();
export { Temporal }
