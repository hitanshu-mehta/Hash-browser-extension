
const ExtensionReloader = require('webpack-extension-reloader')
const config = require('./custom-webpack.config');

module.exports = {
    ...config,
    mode: 'development',
    plugins: [new ExtensionReloader({
        reloadPage: true,
        entries: {
            contentScript: ['content/autofill','content/autofiller','content/notification'],
            background: 'background',
        }
    })]
}