import {estimatedSonority} from "./alphabet"

export function segmentsOfWord(word: string): string[] {
    const segments: string[] = []
    for (let i = 0; i < word.length; i++) {
        const atBoundary =
            classifyLetter(word, i)
            !== classifyLetter(word, i - 1)
        const lastIndex = segments.length - 1
        if (atBoundary) {
            segments.push(word[i])
        } else {
            segments[lastIndex] += word[i]
        }
    }
    return segments
}

export function countVowelSegments(word: string): number {
    return segmentsOfWord(word).filter(isVowel).length
}

function classifyLetter(word: string, index: number): "vowel" | "consonant" | null {
    const letter = word[index]
    if (letter == null) {
        return null
    }
    const preface = word.slice(0, index)
    if ("uy".includes(letter) && isLocalSonorityMaximum(word, index)) {
        return "vowel"
    }
    if ("yw".includes(letter) && isSonorityDecreasing(word, index)) {
        return "vowel"
    }
    if (preface.endsWith("q") && letter === "u") {
        return "consonant"
    }
    return isVowel(letter) ? "vowel" : "consonant"
}

export function isVowel(letter: string) {
    return !!letter && "aeiouAEIOU".includes(letter[0])
}

function isLocalSonorityMaximum(word: string, index: number): boolean {
    let nextIndex = index + 1
    while (nextIndex < word.length) {
        if (word[index] !== word[nextIndex]) break
        nextIndex++
    }
    const before = estimatedSonority(word[index - 1]) ?? 0
    const here = estimatedSonority(word[index]) ?? 0
    const after = estimatedSonority(word[nextIndex]) ?? 0
    return before <= here && here > after
}

function isSonorityDecreasing(word: string, index: number): boolean {
    const before = estimatedSonority(word[index - 1]) ?? 0
    const here = estimatedSonority(word[index]) ?? 0
    const after = estimatedSonority(word[index + 1]) ?? 0
    return before > here && here > after
}
