/**
 * Notie - Clean and simple notification, input, and selection suite.
 */
import { alert, hideAlerts } from 'notie';

export function error(text) {
  alert({ type: 'error', text });
}

export function success(text) {
  alert({ type: 'success', text });
}

export function clearAll() {
  hideAlerts();
}
