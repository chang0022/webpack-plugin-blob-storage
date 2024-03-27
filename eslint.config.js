import antfu from '@antfu/eslint-config';

export default antfu({
  rules: {
    'style/semi': 'off',
    'style/member-delimiter-style': 'off',
    'style/comma-dangle': 'off',
    'style/quote-props': 'off',
    'antfu/if-newline': 'off',
    curly: 'off',
  },
});
