const config = {
    settings: {
        react: {
        version: "detect",
        },
    },
    parserOptions: {
        ecmaFeatures: {
        jsx: true,
        },
    },
    extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
    plugins: ["react", "react-hooks"],
    rules: {
        "react/prop-types": "off",
        "react-hooks/rules-of-hook": "error"
    }
};

module.exports = config;