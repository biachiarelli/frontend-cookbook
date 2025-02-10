import globals from "globals";
import js from "@eslint/js";
import react from "eslint-plugin-react";

/** @type {import("@eslint/eslintrc").FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest", 
        sourceType: "module", 
        ecmaFeatures: {
          jsx: true, 
        },
      },
      globals: globals.browser, 
    },
  },

  js.configs.recommended,

  {
    plugins: {
      react, 
    },
    rules: {
      ...react.configs.recommended.rules, 
      "react/react-in-jsx-scope": "off", 
      "react/prop-types": "off",        
    },
    settings: {
      react: {
        version: "detect", 
      },
    },
  },
];
