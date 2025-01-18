import {CorpusModel} from "./corpus-model"

export * from "./types"

export function analyze(text: string): CorpusModel | null {
    try {
        return new CorpusModel(text)
    } catch (e) {
        return null
    }
}
