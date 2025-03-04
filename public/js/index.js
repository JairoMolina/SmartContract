import ContractManager from './ContractManager.js';

// Crear una instancia del gestor de contratos
const contractManager = new ContractManager();

// Inicializar el gestor
contractManager.init();

// Crear un nuevo proyecto
console.log("Creando un proyecto...");
contractManager.createProject("Proyecto de Infraestructura", 1000000);

// Agregar un auditor
console.log("Agregando un auditor...");
contractManager.addAuditor("Auditor 1");

// Agregar un hito
console.log("Agregando un hito...");
contractManager.addMilestone("Construcción de la carretera", 200000);

// Aprobar un hito
console.log("Aprobando un hito...");
contractManager.approveMilestone("Construcción de la carretera", "Auditor 1");

// Realizar una transacción
console.log("Realizando una transacción...");
contractManager.makeTransaction("Gobierno", "Contratista", 50000);

// Mostrar historial del proyecto
console.log("Mostrando historial del proyecto...");
contractManager.showProjectHistory();

// Ver transacciones de un usuario
console.log("Mostrando transacciones para el contratista...");
contractManager.viewUserTransactions("Contratista");
