export declare class SortedCircularBuffer {
    private data;
    private capacity;
    private keys;
    constructor(capacity: number);
    set(sequence: number, value: any): void;
    get(index: number): any;
    last(): any;
    readonly size: number;
    forEach(callback: (value: {}, index: number, array: {}[]) => void, thisArg?: any): void;
}
