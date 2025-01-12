import {trimMargin} from "@benchristel/taste"
import {analyze} from "./auracle/analyze"

export function pastiche(input: string): string {
    return format(generate(analyze(input)))
}

test("pastiche", {
    "generates newline-separated words"() {
        const input = trimMargin`
            calculator
            bespectacled
            frog

            `

        expect(pastiche(input), matches, /^\S+\n\S+\n\S+\n/)
    },

    "does not repeat the input"() {
        const input = trimMargin`
            calculator
            bespectacled
            frog

            `

        expect(pastiche(input), not(matches), /calculator/)
    },

    "returns a different output for a different input"() {
        const english = trimMargin`
            calculator
            bespectacled
            frog

            `
        const spanish = trimMargin`
            calculadora
            anteojado
            raña

            `

        expect(pastiche(spanish), not(is), pastiche(english))
    },
})

function matches(pattern: RegExp, actual: string) {
    return pattern.test(actual)
}

const generate = (words: string[]) => words.map(reverse)

function format(words: string[]): string {
    return words
        .map(line)
        .join("")
}

function reverse(s: string): string {
    return s.split("").reverse().join("")
}

function line(s: string): string {
    return s + "\n"
}
