export const analyze = splitIntoWords

test("analyze", {

})

function splitIntoWords(text: string): string[] {
    return text.split(/\W+/)
}

