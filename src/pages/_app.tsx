/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
import "ress"
import "../style.scss"
import App from "next/app"

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props
        return <Component {...pageProps} />
    }
}
export default MyApp
