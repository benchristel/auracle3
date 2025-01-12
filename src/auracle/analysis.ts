export function analyze(text: string): AnalyzedModel {
    return new AnalyzedModel(text)
}

test("a Model", {
    "knows words"() {
        const model = analyze("cabbage")
        expect(model.words(), equals, ["cabbage"])
    },

    "knows segments"() {
        debug("TODO")
        // const model = analyze("cabbage")
        // expect(model.segments(), equals, ["c", "a", "bb", "a", "g", "e"])
    },
})

export interface Model {
    words(): string[];
    segments(): string[];
}

export class AnalyzedModel {
    constructor(private input: string) {}

    words() {
        return splitIntoWords(this.input)
    }

    segments() {
        return []
    }
}

const stubModel: Model = {
    words: () => [],
    segments: () => [],
}

function splitIntoWords(text: string): string[] {
    return text.split(/\W+/)
}
