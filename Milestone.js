// Milestone.js - Representa un hito en el proyecto
class Milestone {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
        this.status = "Pendiente";
        this.approvedBy = new Set();
    }

    approve(auditor, totalAuditors) {
        this.approvedBy.add(auditor);
        if (this.approvedBy.size >= Math.ceil(totalAuditors / 2)) {
            this.status = "Aprobado";
        }
    }

    markAsPaid() {
        if (this.status === "Aprobado") {
            this.status = "Pagado";
        } else {
            console.log(`No se puede pagar el hito "${this.name}" hasta que sea aprobado.`);
        }
    }

    cancel() {
        this.status = "Cancelado";
    }
}

export default Milestone;