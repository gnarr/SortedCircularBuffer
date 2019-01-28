import { Interface } from "readline";

interface SequenceObject {
  sequence: number;
  [others: string]: any;
}

export class SortedCircularBuffer {
  private data: any;
  private capacity: number;
  private keys: string[];
  private keysExpired: boolean;

  public constructor(capacity: number, items?: SequenceObject[]) {
    this.capacity = capacity;
    this.data = {};
    if (items) {
      for (const item of items) {
        this.data[item.sequence] = item;
      }
      if (items.length > this.capacity) {
        this.keys = Object.keys(this.data);
        const deleteCount = this.keys.length - this.capacity;
        for (let i = 0; i < deleteCount; i++) {
          delete this.data[this.keys[i]];
        }
      }
    }
    this.keys = Object.keys(this.data);
    this.keysExpired = false;
  }

  public set(sequence: number, value: any) {
    this.data[sequence] = value;
    if (this.size > this.capacity) {
      this.keys = Object.keys(this.data);
      delete this.data[this.keys[0]];
    }
    this.keysExpired = true;
  }

  public get(index: number) {
    if (this.keysExpired) {
      this.keys = Object.keys(this.data);
      this.keysExpired = false;
    }
    return this.data[this.keys[index]];
  }

  public getBySequence(sequence: number) {
    return this.data[sequence];
  }

  public delete(index: number) {
    if (this.keysExpired) {
      this.keys = Object.keys(this.data);
      this.keysExpired = false;
    }
    delete this.data[this.keys[index]];
    this.keysExpired = true;
  }

  public deleteBySequence(sequence: number) {
    delete this.data[sequence];
    this.keysExpired = true;
  }

  public findContinuousSequenceFromLast(length: number) {
    if (this.keysExpired) {
      this.keys = Object.keys(this.data);
      this.keysExpired = false;
    }
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
    if (this.keysExpired) {
      this.keys = Object.keys(this.data);
      this.keysExpired = false;
    }
    const last = this.keys[this.keys.length - 1];
    return this.data[last];
  }

  public get size() {
    if (this.keysExpired) {
      this.keys = Object.keys(this.data);
      this.keysExpired = false;
    }
    return this.keys.length;
  }

  public forEach(
    callback: (value: {}, index: number, array: {}[]) => void,
    thisArg?: any
  ) {
    if (this.keysExpired) {
      this.keys = Object.keys(this.data);
      this.keysExpired = false;
    }
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
