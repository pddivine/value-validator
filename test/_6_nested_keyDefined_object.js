const { expect } = require('chai');
const root = process.mainModule.paths[0].split('node_modules')[0];
const v2 = require(root);

const example = {
  value: {
    object_depth_3: {
      a: {
        aa: {
          aaa: '',
          aab: 1
        }
      },
      b: 1,
      c: true,
      d: null
    }
  },
  value_false: {
    object_depth_3: {
      a: {
        aa: {
          aaa: '',
          aab: function () {}
        }
      },
      b: 1,
      c: true,
      d: null
    }
  },
  schemas: {
    object_depth_3: {
      type: Object,
      options: {
        required: true,
        allowNull: false,
        validation: undefined
      },
      schema: {
        a: {
          type: Object,
          options: {
            required: true,
            allowNull: false,
            validation: undefined
          },
          schema: {
            aa: {
              type: Object,
              options: {
                required: true,
                allowNull: false,
                validation: undefined
              },
              schema: {
                aaa: {
                  type: String,
                  options: {
                    required: true,
                    allowNull: false,
                    validation: undefined
                  }
                },
                aab: {
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
    }
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