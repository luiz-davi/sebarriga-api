module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: [ 'airbnb-base', 'prettier'],
	plugins: ['prettier'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 'off',
    'no-param-reassing': 'off',
    camelcase: 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'no-template-curly-in-string': 'off',
    'arrow-body-style': 'off'
  },
};
