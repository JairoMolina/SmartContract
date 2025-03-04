// ProjectList.js - Clases para gestionar proyectos

// Clase Nodo para proyectos
class ProjectNode {
    constructor(project) {
        this.project = project;
        this.next = null;
    }
}

// Clase LinkedList para proyectos
export class ProjectLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    
    // Añadir un proyecto
    add(project) {
        const newNode = new ProjectNode(project);
        
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
    
    // Encontrar un proyecto por ID
    find(projectId) {
        let current = this.head;
        
        while (current) {
            if (current.project.id === projectId) {
                return current;
            }
            current = current.next;
        }
        
        return null;
    }
    
    // Eliminar un proyecto
    remove(projectId) {
        // Si la lista está vacía
        if (!this.head) {
            return null;
        }
        
        // Si el nodo a eliminar es el primero
        if (this.head.project.id === projectId) {
            const removedProject = this.head.project;
            this.head = this.head.next;
            this.size--;
            return removedProject;
        }
        
        // Buscar el nodo a eliminar
        let current = this.head;
        while (current.next && current.next.project.id !== projectId) {
            current = current.next;
        }
        
        // Si se encontró el nodo
        if (current.next) {
            const removedProject = current.next.project;
            current.next = current.next.next;
            this.size--;
            return removedProject;
        }
        
        return null;
    }
    
    // Obtener todos los proyectos como un array
    getAllProjects() {
        const projects = [];
        let current = this.head;
        
        while (current) {
            projects.push(current.project);
            current = current.next;
        }
        
        return projects;
    }
}
