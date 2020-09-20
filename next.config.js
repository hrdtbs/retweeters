const withOffline = require("next-offline")

module.exports = withOffline({
    env: {
        CONSUMER_KEY: process.env.CONSUMER_KEY,
        CONSUMER_SECRET: process.env.CONSUMER_SECRET,
        ACCESS_TOKEN: process.env.ACCESS_TOKEN,
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    },
    workboxOpts: {
        swDest: process.env.NEXT_EXPORT
            ? "service-worker.js"
            : "static/service-worker.js",
        runtimeCaching: [
            {
                urlPattern: /^https?.*/,
                handler: "NetworkFirst",
                options: {
                    cacheName: "offlineCache",
                    expiration: {
                        maxEntries: 200,
                    },
                },
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: "/service-worker.js",
                destination: "/_next/static/service-worker.js",
            },
        ]
    },
})
