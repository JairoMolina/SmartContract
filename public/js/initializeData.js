// initializeData.js - Archivo para inicializar datos de ejemplo en la aplicación

// Importa la clase del contrato inteligente
import ProjectManagementContract from './SmartContract.js';

// Crea una nueva instancia del contrato
const contract = new ProjectManagementContract();

// Llama al método que carga datos de ejemplo predefinidos
const result = contract.initializeExampleData();

// Muestra en consola el resultado de la inicialización
console.log(result);

// Muestra en consola la cantidad de proyectos cargados
console.log(`Proyectos activos: ${contract.activeProjects.size}`);
console.log(`Proyectos completados: ${contract.completedProjects.size}`);

// Exporta la instancia del contrato ya inicializada para usarla en otros archivos
export default contract;