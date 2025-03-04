import SmartContract from './SmartContract.js';

// Clase para manejar el estado de la aplicacion
class ContractManager {
    constructor() {
        this.contract = null;
        this.messageCount = 0;
        this.MAX_MESSAGES = 50;
    }

    // Inicializar el gestor de contratos
    init() {
        this.showMessage('Sistema listo. Cree un proyecto para comenzar.');
    }

    // Crear un nuevo proyecto/contrato
    createProject(name, budget) {
        this.validateInput({ name, budget }, ['name', 'budget']);

        try {
            this.contract = new SmartContract(name, budget);
            this.showMessage(`Proyecto "${name}" creado con exito. Presupuesto: ${budget}`);
            return true;
        } catch (error) {
            this.handleError('Error al crear el proyecto', error);
            return false;
        }
    }

    // Agregar un auditor al contrato
    addAuditor(name) {
        if (!this.validateContractExists()) return false;
        this.validateInput({ name }, ['name']);

        try {
            this.contract.addAuditor(name);
            this.showMessage(`Auditor "${name}" agregado con exito.`);
            return true;
        } catch (error) {
            this.handleError('Error al agregar auditor', error);
            return false;
        }
    }

    // Agregar un hito al contrato
    addMilestone(name, cost) {
        if (!this.validateContractExists()) return false;
        this.validateInput({ name, cost }, ['name', 'cost']);

        try {
            this.contract.addMilestone(name, cost);
            this.showMessage(`Hito "${name}" agregado con exito. Costo: ${cost}`);
            return true;
        } catch (error) {
            this.handleError('Error al agregar hito', error);
            return false;
        }
    }

    // Aprobar un hito existente
    approveMilestone(milestoneName, auditorName) {
        if (!this.validateContractExists()) return false;
        this.validateInput({ milestoneName, auditorName }, ['milestoneName', 'auditorName']);

        try {
            this.contract.approveMilestone(milestoneName, auditorName);
            this.showMessage(`Hito "${milestoneName}" aprobado por "${auditorName}".`);
            return true;
        } catch (error) {
            this.handleError('Error al aprobar hito', error);
            return false;
        }
    }

    // Realizar una transaccion
    makeTransaction(sender, receiver, amount) {
        if (!this.validateContractExists()) return false;
        this.validateInput({ sender, receiver, amount }, ['sender', 'receiver', 'amount']);

        try {
            const messages = this.captureConsoleOutput(() => {
                this.contract.makeTransaction(sender, receiver, amount);
            });

            messages.forEach(msg => this.showMessage(msg));
            return true;
        } catch (error) {
            this.handleError('Error en la transaccion', error);
            return false;
        }
    }

    // Mostrar el historial del proyecto
    showProjectHistory() {
        if (!this.validateContractExists()) return false;

        try {
            this.showMessage('--- Historial del Proyecto ---');
            const messages = this.captureConsoleOutput(() => {
                this.contract.displayProjectHistory();
            });

            messages.forEach(msg => this.showMessage(msg));
            return true;
        } catch (error) {
            this.handleError('Error al mostrar historial', error);
            return false;
        }
    }

    // Mostrar transacciones de un usuario especifico
    viewUserTransactions(user) {
        if (!this.validateContractExists()) return false;
        this.validateInput({ user }, ['user']);

        try {
            this.showMessage(`--- Transacciones para ${user} ---`);
            const messages = this.captureConsoleOutput(() => {
                this.contract.displayTransactionsForUser(user);
            });

            messages.forEach(msg => this.showMessage(msg));
            return true;
        } catch (error) {
            this.handleError('Error al mostrar transacciones', error);
            return false;
        }
    }

    // Validar que exista un contrato activo
    validateContractExists() {
        if (!this.contract) {
            this.showMessage('Error: Primero debe crear un proyecto.');
            return false;
        }
        return true;
    }

