class Node {
    value: number;
    next: Node | null;

    constructor(value: number) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    head: Node | null;
    size: number;

    constructor() {
        this.head = null;
        this.size = 0;
    }

    insertAtBeginning(value: number): void {
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }

    insertAtEnd(value: number): void {
        const newNode = new Node(value);
        
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    deleteAtBeginning(): number | null {
        if (!this.head) {
            return null;
        }

        const value = this.head.value;
        this.head = this.head.next;
        this.size--;
        return value;
    }

    deleteAtEnd(): number | null {
        if (!this.head) {
            return null;
        }

        if (!this.head.next) {
            const value = this.head.value;
            this.head = null;
            this.size--;
            return value;
        }

        let current = this.head;
        while (current.next && current.next.next) {
            current = current.next;
        }

        const value = current.next!.value;
        current.next = null;
        this.size--;
        return value;
    }

    search(value: number): boolean {
        let current = this.head;
        while (current) {
            if (current.value === value) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    reverse(): void {
        let prev = null;
        let current = this.head;
        let next = null;

        while (current) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        this.head = prev;
    }

    clear(): void {
        this.head = null;
        this.size = 0;
    }

    toArray(): number[] {
        const result: number[] = [];
        let current = this.head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }
}

// Global linked list instance
const linkedList = new LinkedList();

// DOM manipulation functions
function updateDisplay(): void {
    const display = document.querySelector('.linked-list-display');
    if (!display) return;

    display.innerHTML = '';
    const nodes = linkedList.toArray();

    nodes.forEach((value, index) => {
        const nodeDiv = document.createElement('div');
        nodeDiv.className = 'node';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'node-content';
        contentDiv.textContent = value.toString();
        
        nodeDiv.appendChild(contentDiv);
        
        if (index < nodes.length - 1) {
            const pointer = document.createElement('div');
            pointer.className = 'node-pointer';
            nodeDiv.appendChild(pointer);
        }
        
        display.appendChild(nodeDiv);
    });
}

function showMessage(message: string, isError: boolean = false): void {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isError ? 'error' : 'success'}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    setTimeout(() => messageDiv.classList.add('show'), 10);
    
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Event handlers
function insertAtBeginning(): void {
    const input = document.getElementById('nodeValue') as HTMLInputElement;
    const value = parseInt(input.value);
    
    if (isNaN(value)) {
        showMessage('Please enter a valid number', true);
        return;
    }
    
    linkedList.insertAtBeginning(value);
    updateDisplay();
    showMessage(`Inserted ${value} at the beginning`);
    input.value = '';
}

function insertAtEnd(): void {
    const input = document.getElementById('nodeValue') as HTMLInputElement;
    const value = parseInt(input.value);
    
    if (isNaN(value)) {
        showMessage('Please enter a valid number', true);
        return;
    }
    
    linkedList.insertAtEnd(value);
    updateDisplay();
    showMessage(`Inserted ${value} at the end`);
    input.value = '';
}

function deleteAtBeginning(): void {
    const value = linkedList.deleteAtBeginning();
    if (value === null) {
        showMessage('List is empty', true);
        return;
    }
    
    updateDisplay();
    showMessage(`Deleted ${value} from the beginning`);
}

function deleteAtEnd(): void {
    const value = linkedList.deleteAtEnd();
    if (value === null) {
        showMessage('List is empty', true);
        return;
    }
    
    updateDisplay();
    showMessage(`Deleted ${value} from the end`);
}

function searchNode(): void {
    const input = document.getElementById('nodeValue') as HTMLInputElement;
    const value = parseInt(input.value);
    
    if (isNaN(value)) {
        showMessage('Please enter a valid number', true);
        return;
    }
    
    const found = linkedList.search(value);
    showMessage(found ? `Found ${value} in the list` : `${value} not found in the list`, !found);
    input.value = '';
}

function reverseList(): void {
    linkedList.reverse();
    updateDisplay();
    showMessage('List reversed');
}

function clearList(): void {
    linkedList.clear();
    updateDisplay();
    showMessage('List cleared');
}

// Initialize display
updateDisplay();