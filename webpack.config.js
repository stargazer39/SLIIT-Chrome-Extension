const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "src");

module.exports = {
    entry: {
        "popup" : path.join(srcDir, 'tsx/popup.tsx'),
        "background" : path.join(srcDir, 'tsx/background.tsx'),
        "options" : path.join(srcDir, 'tsx/options.tsx'),
        "contentScript" : path.join(srcDir, 'tsx/contentScript.tsx'),
    },
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: ".", to: ".", context: "./src/app"}],
            options: {},
        }),
    ],
    devtool: 'inline-source-map',
    mode: 'development',
    watch: true
}