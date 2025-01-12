import {sfc32} from "../lib/random"
import type {Model} from "./analysis"

export const generate = (rng: () => number, model: Model) => {
    const initial = pickRandom(rng, model.consonantSegments())
    const final = pickRandom(rng, model.consonantSegments())
    const vowel = pickRandom(rng, model.vowelSegments())

    return [`${initial}${vowel}${final}`]
}

function reverse(s: string): string {
    return s.split("").reverse().join("")
}

class StubModel implements Model {
    segments(): string[] {
        return []
    }

    consonantSegments() {
        return ["bl", "rg", "f", "sh"]
    }

    vowelSegments() {
        return ["a", "i"]
    }

    template() {

    }

    words() {
        return []
    }
}

test("generate", {
    "glues consonants and vowels together"() {
        const model = new StubModel()
        const rng = sfc32(0, 0, 0, 0)

        expect(generate(rng, model), equals, ["rgash"])
    },

    "generates different words given a different random number generator"() {
        const model = new StubModel()
        const rng = sfc32(0, 0, 0, 1)

        expect(generate(rng, model), equals, ["shabl"])
    },
})

function pickRandom<T>(rng: () => number, options: T[]): T {
    if (options.length === 0) {
        throw new RangeError("Cannot pickRandom from an empty array")
    }
    const index = Math.floor(rng() * options.length)
    return options[index]
}
