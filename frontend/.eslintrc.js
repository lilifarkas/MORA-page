module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "no-unused-vars": "off",
        "no-undef": "off",
        'react/jsx-key': 'off'
    }
}