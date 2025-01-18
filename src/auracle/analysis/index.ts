import {AnalyzedModel} from "./analyzed-model"

export * from "./types"

export function analyze(text: string): AnalyzedModel | null {
    try {
        return new AnalyzedModel(text)
    } catch (e) {
        return null
    }
}
