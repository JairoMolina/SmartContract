// ui.js - Funciones para actualizar la interfaz de usuario

// Actualiza la tabla de constructoras
export function updateUsersTable(contract, currentUserRole) {
    const usersTableBody = document.getElementById('usersTableBody');
    usersTableBody.innerHTML = '';
    
    Object.keys(contract.users).forEach(username => {
        const row = document.createElement('tr');
        
        // Solo mostrar botón de eliminar si es gobierno
        const deleteButton = currentUserRole === 'gobierno' 
            ? `<button class="delete delete-constructor" data-name="${username}">Eliminar</button>` 
            : '';
            
        row.innerHTML = `
            <td>${username}</td>
            <td>${deleteButton}</td>
        `;
        usersTableBody.appendChild(row);
    });
    
    // Agregar eventos a los botones de eliminar
    document.querySelectorAll('.delete-constructor').forEach(button => {
        button.addEventListener('click', function() {
            const constructorName = this.dataset.name;
            if (confirm(`¿Está seguro que desea eliminar la constructora "${constructorName}"?`)) {
                if (contract.removeConstructor(constructorName)) {
                    updateUsersTable(contract, currentUserRole);
                } else {
                    alert('No se pudo eliminar la constructora');
                }
            }
        });
    });
}

// Actualiza la tabla de auditores
export function updateAuditorsTable(contract, currentUserRole) {
    const auditorsTableBody = document.getElementById('auditorsTableBody');
    auditorsTableBody.innerHTML = '';
    
    Object.entries(contract.auditors).forEach(([username, data]) => {
        const row = document.createElement('tr');
        
        // Solo mostrar botón de eliminar si es gobierno
        const deleteButton = currentUserRole === 'gobierno' 
            ? `<button class="delete delete-auditor" data-name="${username}">Eliminar</button>` 
            : '';
            
        row.innerHTML = `
            <td>${username}</td>
            <td>${data.code}</td>
            <td>${deleteButton}</td>
        `;
        auditorsTableBody.appendChild(row);
    });
    
    // Agregar eventos a los botones de eliminar
    document.querySelectorAll('.delete-auditor').forEach(button => {
        button.addEventListener('click', function() {
            const auditorName = this.dataset.name;
            if (confirm(`¿Está seguro que desea eliminar al auditor "${auditorName}"?`)) {
                if (contract.removeAuditor(auditorName)) {
                    updateAuditorsTable(contract, currentUserRole);
                } else {
                    alert('No se pudo eliminar el auditor');
                }
            }
        });
    });
}

