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
  incorrectValue: {
    array: false,
    boolean: 'false',
    date: false,
    function: false,
    null: false,
    number: false,
    object: false,
    string: false,
    symbol: false,
    undefined: false
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
        required: false,
        allowNull: false,
        validation: undefined
      }
    },
    boolean: {
      type: Boolean,
      options: {
        required: false,
        allowNull: false,
        validation: undefined
      }
    },
    date: {
      type: Date,
      options: {
        required: false,
        allowNull: false,
        validation: undefined
      }
    },
    function: {
      type: Function,
      options: {
        required: false,
        allowNull: false,
        validation: undefined
      }
    },
    null: {
      type: null,
      options: {
        required: false,
        allowNull: true,
        validation: undefined
      }
    },
    number: {
      type: Number,
      options: {
        required: false,
        allowNull: false,
        validation: undefined
      }
    },
    object: {
      type: Object,
      options: {
        required: false,
        allowNull: false,
        validation: undefined
      }
    },
    string: {
      type: String,
      options: {
        required: false,
        allowNull: false,
        validation: undefined
      }
    },
    symbol: {
      type: Symbol,
      options: {
        required: false,
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
    describe(`when testing a/an '${schemaType}' schema with required set to false`, function () {
      it(`against a/an null value should return boolean value 'true'.`, function () {
        expect(v2(undefined, example.schema[schemaType], {verbose: true}).success).to.equal(true);
      });
    });
    describe(`when testing a/an '${schemaType}' schema with required set to true`, function () {
      it(`against a correct primary value of type '${schemaType}' should return boolean value 'true'.`, function () {
        expect(v2(example.value[schemaType], example.schema[schemaType], {verbose: true}).success).to.equal(true);
      });
    });
    describe(`when testing a/an '${schemaType}' schema with required set to true`, function () {
      it(`against an incorrect primary value should return boolean value 'false'.`, function () {
        expect(v2(example.incorrectValue[schemaType], example.schema[schemaType], {verbose: true}).success).to.equal(false);
      });
    });
  });
});