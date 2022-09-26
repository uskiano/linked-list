var ulib;
(function (ulib) {
    class LinkedList {
        constructor() {
            this.count = 0;
            this.rootNode = this.createNewLinkedListNode('root');
            this.topNode = this.rootNode;
        }
        createNewLinkedListNode(value) {
            return {
                next: null,
                prev: null,
                value: value
            };
        }
        toArray() {
            let currentNode = this.rootNode;
            let items = [];
            while (currentNode != this.topNode) {
                currentNode = currentNode.next;
                items.push(currentNode.value);
            }
            return items;
        }
        getCount() {
            return this.count;
        }
        add(value) {
            let newNode = this.createNewLinkedListNode(value);
            newNode.prev = this.topNode;
            this.topNode.next = newNode;
            this.topNode = newNode;
            this.count++;
        }
        getNodeByValue(value) {
            let current = this.rootNode;
            while (current.next != null) {
                if (current.next.value === value) {
                    return current.next;
                }
                current = current.next;
            }
            return null;
        }
        getNodeBySelector(selector) {
            let current = this.rootNode;
            while (current.next != null) {
                if (selector(current.next.value)) {
                    return current.next;
                }
                current = current.next;
            }
            return null;
        }
        removeByValue(value) {
            let node = this.getNodeByValue(value);
            this.removeByNode(node);
        }
        removeBySelector(selector) {
            let node = this.getNodeBySelector(selector);
            return this.removeByNode(node);
        }
        removeByNode(node) {
            if (node == null)
                return false;
            node.prev.next = node.next;
            if (node !== this.topNode) {
                node.next.prev = node.prev;
            }
            else {
                this.topNode = node.prev;
            }
            this.count--;
            return true;
        }
        getLastValue() {
            if (this.isEmpty())
                return null;
            else
                return this.topNode.value;
        }
        removeFirst() {
            if (this.isEmpty()) {
                return null;
            }
            else {
                let nodeRef = this.rootNode.next;
                this.removeByNode(this.rootNode.next);
                return nodeRef;
            }
        }
        pop() {
            if (this.isEmpty()) {
                return null;
            }
            else {
                let nodeRef = this.topNode;
                this.removeByNode(this.topNode);
                return nodeRef;
            }
        }
        isEmpty() {
            if (this.rootNode === this.topNode)
                return true;
            else
                return false;
        }
    }
    ulib.LinkedList = LinkedList;
})(ulib || (ulib = {}));
