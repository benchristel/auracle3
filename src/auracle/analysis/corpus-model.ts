import {countTo} from "../../lib/iteration"
import {countVowelSegments, isVowel, segmentsOfWord} from "./segments"
import type {Model, WordTemplate} from "./types"

export class CorpusModel implements Model {
    constructor(private input: string) {
        if (!this.isValid()) {
            throw new Error("CorpusModel: no words in corpus")
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

const templateOfLength = (numVowels: number): ("C" | "V")[] => {
    return ["C" as "C", ...countTo(numVowels).map(() => ["V", "C"] as const)].flat()
}