    // Validar inputs segun tipo
    validateInput(inputs, requiredFields) {
        for (const field of requiredFields) {
            const value = inputs[field];

            if (field.includes('cost') || field.includes('amount') || field.includes('budget')) {
                // Validar campos numericos
                if (isNaN(parseFloat(value)) || parseFloat(value) <= 0) {
                    this.showMessage(`Error: El campo ${field} debe ser un numero valido mayor que cero.`);
                    return false;
                }
            } else {
                // Validar campos de texto
                if (!value || typeof value !== 'string' || value.trim() === '') {
                    this.showMessage(`Error: El campo ${field} es requerido.`);
                    return false;
                }
            }
        }
        return true;
    }

    // Capturar salida de console.log
    captureConsoleOutput(callback) {
        const originalConsoleLog = console.log;
        const messages = [];

        console.log = function(...args) {
            messages.push(args.join(' '));
            originalConsoleLog.apply(console, args);
        };

        try {
            callback();
        } finally {
            // Restaurar console.log original
            console.log = originalConsoleLog;
        }

        return messages;
    }

    // Mostrar mensaje en la interfaz
    showMessage(message) {
        const messageArea = document.getElementById('message-area');
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageArea.appendChild(messageElement);

        // Limitar la cantidad de mensajes
        this.messageCount++;
        if (this.messageCount > this.MAX_MESSAGES) {
            messageArea.removeChild(messageArea.firstChild);
            this.messageCount--;
        }

        // Desplazar hacia abajo para ver el mensaje mas reciente
        messageArea.scrollTop = messageArea.scrollHeight;
    }

    // Manejar errores de forma consistente
    handleError(context, error) {
        if (error instanceof TypeError || error instanceof ReferenceError) {
            this.showMessage(`${context}: Error interno del sistema - ${error.message}`);
            console.error(error);
        } else {
            this.showMessage(`${context}: ${error.message}`);
        }
    }

    // Limpiar los campos de un formulario
    clearFormFields(formId) {
        const form = document.getElementById(formId);
        if (form) {
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => input.value = '');
        }
    }
}

// Inicializar el gestor de contratos
const contractManager = new ContractManager();

// Funcion para mostrar solo el formulario seleccionado
window.showForm = function(formId) {
    // Ocultar todos los formularios
    document.querySelectorAll('.form-container').forEach(form => {
        form.style.display = 'none';
    });

    // Mostrar el formulario seleccionado
    document.getElementById(formId).style.display = 'block';
};

// Funciones de interfaz para los botones
window.createProject = function() {
    const name = document.getElementById('project-name').value;
    const budget = parseFloat(document.getElementById('project-budget').value);

    if (contractManager.createProject(name, budget)) {
        contractManager.clearFormFields('create-project');
    }
};

window.addAuditor = function() {
    const name = document.getElementById('auditor-name').value;

    if (contractManager.addAuditor(name)) {
        contractManager.clearFormFields('add-auditor');
    }
};

window.addMilestone = function() {
    const name = document.getElementById('milestone-name').value;
    const cost = parseFloat(document.getElementById('milestone-cost').value);

    if (contractManager.addMilestone(name, cost)) {
        contractManager.clearFormFields('add-milestone');
    }
};

window.approveMilestone = function() {
    const milestoneName = document.getElementById('approve-milestone-name').value;
    const auditorName = document.getElementById('approving-auditor').value;

    if (contractManager.approveMilestone(milestoneName, auditorName)) {
        contractManager.clearFormFields('approve-milestone');
    }
};

window.makeTransaction = function() {
    const sender = document.getElementById('sender').value;
    const receiver = document.getElementById('receiver').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (contractManager.makeTransaction(sender, receiver, amount)) {
        contractManager.clearFormFields('make-transaction');
    }
};

window.showHistory = function() {
    contractManager.showProjectHistory();
};

window.viewTransactions = function() {
    const user = document.getElementById('user').value;

    if (contractManager.viewUserTransactions(user)) {
        contractManager.clearFormFields('view-transactions');
    }
};

// Inicializacion
document.addEventListener('DOMContentLoaded', function() {
    contractManager.init();
});