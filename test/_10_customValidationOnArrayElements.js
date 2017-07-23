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
          validation: function (arr) {
            return arr.reduce((acc, cur) => {
              // Ensure each element is not and empty string.
              console.log(cur)
              return acc && cur !== '';
            }, true );
          }
        },
        schema: {
          type: String,
          options: {
            required: true,
            allowNull: false,
            validation: undefined
          }
        }
      },
      lang: {
        type: String,
        options: {
          required: true,
          allowNull: false,
          validation: (v) => {
            return true || !!langList[v];
          }
        }
      },
      notes: {
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

const invalidObj = {
	"words": [ "" ],
	"lang": "eng",
	"notes": "Loud bugs in trees."
}

describe(`The 'value-validator' library`, function () {
  it(`should reject a value with an array that doesn't meet a custom validation.`, function () {
    const validation = v2(invalidObj, argsSchema.createManyWords, { verbose: true });
    expect(validation.success).to.equal(false);
  });
});
