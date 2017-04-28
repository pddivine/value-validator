const { expect } = require('chai');
const root = process.mainModule.paths[0].split('node_modules')[0];
const v2 = require(root);

const example = {
  value: {
    object_depth_1_string_continuous: {
      a: '',
      b: '',
      c: '',
      d: ''
    },
    object_depth_1: {
      a: '',
      b: 1,
      c: true,
      d: null
    },
    object_depth_2_string_continuous: {
      a: {
        a: '',
        b: '',
        c: '',
        d: ''
      },
      b: {
        a: '',
        b: '',
        c: '',
        d: ''
      },
      c: {
        a: '',
        b: '',
        c: '',
        d: ''
      },
      d: {
        a: '',
        b: '',
        c: '',
        d: ''
      }
    },
    object_depth_3_string_continuous: {
      a: {
        a: {
          a: '',
          b: '',
          c: '',
          d: ''
        }
      },
      b: {
        a: {
          a: '',
          b: '',
          c: '',
          d: ''
        }
      },
      c: {
        a: {
          a: '',
          b: '',
          c: '',
          d: ''
        }
      },
      d: {
        a: {
          a: '',
          b: '',
          c: '',
          d: ''
        }
      }
    }
  },
  value_false: {
    object_depth_1_string_continuous: {
      a: '',
      b: '',
      c: '',
      d: 1
    },
    object_depth_1: {
      a: '',
      b: 1,
      c: true,
      d: 'null'
    },
    object_depth_2_string_continuous: {
      a: {
        a: '',
        b: '',
        c: '',
        d: ''
      },
      b: {
        a: '',
        b: '',
        c: '',
        d: ''
      },
      c: {
        a: '',
        b: '',
        c: '',
        d: ''
      },
      d: {
        a: '',
        b: '',
        c: '',
        d: 1
      }
    },
    object_depth_3_string_continuous: {
      a: {
        a: {
          a: '',
          b: '',
          c: '',
          d: ''
        }
      },
      b: {
        a: {
          a: '',
          b: '',
          c: '',
          d: ''
        }
      },
      c: {
        a: {
          a: '',
          b: '',
          c: '',
          d: ''
        }
      },
      d: {
        a: {
          a: '',
          b: '',
          c: '',
          d: false
        }
      }
    }
  },
  schemas: {
    object_depth_1_string_continuous: {
      type: Object,
      options: {
        required: true,
        allowNull: false,
        validation: undefined
      },
      schema: {
        type: String,
        options: {
          required: true,
          allowNull: true,
          validation: undefined
        }
      }
    },
    object_depth_1: {
      type: Object,
      options: {
        required: true,
        allowNull: false,
        validation: undefined
      },
      schema: {
        a: {
          type: String,
          options: {
            required: true,
            allowNull: false,
            validation: undefined
          }
        },
        b: {
          type: Number,
          options: {
            required: true,
            allowNull: false,
            validation: undefined
          }
        },
        c: {
          type: Boolean,
          options: {
            required: true,
            allowNull: false,
            validation: undefined
          }
        },
        d: {
          type: null,
          options: {
            required: true,
            allowNull: true,
            validation: undefined
          }
        }
      }
    },
    object_depth_2_string_continuous: {
      type: Object,
      options: {
        required: true,
        allowNull: false,
        validation: undefined
      },
      schema: {
        type: Object,
        options: {
          required: true,
          allowNull: true,
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
    },
    object_depth_3_string_continuous: {
      type: Object,
      options: {
        required: true,
        allowNull: false,
        validation: undefined
      },
      schema: {
        type: Object,
        options: {
          required: true,
          allowNull: true,
          validation: undefined
        },
        schema: {
          type: Object,
          options: {
            required: true,
            allowNull: true,
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
      }
    },
  }
}

describe(`The 'value-validator' library`, function () {
  const schemaList = Object.keys(example.schemas);
  schemaList.forEach(schemaType => {
    describe(`when testing a/an '${schemaType}' schema`, function () {
      it(`should return boolean value 'true'.`, function () {
        expect(v2(example.value[schemaType], example.schemas[schemaType])).to.equal(true);
      });
    });
  });
  schemaList.forEach(schemaType => {
    describe(`when testing a/an '${schemaType}' schema`, function () {
      it(`should return boolean value 'true'.`, function () {
        expect(v2(example.value_false[schemaType], example.schemas[schemaType])).to.equal(false);
      });
    });
  });
});