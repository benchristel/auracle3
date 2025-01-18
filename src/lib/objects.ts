export function invertMap(map: Record<string, string[]>): Record<string, string> {
    const ret: Record<string, string> = {}
    for (const [k, vs] of Object.entries(map)) {
        for (const v of vs) {
            ret[v] = k
        }
    }
    return ret
}

export function mapValues<T, U>(
    f: (x: T) => U,
    map: Record<string, T>,
): Record<string, U> {
    const ret: Record<string, U> = {}
    for (const [k, v] of Object.entries(map)) {
        ret[k] = f(v)
    }
    return ret
}
