"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SortedCircularBuffer_1 = require("./SortedCircularBuffer");
test("", function () {
    var b = new SortedCircularBuffer_1.SortedCircularBuffer(5);
    b.set(5, "a");
    b.set(6, "b");
    b.set(3, "c");
    b.set(7, "d");
    b.set(9, "e");
    b.set(1, "g");
    expect(b.size).toBe(5);
    expect(b.get(0)).toBe("c");
});
