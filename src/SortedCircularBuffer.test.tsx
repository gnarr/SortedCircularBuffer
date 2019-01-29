import { SortedCircularBuffer } from "./SortedCircularBuffer";

interface SequenceObject {
  sequence: number;
  [others: string]: any;
}

test("", () => {
  const b = new SortedCircularBuffer(5);
  b.set(5, "a");
  b.set(6, "b");
  b.set(3, "c");
  b.set(7, "d");
  b.set(9, "e");
  b.set(1, "g");
  expect(b.findContinuousSequenceFromLast(3)).toBe(1);
  expect(b.size).toBe(5);
  expect(b.get(0)).toBe("c");
  expect(b.getBySequence(9)).toBe("e");
  expect(b.get(3)).toBe("d");
  expect(b.getBySequence(7)).toBe("d");
  b.delete(3);
  expect(b.get(3)).toBe("e");
  expect(b.getBySequence(7)).toBe(undefined);
  b.set(7, "d");
  expect(b.get(3)).toBe("d");
  expect(b.getBySequence(7)).toBe("d");
  b.deleteBySequence(7);
  expect(b.get(3)).toBe("e");
  expect(b.getBySequence(7)).toBe(undefined);
  const data: SequenceObject[] = [
    {
      discontinuity: false,
      channel: "dbedc594-93af-4742-95e6-549116d201c7",
      profile: "400",
      bitrate: "400",
      path: "400/GzgVBWAWk.ts",
      timestamp: "2019-01-28T12:29:54.848Z",
      duration: "4",
      sequence: 5253187,
      codecs: "avc1.4d001f,mp4a.40.2",
      iv: "3889815636b300d9f05edf74f577c8fc",
      key: "9c076f9092c6f42d5f8f39a8fca63796"
    },
    {
      discontinuity: false,
      channel: "dbedc594-93af-4742-95e6-549116d201c7",
      profile: "400",
      bitrate: "400",
      path: "400/vn2kl4gGG.ts",
      timestamp: "2019-01-28T12:29:58.167Z",
      duration: "4",
      sequence: 5253188,
      codecs: "avc1.4d001f,mp4a.40.2",
      iv: "3889815636b300d9f05edf74f577c8fc",
      key: "9c076f9092c6f42d5f8f39a8fca63796"
    },
    {
      discontinuity: false,
      channel: "dbedc594-93af-4742-95e6-549116d201c7",
      profile: "400",
      bitrate: "400",
      path: "400/QO25jQlP4.ts",
      timestamp: "2019-01-28T12:30:02.556Z",
      duration: "4",
      sequence: 5253189,
      codecs: "avc1.4d001f,mp4a.40.2",
      iv: "3889815636b300d9f05edf74f577c8fc",
      key: "9c076f9092c6f42d5f8f39a8fca63796"
    },
    {
      discontinuity: false,
      channel: "dbedc594-93af-4742-95e6-549116d201c7",
      profile: "400",
      bitrate: "400",
      path: "400/Rje0d3jMq.ts",
      timestamp: "2019-01-28T12:30:06.938Z",
      duration: "4",
      sequence: 5253190,
      codecs: "avc1.4d001f,mp4a.40.2",
      iv: "3889815636b300d9f05edf74f577c8fc",
      key: "9c076f9092c6f42d5f8f39a8fca63796"
    },
    {
      discontinuity: false,
      channel: "dbedc594-93af-4742-95e6-549116d201c7",
      profile: "400",
      bitrate: "400",
      path: "400/kgdyAzn4D.ts",
      timestamp: "2019-01-28T12:30:10.239Z",
      duration: "4",
      sequence: 5253191,
      codecs: "avc1.4d001f,mp4a.40.2",
      iv: "3889815636b300d9f05edf74f577c8fc",
      key: "9c076f9092c6f42d5f8f39a8fca63796"
    },
    {
      discontinuity: false,
      channel: "dbedc594-93af-4742-95e6-549116d201c7",
      profile: "400",
      bitrate: "400",
      path: "400/n69Pv84Dr.ts",
      timestamp: "2019-01-28T12:30:14.611Z",
      duration: "4",
      sequence: 5253192,
      codecs: "avc1.4d001f,mp4a.40.2",
      iv: "3889815636b300d9f05edf74f577c8fc",
      key: "9c076f9092c6f42d5f8f39a8fca63796"
    }
  ];
  const c = new SortedCircularBuffer(5, data);
  expect(c.size).toBe(5);
  expect(c.getBySequence(5253187)).toBeUndefined();
  expect(c.getBySequence(5253188).path).toBe("400/vn2kl4gGG.ts");
});
