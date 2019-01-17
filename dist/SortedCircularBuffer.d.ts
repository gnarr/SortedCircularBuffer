export declare class SortedCircularBuffer {
    private data;
    private capacity;
    private keys;
    constructor(capacity: number);
    set(sequence: number, value: any): void;
    get(index: number): any;
    getBySequence(sequence: number): any;
    delete(index: number): void;
    deleteBySequence(sequence: number): void;
    findContinuousSequenceFromLast(length: number): number;
    last(): any;
    readonly size: number;
    forEach(callback: (value: {}, index: number, array: {}[]) => void, thisArg?: any): void;
}
