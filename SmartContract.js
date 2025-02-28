// SmartContract.js - Maneja la lógica del contrato inteligente
import Project from './Project.js';

class SmartContract {
    constructor(projectName, budget) {
        this.project = new Project(projectName, budget);
    }

    addAuditor(auditor) {
        this.project.addAuditor(auditor);
    }

    addMilestone(name, cost) {
        this.project.addMilestone(name, cost);
    }

    approveMilestone(name, auditor) {
        this.project.approveMilestone(name, auditor);
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
