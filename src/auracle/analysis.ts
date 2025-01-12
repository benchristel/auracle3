export function analyze(text: string): AnalyzedModel | null {
    try {
        return new AnalyzedModel(text)
    } catch (e) {
        return null
    }
}

test("a Model", {
    "knows words"() {
        const model = analyze("cabbage")
        expect(model?.words(), equals, ["cabbage"])
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
    constructor(private input: string) {
        if (!this.isValid()) {
            throw new Error("AnalyzedModel: nothing to analyze")
        }
    }

    words() {
        return splitIntoWords(this.input)
    }

    segments(): string[] {
        const words = this.words()
        return words.flatMap((word) => word.split(""))
    }

    vowelSegments(): string[] {
        return this.segments()
    }

    consonantSegments(): string[] {
        return this.segments()
    }

    private isValid() {
        return this.segments().length > 0
    }
}

function splitIntoWords(text: string): string[] {
    return text.split(/\W+/)
}
