"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SortedCircularBuffer = /** @class */ (function () {
    function SortedCircularBuffer(capacity) {
        this.capacity = capacity;
        this.data = {};
        this.keys = Object.keys(this.data);
    }
    SortedCircularBuffer.prototype.set = function (sequence, value) {
        this.data[sequence] = value;
        this.keys = Object.keys(this.data);
        if (this.size > this.capacity) {
            delete this.data[this.keys[0]];
            this.keys = Object.keys(this.data);
        }
    };
    SortedCircularBuffer.prototype.get = function (index) {
        return this.data[this.keys[index]];
    };
    SortedCircularBuffer.prototype.last = function () {
        var last = this.keys[this.keys.length - 1];
        return this.data[last];
    };
    Object.defineProperty(SortedCircularBuffer.prototype, "size", {
        get: function () {
            return this.keys.length;
        },
        enumerable: true,
        configurable: true
    });
    SortedCircularBuffer.prototype.forEach = function (callback, thisArg) {
        var that = thisArg || this;
        var keys = that.keys;
        var values = Object.values(that.data);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var item = that.data[key];
            callback(item, i, values);
        }
    };
    return SortedCircularBuffer;
}());
exports.SortedCircularBuffer = SortedCircularBuffer;
