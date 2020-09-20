import { GetServerSideProps } from "next"
import Twit from "twit"

const T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
    strictSSL: true,
})

export const getServerSideProps: GetServerSideProps = async (context) => {
    const data = await new Promise((resolve) => {
        T.get(
            "statuses/retweeters/ids",
            { id: context.query.id as string, stringify_ids: true },
            function (_, data) {
                T.get(
                    "users/lookup",
                    {
                        user_id: (data as { ids: string[] }).ids.join(","),
                        count: 100,
                    },
                    function (_, data) {
                        resolve(
                            (data as {
                                id_str: string
                                screen_name: string
                                name: string
                            }[]).map(({ id_str, screen_name, name }) => {
                                return {
                                    id: id_str,
                                    screen_name,
                                    name,
                                }
                            })
                        )
                    }
                )
            }
        )
    })
    return {
        props: {
            data,
        },
    }
}

const textareaStyle = {
    height: "100vh",
    fontSize: 10,
    fontFamily: "ui-monospace",
}

export default ({
    data,
}: {
    data: {
        id: string
        screen_name: string
        name: string
    }[]
}) => {
    return (
        <section>
            <details>
                <summary>id,screen_name,name</summary>
                <textarea
                    style={textareaStyle}
                    defaultValue={JSON.stringify(data, null, 2)}
                />
            </details>
            <details>
                <summary>screen_name</summary>
                <textarea
                    style={textareaStyle}
                    defaultValue={JSON.stringify(
                        data.map((item) => item.screen_name),
                        null,
                        2
                    )}
                />
            </details>
            <details>
                <summary>name</summary>
                <textarea
                    style={textareaStyle}
                    defaultValue={JSON.stringify(
                        data.map((item) => item.name),
                        null,
                        2
                    )}
                />
            </details>
            <details>
                <summary>id</summary>
                <textarea
                    style={textareaStyle}
                    defaultValue={JSON.stringify(
                        data.map((item) => item.id),
                        null,
                        2
                    )}
                />
            </details>
        </section>
    )
}
