const { expect } = require('chai');
const root = process.mainModule.paths[0].split('node_modules')[0];
const v2 = require(root);

const argsSchema = {
    createManyWords: {
      type: Object,
      options: {
        required: true,
        allowNull: false,
        validation: undefined
      },
      schema: {
        words: {
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
      }
    }
  }

describe(`The 'value-validator' library`, function () {
  it(`should reject a value if it is required but not provided.`, function () {
    expect(v2(null, argsSchema.createManyWords)).to.equal(false);
  });
  it(`should reject a value if it is a required object key but not provided.`, function () {
    expect(v2({}, argsSchema.createManyWords)).to.equal(false);
  });
});