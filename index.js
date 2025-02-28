// index.js - Archivo principal para probar el SmartContract
import SmartContract from './SmartContract.js';

const contract = new SmartContract("Construcción de Carretera", 10000);

contract.addAuditor("Auditor1");
contract.addAuditor("Auditor2");

contract.addMilestone("Cimentación", 3000);
contract.addMilestone("Asfaltado", 5000);

contract.approveMilestone("Cimentación", "Auditor1");
contract.approveMilestone("Cimentación", "Auditor2");

contract.makeTransaction("Gobierno", "Contratista", 3000);

contract.displayProjectHistory();
contract.displayTransactionsForUser("Gobierno");