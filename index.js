import SmartContract from './SmartContract.js';

const contract = new SmartContract("Construcción de Puente", 50000);

console.log("Agregando hitos...");
contract.addMilestone("Estructura", 20000);
contract.addMilestone("Pavimentación", 15000);
contract.addMilestone("Señalización", 5000);

console.log("\nMostrando historial del proyecto:");
contract.displayProjectHistory();

console.log("\nRealizando transacciones...");
contract.makeTransaction("Gobierno", "Constructora XYZ", 20000);
contract.makeTransaction("Gobierno", "Proveedor Materiales", 15000);

console.log("\nMostrando transacciones del Gobierno:");
contract.displayTransactionsForUser("Gobierno");

console.log("\nMostrando historial actualizado:");
contract.displayProjectHistory();
