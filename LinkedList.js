// LinkedList.js - Implementa la estructura de lista enlazada
import Node from './Node.js';

class LinkedList {
    constructor() {
        this.head = null;
    }

    // Agregar un nuevo nodo al final de la lista
    add(data) {
        const newNode = new Node(data); // data debe ser un objeto ya estructurado
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    // Eliminar un nodo basado en una condición
    remove(condition) {
        if (!this.head) return;

        if (condition(this.head.data)) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        while (current.next) {
            if (condition(current.next.data)) {
                current.next = current.next.next;
                return;
            }
            current = current.next;
        }
    }

    // Mostrar todos los elementos de la lista
    display() {
        let current = this.head;
        while (current) {
            console.log(current.data);
            current = current.next;
        }
    }
}

export default LinkedList;