// Actualiza la lista de proyectos activos
export function updateActiveProjects(contract, currentUserRole) {
    const activeProjectsList = document.getElementById('activeProjectsList');
    activeProjectsList.innerHTML = '';
    
    // Muestra mensaje si no hay proyectos
    if (contract.projects.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'empty-message';
        emptyMessage.textContent = 'No hay proyectos activos en este momento.';
        activeProjectsList.appendChild(emptyMessage);
        return;
    }
    
    // Crea elementos para cada proyecto
    contract.projects.forEach(project => {
        const template = document.getElementById('activeProjectTemplate');
        const clone = document.importNode(template.content, true);
        
        // Rellena datos del proyecto
        clone.querySelector('.project-name').textContent = project.name;
        clone.querySelector('.constructor-name').textContent = project.constructor;
        
        const statusElement = clone.querySelector('.project-status');
        statusElement.textContent = getStatusText(project.status);
        statusElement.className = `status status-${project.status}`;
        
        clone.querySelector('.project-budget').textContent = `Q${project.currentBudget}`;
        clone.querySelector('.project-description').textContent = project.description;
        
        // Muestra fase actual
        const currentPhase = project.phases[project.currentPhase];
        clone.querySelector('.phase-name').textContent = currentPhase.name;
        
        // Muestra conteo de votos
        const auditors = contract.getAuditors();
        const approvalCount = Object.values(currentPhase.approvals).filter(v => v).length;
        clone.querySelector('.vote-count').textContent = `${approvalCount}/${auditors.length}`;
        
        // Configura acciones según el rol
        const auditorActions = clone.querySelector('.auditor-actions');
        const constructorActions = clone.querySelector('.constructor-actions');
        const currentUser = sessionStorage.getItem('userName');
        
        // Configura acciones para auditores
        if (currentUserRole === 'auditor' && contract.auditors[currentUser]) {
            constructorActions.style.display = 'none';
            auditorActions.style.display = 'block';
            
            const approveButton = auditorActions.querySelector('.approve');
            const rejectButton = auditorActions.querySelector('.reject');
            
            // Configura botón de aprobar
            approveButton.addEventListener('click', () => {
                const result = contract.voteOnProject(project.id, currentUser, true);
                alert(result.message);
                
                // Finaliza automáticamente si hay suficientes aprobaciones
                if (result.projectUpdated && result.approved) {
                    const finalizationResult = contract.autoFinalizeProject(project.id);
                    if (finalizationResult.success) {
                        alert("El proyecto ha sido aprobado y finalizado con éxito.");
                    }
                }
                
                // Actualiza las vistas
                updateActiveProjects(contract, currentUserRole);
                updateCompletedProjects(contract, currentUserRole);
            });
            
            // Configura botón de rechazar
            rejectButton.addEventListener('click', () => {
                const result = contract.voteOnProject(project.id, currentUser, false);
                alert(result.message);
                if (result.projectUpdated) {
                    updateActiveProjects(contract, currentUserRole);
                }
            });
            
            // Deshabilita botones si ya votó
            if (currentPhase.approvals[currentUser] !== undefined) {
                approveButton.disabled = true;
                rejectButton.disabled = true;
                
                if (currentPhase.approvals[currentUser]) {
                    approveButton.textContent = '✓ Aprobado';
                } else {
                    rejectButton.textContent = '✓ Rechazado';
                }
            }
        } 
        // Configura acciones para constructoras
        else if (currentUserRole === 'constructor' && project.constructor === currentUser) {
            auditorActions.style.display = 'none';
            constructorActions.style.display = 'block';
            
            const nextPhaseForm = constructorActions.querySelector('.next-phase-form');
            const finalizeButton = constructorActions.querySelector('.finalize');
            
            // Configura formulario para siguiente fase
            nextPhaseForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const description = nextPhaseForm.querySelector('.phase-description').value;
                const additionalBudget = parseFloat(nextPhaseForm.querySelector('.additional-budget').value) || 0;
                
                const result = contract.requestNextPhase(project.id, currentUser, description, additionalBudget);
                alert(result.message);
                if (result.success) {
                    updateActiveProjects(contract, currentUserRole);
                }
            });
            
            // Configura botón para finalizar proyecto
            finalizeButton.addEventListener('click', () => {
                if (confirm('¿Estás seguro de que deseas finalizar este proyecto?')) {
                    const result = contract.finalizeProject(project.id, currentUser);
                    alert(result.message);
                    if (result.success) {
                        updateActiveProjects(contract, currentUserRole);
                        updateCompletedProjects(contract, currentUserRole);
                    }
                }
            });
        } else {
            // Oculta acciones para otros usuarios
            auditorActions.style.display = 'none';
            constructorActions.style.display = 'none';
        }
        
        // Agrega el proyecto a la lista
        activeProjectsList.appendChild(clone);
    });
}

// Actualiza la tabla de proyectos completados
export function updateCompletedProjects(contract, currentUserRole) {
    const completedProjectsTableBody = document.getElementById('completedProjectsTableBody');
    const noCompletedProjects = document.getElementById('noCompletedProjects');
    
    completedProjectsTableBody.innerHTML = '';
    
    // Muestra mensaje si no hay proyectos completados
    if (contract.completedProjects.length === 0) {
        noCompletedProjects.style.display = 'block';
    } else {
        noCompletedProjects.style.display = 'none';
        
        // Crea filas para cada proyecto completado
        contract.completedProjects.forEach(project => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${project.name}</td>
                <td>${project.constructor}</td>
                <td>Q${project.currentBudget}</td>
                <td>${project.dateCompleted.toLocaleDateString()}</td>
                <td><button class="view-details" data-id="${project.id}">Ver detalles</button></td>
            `;
            completedProjectsTableBody.appendChild(row);
            
            // Configura botón para ver detalles
            row.querySelector('.view-details').addEventListener('click', () => {
                alert(`Detalles del proyecto ${project.name}:\n\nFases completadas: ${project.phases.length}\nPresupuesto inicial: Q${project.initialBudget}\nPresupuesto final: Q${project.currentBudget}`);
            });
        });
    }
}

// Convierte códigos de estado a texto legible
export function getStatusText(status) {
    switch (status) {
        case 'pending': return 'Pendiente';
        case 'in-progress': return 'En Proceso';
        case 'completed': return 'Finalizado';
        case 'rejected': return 'Rechazado';
        default: return status;
    }
}