module.exports = [
    // Add support for native node modules
    {
        test: /\.node$/,
        use:  'node-loader'
    },
    {
        test:   /\.(m?js|node)$/,
        parser: { amd: false },
        use:    {
            loader:  '@marshallofsound/webpack-asset-relocator-loader',
            options: {
                outputAssetBase: 'native_modules'
            }
        }
    },
    {
        test:    /\.(js|jsx)$/,
        exclude: /node_modules/,
        use:     {
            loader: 'babel-loader'
        }
    },
    {
        test: /\.(?:png|jpg|svg)$/,
        loader: 'url-loader',
        query: {
            // Inline images smaller than 10kb as data URIs
            limit: 10000
        }
    }
]
