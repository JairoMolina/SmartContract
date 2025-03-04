// Milestone.js - Representa un hito en el proyecto
class Milestone {
    // Constructor que inicializa un hito con nombre, costo y estado pendiente
    constructor(name, cost) {
        this.name = name;          // Nombre del hito
        this.cost = cost;          // Costo del hito
        this.status = "Pendiente"; // Estado inicial del hito
        this.approvedBy = new Set(); // Conjunto de auditores que aprueban el hito
    }

    // Metodo para aprobar el hito por un auditor
    approve(auditor, totalAuditors) {
        this.approvedBy.add(auditor);  // Agrega el auditor que aprueba el hito
        if (this.approvedBy.size >= Math.ceil(totalAuditors / 2)) {  // Verifica si el hito tiene suficiente aprobacion
            this.status = "Aprobado";  // Cambia el estado a aprobado
        }
    }

    // Metodo para marcar el hito como pagado si esta aprobado
    markAsPaid() {
        if (this.status === "Aprobado") {  // Verifica si el hito esta aprobado
            this.status = "Pagado";  // Cambia el estado a pagado
        } else {
            console.log(`No se puede pagar el hito "${this.name}" hasta que sea aprobado.`);  // Mensaje si no esta aprobado
        }
    }

    // Metodo para cancelar el hito
    cancel() {
        this.status = "Cancelado";  // Cambia el estado a cancelado
    }
}

export default Milestone;