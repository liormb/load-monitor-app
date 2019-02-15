export default class Queue {
    constructor(props = {}) {
        this.capacity = props.capacity || 60;
        this.data = props.data || [];
    }
    enqueue(item) {
        if (this.isFull()) {
            this.dequeue();
        }
        this.data.unshift(item);
    }
    dequeue() {
        return this.data.pop();
    }
    rear() {
        return this.data[0];
    }
    front() {
        return this.data[this.size() - 1];
    }
    size() {
        return this.data.length;
    }
    isEmpty() {
        return !this.size();
    }
    isFull() {
        return this.size() >= this.capacity;
    }
    reset() {
        this.data = [];
    }
    print() {
        return this.data;
    }
}
