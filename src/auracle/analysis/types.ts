export type WordTemplate = ("C" | "V")[]

export interface Model {
    words(): string[];
    segments(): string[];
    vowelSegments(): string[];
    consonantSegments(): string[];
    templates(): WordTemplate[];
}
