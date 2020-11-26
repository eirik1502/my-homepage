export const range = (length: number, start: number = 0) => {
    const initialRange = Array.from(new Array(length).keys())
    return start === 0 ? initialRange : initialRange.map((e) => e + start)
}

export const zip = <T>(arr1: T[], arr2: T[]): T[][] =>
    arr1.map((elem, i) => [elem, arr2[i]])
