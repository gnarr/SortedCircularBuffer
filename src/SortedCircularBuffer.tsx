export class SortedCircularBuffer {
  private data: any;
  private capacity: number;
  private keys: string[];

  public constructor(capacity: number) {
    this.capacity = capacity;
    this.data = {};
    this.keys = Object.keys(this.data);
  }

  public set(sequence: number, value: any) {
    this.data[sequence] = value;
    this.keys = Object.keys(this.data);
    if (this.size > this.capacity) {
      delete this.data[this.keys[0]];
      this.keys = Object.keys(this.data);
    }
  }

  public get(index: number) {
    return this.data[this.keys[index]];
  }

  public getBySequence(sequence: number) {
    return this.data[sequence];
  }

  public delete(index: number) {
    delete this.data[this.keys[index]];
    this.keys = Object.keys(this.data);
  }

  public deleteBySequence(sequence: number) {
    delete this.data[sequence];
    this.keys = Object.keys(this.data);
  }

  public findContinuousSequenceFromLast(length: number) {
    let progress = 1;
    let sequence = -1;
    for (var i = this.size - 1; i >= 0; --i) {
      const nextSeq = parseInt(this.keys[i], 10);
      if (sequence - nextSeq === 1) {
        progress++;
      }
      if (progress === length) {
        return i;
      }
      sequence = nextSeq;
    }
    return -1;
  }

  public last() {
    const last = this.keys[this.keys.length - 1];
    return this.data[last];
  }

  public get size() {
    return this.keys.length;
  }

  public forEach(
    callback: (value: {}, index: number, array: {}[]) => void,
    thisArg?: any
  ) {
    const that = thisArg || this;
    const keys = that.keys;
    const values = Object.values(that.data);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const item = that.data[key];
      callback(item, i, values);
    }
  }
}
