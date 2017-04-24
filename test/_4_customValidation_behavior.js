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
  schema_returnTrue: {
    array: {
      type: Array,
      options: {
        required: true,
        allowNull: false,
        validation: function (v) { return v === v; }
      }
    },
    boolean: {
      type: Boolean,
      options: {
        required: true,
        allowNull: false,
        validation: function (v) { return v === v; }
      }
    },
    date: {
      type: Date,
      options: {
        required: true,
        allowNull: false,
        validation: function (v) { return v === v; }
      }
    },
    function: {
      type: Function,
      options: {
        required: true,
        allowNull: false,
        validation: function (v) { return v === v; }
      }
    },
    null: {
      type: null,
      options: {
        required: true,
        allowNull: true,
        validation: function (v) { return v === v; }
      }
    },
    number: {
      type: Number,
      options: {
        required: true,
        allowNull: false,
        validation: function (v) { return v === v; }
      }
    },
    object: {
      type: Object,
      options: {
        required: true,
        allowNull: false,
        validation: function (v) { return v === v; }
      }
    },
    string: {
      type: String,
      options: {
        required: true,
        allowNull: false,
        validation: function (v) { return v === v; }
      }
    },
    symbol: {
      type: Symbol,
      options: {
        required: true,
        allowNull: false,
        validation: function (v) { return v === v; }
      }
    },
    undefined: {
      type: undefined,
      options: {
        required: false,
        allowNull: false,
        validation: function (v) { return v === v; }
      }
    }
  },
  schema_returnFalse: {
    array: {
      type: Array,
      options: {
        required: true,
        allowNull: false,
        validation: function (v) { return false; }
      }
    },
    boolean: {
      type: Boolean,
      options: {
        required: true,
        allowNull: false,
        validation: function (v) { return v !== v; }
      }
    },
    date: {
      type: Date,
      options: {
        required: true,
        allowNull: false,
        validation: function (v) { return v !== v; }
      }
    },
    function: {
      type: Function,
      options: {
        required: true,
        allowNull: false,
        validation: function (v) { return v !== v; }
      }
    },
    null: {
      type: null,
      options: {
        required: true,
        allowNull: true,
        validation: function (v) { return v !== v; }
      }
    },
    number: {
      type: Number,
      options: {
        required: true,
        allowNull: false,
        validation: function (v) { return v !== v; }
      }
    },
    object: {
      type: Object,
      options: {
        required: true,
        allowNull: false,
        validation: function (v) { return v !== v; }
      }
    },
    string: {
      type: String,
      options: {
        required: true,
        allowNull: false,
        validation: function (v) { return v !== v; }
      }
    },
    symbol: {
      type: Symbol,
      options: {
        required: true,
        allowNull: false,
        validation: function (v) { return v !== v; }
      }
    },
    undefined: {
      type: undefined,
      options: {
        required: false,
        allowNull: false,
        validation: function (v) { return v !== v; }
      }
    }
  }
}

describe(`The 'value-validator' library`, function () {
  const schemaList = Object.keys(example.schema_returnTrue);
  schemaList.forEach(schemaType => {
    describe(`when testing a/an '${schemaType}' schema with false returning custom validation`, function () {
      it(`should return boolean value 'false'.`, function () {
        expect(v2(example.value[schemaType], example.schema_returnTrue[schemaType])).to.equal(true);
      });
    });
    describe(`when testing a/an '${schemaType}' schema with false returning custom validation`, function () {
      it(`should return boolean value 'false'.`, function () {
        expect(v2(example.value[schemaType], example.schema_returnFalse[schemaType])).to.equal(false);
      });
    });
  });
});