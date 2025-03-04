// SmartContract.js - Maneja la lógica del contrato inteligente
import Project from './Project.js';

// Clase principal que maneja el contrato inteligente
class SmartContract {
    // Constructor que inicializa el contrato con el nombre del proyecto y su presupuesto
    constructor(projectName, budget) {
        this.project = new Project(projectName, budget);
    }

    // Metodo para agregar un auditor al proyecto
    addAuditor(auditor) {
        this.project.addAuditor(auditor);
    }

    // Metodo para agregar un hito al proyecto con su nombre y costo
    addMilestone(name, cost) {
        this.project.addMilestone(name, cost);
    }

    // Metodo para aprobar un hito por parte de un auditor
    approveMilestone(name, auditor) {
        this.project.approveMilestone(name, auditor);
    }

    // Metodo para realizar una transacción entre dos usuarios
    makeTransaction(sender, receiver, amount) {
        this.project.makeTransaction(sender, receiver, amount);
    }

    // Metodo para mostrar el historial completo del proyecto
    displayProjectHistory() {
        this.project.displayProjectHistory();
    }

    // Metodo para mostrar las transacciones realizadas por un usuario específico
    displayTransactionsForUser(user) {
        this.project.displayTransactionsForUser(user);
    }
}

// Exporta la clase SmartContract para usarla en otros archivos
export default SmartContract;

