// Project.js - Representa un proyecto con una lista enlazada de hitos
import LinkedList from './LinkedList.js';
import Milestone from './Milestone.js';

// Generar un ID único para cada contrato
function generateUniqueId() {
    return 'SC-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 9);
}

class Project {
    constructor(name, budget) {
        this.id = generateUniqueId();
        this.name = name;
        this.budget = budget;
        this.milestones = new LinkedList();
        this.auditors = new Set();
        this.history = new LinkedList();
        this.penalties = 0;
        this.transactions = new LinkedList();
    }

    addAuditor(auditor) {
        this.auditors.add(auditor);
    }

    addMilestone(name, cost) {
        if (cost > this.budget) {
            console.log(`Error: Presupuesto insuficiente para el hito ${name}.`);
            return;
        }
        const milestone = new Milestone(name, cost);
        console.log("Nuevo milestone creado:", milestone); // Depuración
        this.milestones.add(milestone);
        this.history.add({ action: "Milestone agregado", milestone: name, status: milestone.status });
    }

    approveMilestone(milestoneName, auditor) {
        let current = this.milestones.head;
        while (current) {
            console.log("Tipo de current.data:", current.data.constructor.name); // Depuración
            if (current.data.name === milestoneName) {
                if (current.data instanceof Milestone) {
                    current.data.approve(auditor, this.auditors.size);
                    this.history.add({ action: "Milestone aprobado", milestone: milestoneName, auditor });
                } else {
                    console.error(`Error: ${milestoneName} no es una instancia válida de Milestone.`);
                }
                return;
            }
            current = current.next;
        }
        console.log(`Hito "${milestoneName}" no encontrado.`);
    }

    makeTransaction(sender, receiver, amount) {
        if (this.budget < amount) {
            console.log(`Transacción fallida: Saldo insuficiente.`);
            return;
        }
        this.budget -= amount;
        this.transactions.add({ sender, receiver, amount });
        console.log(`Transacción exitosa: ${sender} envió ${amount} a ${receiver}.`);
    }

    displayProjectHistory() {
        console.log(`Historial de acciones del proyecto ${this.name}:`);
        this.history.display();
    }

    displayTransactionsForUser(user) {
        console.log(`Historial de transacciones para ${user}:`);
        let current = this.transactions.head;
        while (current) {
            if (current.data.sender === user || current.data.receiver === user) {
                console.log(current.data);
            }
            current = current.next;
        }
    }
}

export default Project;
