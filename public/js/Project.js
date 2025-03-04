// Project.js - Representa un proyecto con una lista enlazada de hitos
import LinkedList from './LinkedList.js';
import Milestone from './Milestone.js';

// Función para generar un ID único para cada contrato
function generateUniqueId() {
    return 'SC-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 9);
}

class Project {
    // Constructor que inicializa un proyecto con nombre, presupuesto y estructura de hitos
    constructor(name, budget) {
        this.id = generateUniqueId();  // Genera un ID único para el proyecto
        this.name = name;               // Nombre del proyecto
        this.budget = budget;           // Presupuesto del proyecto
        this.milestones = new LinkedList(); // Lista enlazada para los hitos
        this.auditors = new Set();      // Conjunto para los auditores
        this.history = new LinkedList(); // Lista enlazada para el historial de acciones
        this.penalties = 0;             // Penalizaciones acumuladas
        this.transactions = new LinkedList(); // Lista enlazada para las transacciones
    }

    // Metodo para agregar un auditor al conjunto de auditores
    addAuditor(auditor) {
        this.auditors.add(auditor);
    }

    // Metodo para agregar un hito al proyecto
    addMilestone(name, cost) {
        if (cost > this.budget) {  // Verifica si el presupuesto es suficiente para el hito
            console.log(`Error: Presupuesto insuficiente para el hito ${name}.`);
            return;
        }
        const milestone = new Milestone(name, cost);  // Crea un nuevo hito
        console.log("Nuevo milestone creado:", milestone); // Depuración
        this.milestones.add(milestone);  // Agrega el hito a la lista enlazada de hitos
        this.history.add({ action: "Milestone agregado", milestone: name, status: milestone.status });  // Registra la acción en el historial
    }

    // Metodo para aprobar un hito por parte de un auditor
    approveMilestone(milestoneName, auditor) {
        let current = this.milestones.head;  // Comienza a recorrer la lista de hitos
        while (current) {
            console.log("Tipo de current.data:", current.data.constructor.name); // Depuración
            if (current.data.name === milestoneName) {  // Busca el hito por nombre
                if (current.data instanceof Milestone) {  // Verifica que sea una instancia válida de Milestone
                    current.data.approve(auditor, this.auditors.size);  // Aprueba el hito
                    this.history.add({ action: "Milestone aprobado", milestone: milestoneName, auditor });  // Registra la acción en el historial
                } else {
                    console.error(`Error: ${milestoneName} no es una instancia válida de Milestone.`);
                }
                return;
            }
            current = current.next;  // Continúa con el siguiente hito
        }
        console.log(`Hito "${milestoneName}" no encontrado.`);  // Mensaje si no se encuentra el hito
    }

    // Metodo para realizar una transacción entre dos usuarios
    makeTransaction(sender, receiver, amount) {
        if (this.budget < amount) {  // Verifica si el presupuesto es suficiente para la transacción
            console.log(`Transacción fallida: Saldo insuficiente.`);
            return;
        }
        this.budget -= amount;  // Resta el monto de la transacción al presupuesto
        this.transactions.add({ sender, receiver, amount });  // Agrega la transacción a la lista enlazada de transacciones
        console.log(`Transacción exitosa: ${sender} envió ${amount} a ${receiver}.`);  // Mensaje de éxito
    }

    // Metodo para mostrar el historial de acciones del proyecto
    displayProjectHistory() {
        console.log(`Historial de acciones del proyecto ${this.name}:`);
        this.history.display();  // Muestra el historial de acciones
    }

    // Metodo para mostrar las transacciones realizadas por un usuario específico
    displayTransactionsForUser(user) {
        console.log(`Historial de transacciones para ${user}:`);
        let current = this.transactions.head;  // Comienza a recorrer la lista de transacciones
        while (current) {
            if (current.data.sender === user || current.data.receiver === user) {  // Verifica si el usuario es el emisor o receptor
                console.log(current.data);  // Muestra la transacción
            }
            current = current.next;  // Continúa con la siguiente transacción
        }
    }
}

export default Project;
