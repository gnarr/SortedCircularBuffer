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
    SortedCircularBuffer.prototype.getBySequence = function (sequence) {
        return this.data[sequence];
    };
    SortedCircularBuffer.prototype.delete = function (index) {
        delete this.data[this.keys[index]];
        this.keys = Object.keys(this.data);
    };
    SortedCircularBuffer.prototype.deleteBySequence = function (sequence) {
        delete this.data[sequence];
        this.keys = Object.keys(this.data);
    };
    SortedCircularBuffer.prototype.findContinuousSequenceFromLast = function (length) {
        var progress = 1;
        var sequence = -1;
        for (var i = this.size - 1; i >= 0; --i) {
            var nextSeq = parseInt(this.keys[i], 10);
            if (sequence - nextSeq === 1) {
                progress++;
            }
            if (progress === length) {
                return i;
            }
            sequence = nextSeq;
        }
        return -1;
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
