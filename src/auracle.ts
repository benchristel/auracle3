import {trimMargin} from "@benchristel/taste"

export function pastiche(input: string): string {
    return format(generate(analyze(input)))
}

const analyze = splitIntoWords

const generate = (words: string[]) => words.map(reverse)

function format(words: string[]): string {
    return words
        .map(line)
        .join("")
}

function splitIntoWords(text: string): string[] {
    return text.split(/\W+/)
}

function reverse(s: string): string {
    return s.split("").reverse().join("")
}

function line(s: string): string {
    return s + "\n"
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
    }
})

function matches(pattern: RegExp, actual: string) {
    return pattern.test(actual)
}