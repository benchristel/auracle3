import {AnalyzedModel} from "./analysis"

export const generate = (model: AnalyzedModel) => model.words().map(reverse)

function reverse(s: string): string {
    return s.split("").reverse().join("")
}
