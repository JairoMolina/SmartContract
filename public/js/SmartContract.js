// SmartContract.js
import LinkedList from './LinkedList.js';
import { UserLinkedList } from './UserList.js';
import { ProjectLinkedList } from './ProjectList.js';
import { voteOnProject, autoFinalizeProject, requestNextPhase, finalizeProject } from './ProjectAction.js';

class ProjectManagementContract {
    constructor(initializeWithExamples = false) {
        this.constructors = new UserLinkedList();
        this.auditorsList = new UserLinkedList();
        this.activeProjects = new ProjectLinkedList();
        this.completedProjects = new ProjectLinkedList();
        this.transactions = new LinkedList(); // Lista enlazada para transacciones

        // Inicializar con datos de ejemplo si se solicita
        if (initializeWithExamples) {
            initializeExampleData(this);
        }
    }

    // Propiedades para compatibilidad
    get users() {
        return this.constructors.toObject();
    }

    get auditors() {
        return this.auditorsList.toObject();
    }

    get projects() {
        return this.activeProjects.getAllProjects();
    }

    // Métodos básicos
    registerConstructor(username) {
        return this.constructors.add(username, { role: 'constructor' });
    }

    registerAuditor(username, code) {
        return this.auditorsList.add(username, { code });
    }

    removeAuditor(username) {
        return this.auditorsList.remove(username);
    }

    removeConstructor(username) {
        return this.constructors.remove(username);
    }

    createProject(name, constructor, description, budget) {
        // Validar que el constructor exista
        if (!this.constructors.find(constructor)) {
            return false;
        }

        const project = {
            id: Date.now().toString(),
            name,
            constructor,
            description,
            initialBudget: budget,
            currentBudget: budget,
            status: 'pending',
            currentPhase: 0,
            phases: [
                {
                    name: 'Planificación Inicial',
                    description: description,
                    budget: budget,
                    approvals: {},
                    dateCreated: new Date()
                }
            ],
            dateCreated: new Date()
        };

        this.activeProjects.add(project);
        return project;
    }

    getAuditors() {
        return this.auditorsList.getAllUsernames();
    }

    // Métodos delegados a otros archivos
    voteOnProject(projectId, auditor, approved) {
        return voteOnProject(this, projectId, auditor, approved);
    }

    autoFinalizeProject(projectId) {
        return autoFinalizeProject(this, projectId);
    }

    requestNextPhase(projectId, constructor, description, additionalBudget) {
        return requestNextPhase(this, projectId, constructor, description, additionalBudget);
    }

    finalizeProject(projectId, constructor) {
        return finalizeProject(this, projectId, constructor);
    }
}

export default ProjectManagementContract;
