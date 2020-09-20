/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
    interface Process {
        readonly browser: boolean
    }
    interface ProcessEnv {
        readonly NODE_ENV: "development" | "production"
        readonly CONSUMER_KEY: string
        readonly CONSUMER_SECRET: string
        readonly ACCESS_TOKEN: string
        readonly ACCESS_TOKEN_SECRET: string
    }
}
