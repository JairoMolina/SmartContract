// Importa la clase Node para los nodos de la lista
import Node from './Node.js';

class LinkedList {
    constructor() {
        this.head = null; // Primer nodo de la lista
    }

    // Agrega una transacción al final de la lista
    addTransaction(data) {
        const newNode = new Node(data);
        if (!this.head) {
            // Si la lista está vacía
            this.head = newNode;
        } else {
            // Busca el último nodo
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    // Muestra todas las transacciones en consola
    displayTransactions() {
        let current = this.head;
        while (current) {
            console.log(current.data);
            current = current.next;
        }
    }
}
export default LinkedList;
