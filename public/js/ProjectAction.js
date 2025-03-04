// ProjectActions.js - Funciones para acciones de proyectos

// Votar en un proyecto (como auditor)
export function voteOnProject(contract, projectId, auditor, approved) {
    // Validar que el auditor exista
    if (!contract.auditorsList.find(auditor)) {
        return { success: false, message: 'Usuario no es un auditor válido' };
    }
    
    const projectNode = contract.activeProjects.find(projectId);
    if (!projectNode) {
        return { success: false, message: 'Proyecto no encontrado' };
    }
    
    const project = projectNode.project;
    const currentPhase = project.phases[project.currentPhase];
    currentPhase.approvals[auditor] = approved;
    
    // Comprobar si hay suficientes aprobaciones para avanzar
    const auditors = contract.getAuditors();
    const approvalCount = Object.values(currentPhase.approvals).filter(v => v).length;
    
    // Si más de la mitad de los auditores aprueban, el proyecto avanza
    if (approvalCount > auditors.length / 2) {
        if (project.status === 'pending') {
            project.status = 'in-progress';
        }
        return { 
            success: true, 
            message: 'Voto registrado. El proyecto ha sido aprobado para avanzar.',
            projectUpdated: true,
            approved: true
        };
    }
    
    // Si más de la mitad de los auditores rechazan, el proyecto se rechaza
    const rejectionCount = Object.values(currentPhase.approvals).filter(v => !v).length;
    if (rejectionCount > auditors.length / 2) {
        project.status = 'rejected';
        return { 
            success: true, 
            message: 'Voto registrado. El proyecto ha sido rechazado.',
            projectUpdated: true,
            approved: false
        };
    }
    
    return { 
        success: true, 
        message: 'Voto registrado. Esperando más votos.',
        projectUpdated: false,
        approved: false
    };
}

// Finalizar automáticamente un proyecto cuando es aprobado por los auditores
export function autoFinalizeProject(contract, projectId) {
    const projectNode = contract.activeProjects.find(projectId);
    if (!projectNode) {
        return { success: false, message: 'Proyecto no encontrado' };
    }
    
    const project = projectNode.project;
    if (project.status !== 'in-progress') {
        return { success: false, message: 'El proyecto no está en progreso' };
    }
    
    // Mover a proyectos completados
    project.status = 'completed';
    project.dateCompleted = new Date();
    
    // Añadir a completados y eliminar de activos
    contract.completedProjects.add({...project});
    contract.activeProjects.remove(projectId);
    
    return { 
        success: true, 
        message: 'Proyecto finalizado con éxito.' 
    };
}

// Solicitar siguiente fase (como constructor)
export function requestNextPhase(contract, projectId, constructor, description, additionalBudget) {
    const projectNode = contract.activeProjects.find(projectId);
    if (!projectNode) {
        return { success: false, message: 'Proyecto no encontrado' };
    }
    
    const project = projectNode.project;
    if (project.constructor !== constructor) {
        return { success: false, message: 'No eres el constructor de este proyecto' };
    }
    
    if (project.status !== 'in-progress') {
        return { success: false, message: 'El proyecto no está en progreso' };
    }
    
    // Crear nueva fase
    const newPhase = {
        name: `Fase ${project.currentPhase + 2}`,
        description: description,
        budget: additionalBudget,
        approvals: {},
        dateCreated: new Date()
    };
    
    project.phases.push(newPhase);
    project.currentPhase++;
    project.currentBudget += additionalBudget;
    
    return { 
        success: true, 
        message: 'Nueva fase solicitada. Esperando aprobación de los auditores.' 
    };
}

// Finalizar proyecto (como constructor)
export function finalizeProject(contract, projectId, constructor) {
    const projectNode = contract.activeProjects.find(projectId);
    if (!projectNode) {
        return { success: false, message: 'Proyecto no encontrado' };
    }
    
    const project = projectNode.project;
    if (project.constructor !== constructor) {
        return { success: false, message: 'No eres el constructor de este proyecto' };
    }
    
    if (project.status !== 'in-progress') {
        return { success: false, message: 'El proyecto no está en progreso' };
    }
    
    project.status = 'completed';
    project.dateCompleted = new Date();
    
    // Añadir a completados y eliminar de activos
    contract.completedProjects.add({...project});
    contract.activeProjects.remove(projectId);
    
    return { 
        success: true, 
        message: 'Proyecto finalizado con éxito.' 
    };
}
