
namespace ulib {

    export interface ILinkedListNode {
        next: ILinkedListNode,
        prev: ILinkedListNode,
        value: {}
    }

    export class LinkedList {

        private rootNode: ILinkedListNode;
        private count = 0;
        private topNode: ILinkedListNode;

        constructor() {
            this.rootNode = this.createNewLinkedListNode('root');
            this.topNode = this.rootNode;
        }

        private createNewLinkedListNode(value: {}): ILinkedListNode {
            return {
                next: null,
                prev: null,
                value: value
            }
        }

        public toArray(): any[] {
            let currentNode = this.rootNode;
            let items = [];
            while (currentNode != this.topNode) {
                currentNode = currentNode.next;
                items.push(currentNode.value);
            }
            return items;
        }

        public getCount() {
            return this.count;
        }

        public add(value) {
            let newNode = this.createNewLinkedListNode(value);
            newNode.prev = this.topNode;
            this.topNode.next = newNode;
            this.topNode = newNode;
            this.count++;
        }

        public getNodeByValue(value) {
            let current = this.rootNode;
            while (current.next != null) {
                if (current.next.value === value) { return current.next; }
                current = current.next;
            }
            return null;
        }

        public getNodeBySelector(selector) {
            let current = this.rootNode;
            while (current.next != null) {
                if (selector(current.next.value)) { return current.next; }
                current = current.next;
            }
            return null;
        }

        public removeByValue(value) {
            let node = this.getNodeByValue(value);
            this.removeByNode(node);
        }

        public removeBySelector(selector) {
            let node = this.getNodeBySelector(selector);
            return this.removeByNode(node);
        }

        public removeByNode(node) {
            if (node == null) return false;
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

        public getLastValue(): any  {
            if (this.isEmpty())
                return null;
            else
                return this.topNode.value;
        }

        public removeFirst(): ILinkedListNode  {
            if (this.isEmpty()) {
                return null;
            }
            else
            {
                let nodeRef = this.rootNode.next;
                this.removeByNode(this.rootNode.next);
                return nodeRef;
            }  
        }

        public pop(): ILinkedListNode {
            if (this.isEmpty()) {
                return null;
            }
            else {
                let nodeRef = this.topNode;
                this.removeByNode(this.topNode);
                return nodeRef;
            }
        }

        public isEmpty() {
            if (this.rootNode === this.topNode)
                return true;
            else
                return false
        }

    }

}