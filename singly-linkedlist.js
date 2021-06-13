/**
 * Singly Linked List
 * No reference to tail
 * 
 * Created by Thomas Countoures
 */
class SinglyLinkedList {
    constructor() {
        this.head = null;
    }

    getHead() {
        return this.head;
    }

    replaceHead(value) {
        if(!this.head) this.head = new Node(value);
        else {
            const newNode = new Node(value);
            newNode.next = this.head;
            this.head = newNode;
            return this;
        }
    }

    replaceTail(value) {
        if(!this.head) return null;
        const newNode = new Node(value);
        let currentNode = this.head;

        while(currentNode) {
            if(currentNode.next !== null) currentNode = currentNode.next;
            else {
                currentNode.next = newNode;
                break;
            }
        }

        return this;
    }

    insert(value, index) {
        if(!this.head) return null;
        if(index === 0) return this.replaceHead(value);

        let currentNode = this.head;
        let previousNode = null;
        let counter = 0;
        while(currentNode) {
            if(counter !== index) {
                previousNode = currentNode;
                currentNode = currentNode.next;
                counter++;
            } else {
                const newNode = new Node(value);
                previousNode.next = newNode;
                newNode.next = currentNode;
                break;
            }
        }
        return this;
    }

    append(value) {
        if(!this.head) this.replaceHead(value);
        else {
            let currentNode = this.head;
        
            while(currentNode) {
                if(currentNode.next !== null) currentNode = currentNode.next;
                else {
                    currentNode.next = new Node(value);
                    break;
                }
            }
        }
        
        return this;
    }

    find(index) {
        if(!this.head) return null;
        let currentNode = this.head;
        let counter = 0;
        while(currentNode) {
            if(counter !== index) {
                currentNode = currentNode.next;
                counter++;
            } 
            else return currentNode; 
        }
    }

    remove(index) {
        if(!this.head) return null;
        let currentNode = this.head;
        let previousNode = null;
        let counter = 0;
        while(currentNode) {
            if(counter !== index) {
                previousNode = currentNode;
                currentNode = currentNode.next;
                counter++;
            } else {
                previousNode.next = currentNode.next;
                currentNode.next = null;
                break;
            }
        }    
        return this;
    }
}

class Node {
    constructor(value, next) {
        this.value = value;
        this.next = next || null;
    }
}

module.exports = {
    SinglyLinkedList,
    Node
}

// Demo
const linkedList = new SinglyLinkedList();
linkedList.append(2).append(3);
console.log(linkedList);