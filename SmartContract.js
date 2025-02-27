// SmartContract.js - Maneja la lógica del contrato inteligente
import Project from './Project.js';

class SmartContract {
    constructor(projectName, budget) {
        this.project = new Project(projectName, budget);
    }

    addMilestone(name, cost) {
        this.project.addMilestone(name, cost);
    }

    makeTransaction(sender, receiver, amount) {
        this.project.makeTransaction(sender, receiver, amount);
    }

    displayProjectHistory() {
        this.project.displayProjectHistory();
    }

    displayTransactionsForUser(user) {
        this.project.displayTransactionsForUser(user);
    }
}

export default SmartContract;
