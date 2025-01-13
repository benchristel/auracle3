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
        return words.flatMap(segmentsOfWord)
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

function segmentsOfWord(word: string): string[] {
    const segments: string[] = []
    for (let i = 0; i < word.length; i++) {
        const currentLetter = word[i]
        const previousLetter = word[i - 1]
        const atBoundary = classifyLetter(currentLetter) !== classifyLetter(previousLetter)
        const lastIndex = segments.length - 1
        if (!previousLetter || atBoundary) {
            segments.push(word[i])
        } else {
            segments[lastIndex] += word[i]
        }
    }
    return segments
}

test("segmentsOfWord", {
    "given 'cap'"() {
        expect(segmentsOfWord("cap"), equals, ["c", "a", "p"])
    },

    "given 'draggled'"() {
        expect(segmentsOfWord("draggled"), equals, ["dr", "a", "ggl", "e", "d"])
    },
})

function classifyLetter(letter: string): "vowel" | "consonant" {
    return "aeiou".includes(letter) ? "vowel" : "consonant"
}

test("classifyLetter", {
    "says 'a' is a vowel"() {
        expect(classifyLetter("a"), is, "vowel")
    },

    "says 'b' is a consonant"() {
        expect(classifyLetter("b"), is, "consonant")
    },
})
