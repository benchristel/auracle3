export function analyze(text: string): Model {
    return new Model(text)
}

test("a Model", {
    "knows words"() {
        const model = analyze("cabbage")
        expect(model.words(), equals, ["cabbage"])
    },

    "knows segments"() {
        debug("TODO")
        // const model = analyze("cabbage")
        // expect(model.segments(), equals, ["c", "a", "bb", "a", "g", "e"])
    },
})

export class Model {
    constructor(private input: string) {}

    words() {
        return splitIntoWords(this.input)
    }

    segments() {
        return []
    }
}

function splitIntoWords(text: string): string[] {
    return text.split(/\W+/)
}
