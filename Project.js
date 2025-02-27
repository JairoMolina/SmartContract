// Project.js - Representa un proyecto con una lista enlazada de hitos
import LinkedList from './LinkedList.js';
import Milestone from './Milestone.js';

class Project {
    constructor(name, budget) {
        this.name = name;
        this.budget = budget;
        this.milestones = new LinkedList();
        this.auditors = new Set();
        this.history = new LinkedList();
        this.penalties = 0;
        this.transactions = new LinkedList();
    }

    addMilestone(name, cost) {
        if (cost > this.budget) {
            console.log(`Error: Presupuesto insuficiente para el hito ${name}.`);
            return;
        }
        const milestone = new Milestone(name, cost);
        this.milestones.add(milestone);
        this.history.add({ action: "Milestone agregado", milestone: name, status: milestone.status });
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