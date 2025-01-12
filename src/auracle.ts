import {trimMargin} from "@benchristel/taste"
import {AnalyzedModel, analyze} from "./auracle/analysis"
import {generate} from "./auracle/generation"

export function pastiche(input: string): string {
    // TODO: create a real random number generator
    return format(generate(() => 0, analyze(input)))
}

test("pastiche", {
    "generates newline-separated words"() {
        debug("TODO")
        // const input = trimMargin`
        //     calculator
        //     bespectacled
        //     frog

        //     `

        // expect(pastiche(input), matches, /^\S+\n\S+\n\S+\n/)
    },

    "does not repeat the input"() {
        debug("TODO")
        // const input = trimMargin`
        //     calculator
        //     bespectacled
        //     frog

        //     `

        // expect(pastiche(input), not(matches), /calculator/)
    },

    "returns a different output for a different input"() {
        debug("TODO")
        // const english = trimMargin`
        //     calculator
        //     bespectacled
        //     frog

        //     `
        // const spanish = trimMargin`
        //     calculadora
        //     anteojado
        //     raña

        //     `

        // expect(pastiche(spanish), not(is), pastiche(english))
    },
})

function matches(pattern: RegExp, actual: string) {
    return pattern.test(actual)
}

function format(words: string[]): string {
    return words
        .map(line)
        .join("")
}

function line(s: string): string {
    return s + "\n"
}
