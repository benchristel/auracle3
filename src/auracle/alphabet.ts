import {invertMap, mapValues} from "../lib/objects"

export function estimatedSonority(letter: string): number | undefined {
    return letterSonority[letter]
}

const letterSonority = mapValues(
    Number,
    invertMap({
        5: ["a", "e", "i", "o", "u"],
        4: ["y", "w"],
        3: ["j", "l", "r", "m", "n"],
        2: ["s", "z", "f", "v", "h", "x"],
        1: ["p", "t", "k", "d", "b", "g", "c", "q"],
    }),
)
