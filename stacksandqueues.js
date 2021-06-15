/**
 * Stack and Queue Implementation
 *
 * Created by Thomas Countoures
 */
class Queue {
  constructor(size) {
    this.head = this.tail = 0;
    this.size = size;
    this.queue = [];
  }

  enqueue(value) {
    this.queue.push(value);
    this.size++;
    this.tail++;
    return this;
  }

  getSize() {
    return this.queue.length;
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  dequeue() {
    this.size--;
    return this.queue.shift();
  }

  dequeueAll() {
    while (!this.isEmpty()) {
      this.queue.dequeue();
    }
  }

  peek() {
    return this.isEmpty() ? undefined : this.queue[0];
  }
}

class Stack {
  constructor(size) {
    this.stack = [];
    this.size = size;
  }

  isEmpty() {
    return this.stack.length === 0;
  }

  getSize() {
    return this.stack.length;
  }

  push(value) {
    this.stack.push(value);
    this.size++;
    return this;
  }

  pop() {
    const value = this.stack.pop();
    this.size--;
    return value;
  }

  peek() {
    return this.isEmpty() ? undefined : this.stack[this.stack.length - 1];
  }
}

module.exports = {
  Queue,
  Stack,
};
