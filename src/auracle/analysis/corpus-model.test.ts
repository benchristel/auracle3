import {analyze} from "."

test("a CorpusModel", {
    "knows the words from the corpus"() {
        const model = analyze("cabbage")
        expect(model?.words(), equals, ["cabbage"])
    },

    "knows the segments of those words"() {
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
