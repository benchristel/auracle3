import {isVowel, segmentsOfWord} from "./segments"

test("segmentsOfWord", {
    "separates consonants from vowels"() {
        expect(segmentsOfWord("cap"), equals, ["c", "a", "p"])
    },

    "keeps runs of consonants together"() {
        expect(segmentsOfWord("draggled"), equals, ["dr", "a", "ggl", "e", "d"])
    },

    "keeps runs of vowels together"() {
        expect(
            segmentsOfWord("beekeeper"),
            equals,
            ["b", "ee", "k", "ee", "p", "e", "r"],
        )
    },

    "treats qu as a consonant cluster"() {
        expect(
            segmentsOfWord("queen"),
            equals,
            ["qu", "ee", "n"],
        )
    },

    "treats u as a vowel between q and a consonant"() {
        expect(
            segmentsOfWord("quds"),
            equals,
            ["q", "u", "ds"],
        )
    },

    "treats y as a vowel between a consonant and the end of the word"() {
        expect(
            segmentsOfWord("sky"),
            equals,
            ["sk", "y"],
        )
    },

    "treats y as a vowel between a consonant and the beginning of the word"() {
        expect(
            segmentsOfWord("yvonne"),
            equals,
            ["y", "v", "o", "nn", "e"],
        )
    },

    "treats y as a vowel between consonants"() {
        expect(
            segmentsOfWord("system"),
            equals,
            ["s", "y", "st", "e", "m"],
        )
    },

    "treats y as a consonant before a vowel"() {
        expect(
            segmentsOfWord("gyoza"),
            equals,
            ["gy", "o", "z", "a"],
        )
    },

    "treats y as a consonant between vowels"() {
        expect(
            segmentsOfWord("maya"),
            equals,
            ["m", "a", "y", "a"],
        )
    },

    "treats y as a vowel at the end of the word after a vowel"() {
        expect(
            segmentsOfWord("hoy"),
            equals,
            ["h", "oy"],
        )
    },

    "treats y as a vowel between a vowel and a consonant"() {
        expect(
            segmentsOfWord("aymara"),
            equals,
            ["ay", "m", "a", "r", "a"],
        )
    },
})

test("isVowel", {
    "given empty string, returns false"() {
        expect(isVowel(""), is, false)
    },

    "given a lowercase vowel, returns true"() {
        expect(isVowel("a"), is, true)
    },

    "given an uppercase vowel, returns true"() {
        expect(isVowel("A"), is, true)
    },

    "given a dipthong, returns true"() {
        expect(isVowel("ie"), is, true)
    },
})
