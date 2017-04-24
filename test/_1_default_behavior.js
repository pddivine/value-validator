const { expect } = require('chai');
const root = process.mainModule.paths[0].split('node_modules')[0];
const v2 = require(root);

const example = {
  value: {
    array: [],
    boolean: true,
    date: (new Date()),
    function: function () {},
    null: null,
    number: 0,
    object: {},
    string: '',
    symbol: Symbol(),
    undefined: undefined
  },
  constructor: {
    array: Array,
    boolean: Boolean,
    date: Date,
    function: Function,
    null: null,
    number: Number,
    object: Object,
    string: String,
    symbol: Symbol,
    undefined: undefined
  },
  schema: {
    array: {
      type: Array,
      options: {
        required: true,
        allowNull: false,
        validation: undefined
      }
    },
    boolean: {
      type: Boolean,
      options: {
        required: true,
        allowNull: false,
        validation: undefined
      }
    },
    date: {
      type: Date,
      options: {
        required: true,
        allowNull: false,
        validation: undefined
      }
    },
    function: {
      type: Function,
      options: {
        required: true,
        allowNull: false,
        validation: undefined
      }
    },
    null: {
      type: null,
      options: {
        required: true,
        allowNull: true,
        validation: undefined
      }
    },
    number: {
      type: Number,
      options: {
        required: true,
        allowNull: false,
        validation: undefined
      }
    },
    object: {
      type: Object,
      options: {
        required: true,
        allowNull: false,
        validation: undefined
      }
    },
    string: {
      type: String,
      options: {
        required: true,
        allowNull: false,
        validation: undefined
      }
    },
    symbol: {
      type: Symbol,
      options: {
        required: true,
        allowNull: false,
        validation: undefined
      }
    },
    undefined: {
      type: undefined,
      options: {
        required: false,
        allowNull: false,
        validation: undefined
      }
    }
  }
}

describe(`The 'value-validator' library`, function () {
  const schemaList = Object.keys(example.schema);
  schemaList.forEach(schemaType => {
    describe(`when testing a/an '${schemaType}' schema`, function () {
      schemaList.forEach(valueType => {
        if (schemaType === valueType) {
          return it(`against a/an '${valueType}' value should return boolean value 'true'.`, function () {
            expect(v2(example.value[schemaType], example.schema[schemaType])).to.equal(true);
          });
        }
        describe(`against a/an '${valueType}' value`, function () {
          it(`should return boolean value 'false'.`, function () {
            expect(v2(example.value[valueType], example.schema[schemaType])).to.equal(false);
          });
        });
      });
    });
  });
});