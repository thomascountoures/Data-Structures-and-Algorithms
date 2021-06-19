const SinglyLinkedList = require('./singly-linkedlist');

class HashTable {
  constructor(size) {
    this.size = size;
    this.buckets = Array(size);

    for (let i = 0; i < this.size; i++) {
      this.buckets[i] = new SinglyLinkedList();
    }
  }

  hash(key) {
    let hashedKey = '';
    for (let i = 0; i < key.length; i++) {
      hashedKey += key[i].charCodeAt();
    }
    return hashedKey % this.size;
  }

  insert(key, value) {
    if (!key || !value) throw new Error('Key and value required.');
    const hashedKey = this.hash(key);
    this.buckets[hashedKey].append(value);
    return value;
  }

  get(key) {
    if (!key) throw new Error('Please specify a key.');
    const hashedKey = this.hash(key);
    const value = this.buckets[hashedKey].find();
  }
}
