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
    vowelSegments(): string[];
    consonantSegments(): string[];
}

export class AnalyzedModel implements Model {
    constructor(private input: string) {}

    words() {
        return splitIntoWords(this.input)
    }

    segments(): string[] {
        return this.words().flatMap((word) => word.split(""))
    }

    vowelSegments(): string[] {
        return this.segments()
    }

    consonantSegments(): string[] {
        return this.segments()
    }
}

function splitIntoWords(text: string): string[] {
    return text.split(/\W+/)
}
