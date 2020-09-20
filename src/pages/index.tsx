import { useRouter } from "next/dist/client/router"
import { useState } from "react"

export default () => {
    const [value, setValue] = useState("")
    const router = useRouter()
    return (
        <section>
            <header>
                <h1>Retweeters</h1>
            </header>
            <form
                onSubmit={async (event) => {
                    event.preventDefault()
                    const id = new FormData(event.currentTarget).get(
                        "id"
                    ) as string
                    if (id) {
                        await router.push(`/retweeters/${id}`)
                    }
                }}
            >
                <label>
                    URL
                    <input
                        type="url"
                        placeholder="https://twitter.com/******/status/********"
                        onChange={(event) => {
                            const { value } = event.currentTarget
                            if (value) {
                                const match = value.match(
                                    /https:\/\/[a-z.]*\/[a-zA-Z_]*\/status\/([0-9]*)/i
                                )
                                if (match) {
                                    setValue(match[1])
                                }
                            }
                        }}
                    />
                </label>
                <label>
                    TWEET ID
                    <input
                        type="text"
                        name="id"
                        placeholder="0123456789"
                        defaultValue={value}
                        key={value}
                    />
                </label>
                <button>submit</button>
            </form>
        </section>
    )
}
