const typeOf = require('typeof.pddivine');

module.exports = _validate;

/**
 * Test the validity of a value given a schema.
 * 
 * @param {any} value
 * @param {object} schema
 * @returns
 */
function _validate (value, schema, options) {
  const verbose = typeOf(options) === Object && !!options.verbose;
  if (!schema) { return false; }
  const valueType = typeOf(value);

  // Handle null allowed
  if ( valueType === null ) {
    if ( schema.options.allowNull ) { return handleValidation(value, schema, verbose); }
  }

  // Handle undefined allowed
  if ( valueType === undefined ) {
    if ( !schema.options.required ) { return handleValidation(value, schema, verbose); }
  }

  // Handle value match
  if ( valueType !== schema.type ) { return _response(false, value, schema, verbose); }

  // Handle object
  if ( schema.schema !== undefined && ( valueType === Object || valueType === Array ) ) {
    const subSchema = schema.schema;
    const isPrototypal = subSchema.type !== undefined && subSchema.options !== undefined;
    // Validate each element
    if (isPrototypal) {
      for ( let elem in value ) {
        const nested = _validate(value[elem], subSchema, {verbose: true});
        if ( !nested.success ) { return _response(false, value[elem], subSchema, verbose); }
      }
    } else {
      // Ensure all schema keys are on value
      for ( let elem in subSchema ) {
        if (value[elem] === undefined) {
          value[elem] = undefined;
        }
      }
      for ( let elem in value ) {
        const nested = _validate(value[elem], subSchema[elem], {verbose: true});
        if ( !nested.success ) { return _response(false, value[elem], subSchema[elem], verbose); }
      }
    }
  }

  return handleValidation(value, schema, verbose);
}

/**
 * Test the validity of a value against a custom function, otherwise is valid.
 * 
 * @param {any} value - Input to be validated.
 * @param {any} schema - Schema which constains the validation function
 * @returns {boolean}
 */
function handleValidation (value, schema, verbose) {
  if ( typeOf(schema.options.validation) !== Function ) { return _response(true, null, null, verbose) };
  return _response(schema.options.validation(value), value, schema, verbose);
}

function _response (success, value, schema, verbose) {
  return verbose ? { success, value, schema } : success;
}