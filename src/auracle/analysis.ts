export function analyze(text: string): Model {
    return new Model(text)
}

test("analyze", {
    "returns a language model that knows words"() {
        const model = analyze("cabbage")
        expect(model.words(), equals, ["cabbage"])
    },
})

export class Model {
    constructor(private input: string) {}

    words() {
        return splitIntoWords(this.input)
    }
}

function splitIntoWords(text: string): string[] {
    return text.split(/\W+/)
}

