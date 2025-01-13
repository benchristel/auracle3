import {pickRandom, sfc32} from "../lib/random"
import type {Model, WordTemplate} from "./analysis"

export const generate = (rng: () => number, model: Model) => {
    return countTo(3).map(() => {
        const template = pickRandom(rng, model.templates())
        const initial = pickRandom(rng, model.consonantSegments())
        const final = pickRandom(rng, model.consonantSegments())
        const vowel = pickRandom(rng, model.vowelSegments())

        return template.map((placeholder) => {
            return placeholder === "C"
                ? pickRandom(rng, model.consonantSegments())
                : pickRandom(rng, model.vowelSegments())
        }).join("")
    })
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

    words() {
        return []
    }

    templates(): WordTemplate[] {
        return [
            ["C", "V", "C"],
            ["C", "V", "C", "V", "C"],
        ]
    }
}

test("generate", {
    "glues consonants and vowels together"() {
        const model = new StubModel()
        const rng = sfc32(0, 0, 0, 0)

        expect(generate(rng, model)[0], equals, "rgash")
    },

    "generates different words given a different random number generator"() {
        const model = new StubModel()
        const rng = sfc32(0, 0, 0, 1)

        expect(generate(rng, model)[0], equals, "rgirgarg")
    },

    "generates words of different lengths"() {
        const model = new StubModel()
        const rng = sfc32(0, 0, 0, 1)

        expect(generate(rng, model), equals, [
            "rgirgarg",
            "firg",
            "firg",
        ])
    },
})

function countTo(n: number): undefined[] {
    return new Array(n).fill(undefined)
}
