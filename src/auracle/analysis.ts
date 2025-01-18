import {countTo} from "../lib/iteration"
import {estimatedSonority} from "./alphabet"

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
        const model = analyze("cabbage")
        expect(model?.segments(), equals, ["c", "a", "bb", "a", "g", "e"])
    },

    "derives a set of templates from the input words"() {
        const model = analyze("cat babbage")
        expect(model?.templates(), equals, [
            ["C", "V", "C"],
            ["C", "V", "C", "V", "C", "V", "C"],
        ])
    },

    "ignores words of length zero"() {
        // Regression test. The space at the beginning of the input is significant
        const model = analyze(" cat")
        expect(model?.templates(), equals, [
            ["C", "V", "C"],
        ])
    },

    "knows which consonant segments exist"() {
        const model = analyze("cat")
        expect(
            new Set(model?.consonantSegments()),
            equals,
            new Set(["c", "t"]),
        )
    },

    "knows which vowel segments exist"() {
        const model = analyze("catamorphism")
        expect(
            new Set(model?.vowelSegments()),
            equals,
            new Set(["a", "a", "o", "i"]),
        )
    },
})

export interface Model {
    words(): string[];
    segments(): string[];
    vowelSegments(): string[];
    consonantSegments(): string[];
    templates(): WordTemplate[];
}

export type WordTemplate = ("C" | "V")[]

export class AnalyzedModel implements Model {
    constructor(private input: string) {
        if (!this.isValid()) {
            throw new Error("AnalyzedModel: nothing to analyze")
        }
    }

    words() {
        return splitIntoWords(this.input.trim())
    }

    segments(): string[] {
        const words = this.words()
        return words.flatMap(segmentsOfWord)
    }

    vowelSegments(): string[] {
        return this.segments().filter(isVowel)
    }

    consonantSegments(): string[] {
        return this.segments().filter(not(isVowel))
    }

    templates(): WordTemplate[] {
        return this.words()
            .map(countVowelSegments)
            .map(templateOfLength)
    }

    private isValid() {
        return this.vowelSegments().length > 0
            && this.consonantSegments().length > 0
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
        const atBoundary =
            classifyLetter(word, i)
            !== classifyLetter(word, i - 1)
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
    "separates consonants from vowels"() {
        expect(segmentsOfWord("cap"), equals, ["c", "a", "p"])
    },

    "keeps runs of consonants together"() {
        expect(segmentsOfWord("draggled"), equals, ["dr", "a", "ggl", "e", "d"])
    },

    "keeps runs of vowels together"() {
        expect(
            segmentsOfWord("beekeeper"),
            equals,
            ["b", "ee", "k", "ee", "p", "e", "r"],
        )
    },

    "treats qu as a consonant cluster"() {
        expect(
            segmentsOfWord("queen"),
            equals,
            ["qu", "ee", "n"],
        )
    },

    "treats u as a vowel between q and a consonant"() {
        expect(
            segmentsOfWord("quds"),
            equals,
            ["q", "u", "ds"],
        )
    },
})

function countVowelSegments(word: string): number {
    return segmentsOfWord(word).filter(isVowel).length
}

function classifyLetter(word: string, index: number): "vowel" | "consonant" {
    const preface = word.slice(0, index)
    const letter = word[index]
    if (letter === "u" && isLocalSonorityMaximum(word, index)) {
        return "vowel"
    }
    if (preface.endsWith("q") && letter === "u") {
        return "consonant"
    }
    return isVowel(letter) ? "vowel" : "consonant"
}

const templateOfLength = (numVowels: number): ("C" | "V")[] => {
    return ["C" as "C", ...countTo(numVowels).map(() => ["V", "C"] as const)].flat()
}

function isVowel(letter: string) {
    return !!letter && "aeiouAEIOU".includes(letter[0])
}

function isLocalSonorityMaximum(word: string, index: number): boolean {
    return estimatedSonority(word[index]) > estimatedSonority(word[index + 1])
        && estimatedSonority(word[index]) > estimatedSonority(word[index - 1])
}

test("isVowel", {
    "given empty string, returns false"() {
        expect(isVowel(""), is, false)
    },

    "given a lowercase vowel, returns true"() {
        expect(isVowel("a"), is, true)
    },

    "given an uppercase vowel, returns true"() {
        expect(isVowel("A"), is, true)
    },

    "given a dipthong, returns true"() {
        expect(isVowel("ie"), is, true)
    },
})

function empty(s: string): boolean {
    return s.length === 0
}
