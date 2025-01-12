import {Model} from "./analysis"

export const generate = (model: Model) => model.words().map(reverse)

function reverse(s: string): string {
    return s.split("").reverse().join("")
}
