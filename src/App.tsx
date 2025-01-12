import {h} from "preact"
import {useState} from "preact/hooks"
import "./app.css"
import {pastiche} from "./auracle"

export function App() {
    const [input, setInput] = useState("")

    return (
        <div>
            <textarea
                value={input}
                onInput={(e) => setInput(e.currentTarget.value)}
            />
            <textarea
                value={pastiche(input)}
            />
        </div>
    )
}
