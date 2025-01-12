export function sfc32(a: number, b: number, c: number, d: number): () => number {
    function rng() {
        // TODO: remove these |= 0s?
        a |= 0
        b |= 0
        c |= 0
        d |= 0
        var t = (a + b | 0) + d | 0
        d = d + 1 | 0
        a = b ^ b >>> 9
        b = c + (c << 3) | 0
        c = c << 21 | c >>> 11
        c = c + t | 0
        return (t >>> 0) / 4294967296
    }
    // Skip the first few outputs; they're not very random because the state
    // hasn't been sufficiently mixed yet.
    for (let i = 0; i < 20; i++) {
        rng()
    }
    return rng
}
