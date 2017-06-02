# value-validator.pddivine
A tool to evaluate the validity of a value against a schema.

## Features
* Compares a value against a schema and returns boolean true if it is a match. 
* A schema can describe a string, number, boolean, date, function, null value, undefined value, and any array or object, nested or un-nested. 
* An options attribute in a value's schema allows it to be required, allow null, or passed through a custom callback validation.
* Collections, objects and arrays, can require each element to be the same, or specify what each element should be.

## TLDR;
### Single Values
```javascript
const v2 = require('value-validator.pddivine');

const dateSchema = {
  type: Date,
  options: {
    required: true,
    allowNull: false,
    validation: function (v) { return v === v; }
  }
}

v2('This is a string', dateSchema); // Returns false
v2(null, dateSchema); // Returns false
v2(new Date(), dateSchema); // Returns true

```
### Collections

#### Objects

```javascript
const objectSchema = {
  type: Object,
  options: {
    required: true,
    allowNull: false,
    validation: undefined
  },
  schema: {
    keyA: {
      type: String,
      options: {
        required: true,
        allowNull: false,
        validation: undefined
      }
    },
    keyB: {
      type: Number,
      options: {
        required: true,
        allowNull: false,
        validation: undefined
      }
    },
    keyC: {
      type: Boolean,
      options: {
        required: true,
        allowNull: false,
        validation: undefined
      }
    }
  }
}

v2( { keyA: '', keyB: 500, keyC: 'should be boolean' }, objectSchema ); // Returns false
v2( { keyA: '', keyB: 500, keyC: null }, objectSchema ); // Returns false
v2( { keyA: '', keyB: 500, keyC: true }, objectSchema ); // Returns true

```

#### Arrays
```javascript
const arraySchema = {
  type: Array,
  options: {
    required: true,
    allowNull: false,
    validation: undefined
  },
  schema: {
    type: String,
    options: {
      required: true,
      allowNull: false,
      validation: undefined
    }
  }
}
v2( [ 'string', 500, true ], arraySchema ); // Returns false
v2( [ 'string', 500, false ], arraySchema ); // Returns false
v2( [ 'string', 'string', 'string' ], arraySchema ); // Returns true

```
#### Nested Collections
```javascript
// An array of objects with name and address keys.
const nestedCollectionSchema = {
  type: Array,
  options: {
    required: true,
    allowNull: false,
    validation: undefined
  },
  schema: {
    type: Object,
    options: {
      required: true,
      allowNull: false,
      validation: undefined
    },
    schema: {
      name: {
        type: String,
        options: {
          required: true,
          allowNull: false,
          validation: undefined
        }
      },
      age: {
        type: Number,
        options: {
          required: true,
          allowNull: false,
          validation: undefined
        }
      }
    }
  }
}

v2( [ { name: 'Patrick', age: 31 }, { name: 'Patti', age: `I won't say` } ], nestedCollectionSchema ); // Returns false
v2( [ { name: 'Patrick', age: 31 }, { name: 'Patti', age: undefined } ], nestedCollectionSchema ); // Returns false
v2( [ { name: 'Patrick', age: 31 }, { name: 'Patti', age: 30 } ], nestedCollectionSchema ); // Returns true

```