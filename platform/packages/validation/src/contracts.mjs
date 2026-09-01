const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const isNonEmptyString = (value) => typeof value === 'string' && value.length > 0;
const isDateTime = (value) => isNonEmptyString(value) && !Number.isNaN(Date.parse(value));

export function validateApiResult(value) {
  const errors = [];
  if (!isObject(value)) return { valid: false, errors: ['result must be an object'] };
  if (typeof value.ok !== 'boolean') errors.push('ok must be boolean');
  if (!isNonEmptyString(value.requestId)) errors.push('requestId must be non-empty string');
  if (!isDateTime(value.timestamp)) errors.push('timestamp must be ISO-compatible date-time');
  if (value.ok === true && !Object.hasOwn(value, 'data')) errors.push('successful result must contain data');
  if (value.ok === false) {
    if (!isObject(value.error)) errors.push('failed result must contain error object');
    else {
      if (!isNonEmptyString(value.error.code)) errors.push('error.code must be non-empty string');
      if (!isNonEmptyString(value.error.message)) errors.push('error.message must be non-empty string');
    }
  }
  return { valid: errors.length === 0, errors };
}

export function validateEventEnvelope(value) {
  const errors = [];
  if (!isObject(value)) return { valid: false, errors: ['event must be an object'] };
  if (!isNonEmptyString(value.eventId)) errors.push('eventId must be non-empty string');
  if (!isNonEmptyString(value.type)) errors.push('type must be non-empty string');
  if (!Number.isInteger(value.version) || value.version < 1) errors.push('version must be integer >= 1');
  if (!isDateTime(value.occurredAt)) errors.push('occurredAt must be ISO-compatible date-time');
  if (!isNonEmptyString(value.producer)) errors.push('producer must be non-empty string');
  if (!Object.hasOwn(value, 'payload')) errors.push('payload is required');
  return { valid: errors.length === 0, errors };
}
