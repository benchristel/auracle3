import {h} from "preact"
import {useState} from "preact/hooks"
import "./app.css"

export function App() {
    const [input, setInput] = useState("")

    return (
        <div>
            <textarea
                value={input}
                onInput={(e) => setInput(e.currentTarget.value)}
            />
            <textarea
                value={input}
            />
        </div>
    )
}
