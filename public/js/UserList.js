// UserList.js - Clases para gestionar usuarios

// Clase Nodo para usuarios
class UserNode {
    constructor(username, data) {
        this.username = username;
        this.data = data;
        this.next = null;
    }
}

// Clase LinkedList para usuarios
export class UserLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    
    // Añadir un usuario
    add(username, data) {
        // Verificar si el usuario ya existe
        if (this.find(username)) {
            return false;
        }
        
        const newNode = new UserNode(username, data);
        
        // Si la lista está vacía
        if (!this.head) {
            this.head = newNode;
        } else {
            // Añadir al final de la lista
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        
        this.size++;
        return true;
    }
    
    // Encontrar un usuario por nombre
    find(username) {
        let current = this.head;
        
        while (current) {
            if (current.username === username) {
                return current;
            }
            current = current.next;
        }
        
        return null;
    }
    
    // Eliminar un usuario
    remove(username) {
        // Si la lista está vacía
        if (!this.head) {
            return false;
        }
        
        // Si el nodo a eliminar es el primero
        if (this.head.username === username) {
            this.head = this.head.next;
            this.size--;
            return true;
        }
        
        // Buscar el nodo a eliminar
        let current = this.head;
        while (current.next && current.next.username !== username) {
            current = current.next;
        }
        
        // Si se encontró el nodo
        if (current.next) {
            current.next = current.next.next;
            this.size--;
            return true;
        }
        
        return false;
    }
    
    // Obtener todos los nombres de usuario
    getAllUsernames() {
        const usernames = [];
        let current = this.head;
        
        while (current) {
            usernames.push(current.username);
            current = current.next;
        }
        
        return usernames;
    }
    
    // Convertir la lista enlazada a un objeto
    toObject() {
        const obj = {};
        let current = this.head;
        
        while (current) {
            obj[current.username] = current.data;
            current = current.next;
        }
        
        return obj;
    }
}
