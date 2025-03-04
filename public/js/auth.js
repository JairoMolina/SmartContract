// auth.js - Funciones relacionadas con la autenticación y autorización

// Verifica si el usuario está autenticado
export function checkAuth() {
    const userRole = sessionStorage.getItem('userRole');
    
    if (!userRole) {
        // Redirige al login si no hay usuario
        window.location.href = 'login.html';
        return null;
    }
    
    return userRole;
}

// Configura la interfaz según el rol del usuario
export function setupUserInterface(role) {
    document.getElementById('currentUserRole').textContent = `Rol: ${getRoleDisplayName(role)}`;
    
    // Aplica configuración según el rol
    switch(role) {
        case 'visitante':
            setupVisitorInterface();
            break;
        case 'auditor':
            setupAuditorInterface();
            break;
        case 'constructor':
            setupConstructorInterface();
            break;
        case 'gobierno':
            // Acceso completo
            break;
        default:
            // Por defecto es visitante
            setupVisitorInterface();
    }
}

// Configura interfaz para visitantes (solo lectura)
function setupVisitorInterface() {
    // Oculta pestaña de nuevo proyecto
    document.querySelector('.tab[data-tab="new-project"]').classList.add('hidden');
    
    // Deshabilita formularios
    disableAllForms();
    
    // Muestra mensaje informativo
    showVisitorMessage();
}

// Configura interfaz para auditores
function setupAuditorInterface() {
    // Oculta pestaña de nuevo proyecto
    document.querySelector('.tab[data-tab="new-project"]').classList.add('hidden');
    
    // Deshabilita formularios no relevantes
    disableAllForms();
    
    // Crea mensaje para auditores
    const auditorMessage = document.createElement('div');
    auditorMessage.className = 'notification';
    auditorMessage.style.display = 'block';
    auditorMessage.style.backgroundColor = '#e3f2fd';
    auditorMessage.style.color = '#0d47a1';
    auditorMessage.textContent = 'Modo auditor: Puede aprobar o rechazar proyectos.';
    
    // Añade mensaje a todas las tarjetas
    document.querySelectorAll('.card').forEach(card => {
        card.prepend(auditorMessage.cloneNode(true));
    });
    
    // Selecciona pestaña de proyectos activos
    setTimeout(() => {
        document.querySelector('.tab[data-tab="active-projects"]').click();
    }, 100);
}

// Configura interfaz para constructoras
function setupConstructorInterface() {
    // Deshabilita formularios de registro
    document.getElementById('registerUserForm').querySelectorAll('input, button').forEach(el => {
        el.disabled = true;
    });
    
    // Deshabilita registro de auditores si existe
    if (document.getElementById('registerAuditorForm')) {
        document.getElementById('registerAuditorForm').querySelectorAll('input, button').forEach(el => {
            el.disabled = true;
        });
    }
    
    // Crea mensaje para constructoras
    const constructorMessage = document.createElement('div');
    constructorMessage.className = 'notification';
    constructorMessage.style.display = 'block';
    constructorMessage.style.backgroundColor = '#e8f5e9';
    constructorMessage.style.color = '#2e7d32';
    constructorMessage.textContent = 'Modo constructor: Puede proponer nuevos proyectos y gestionar sus proyectos activos.';
    
    // Añade mensaje a todas las tarjetas
    document.querySelectorAll('.card').forEach(card => {
        card.prepend(constructorMessage.cloneNode(true));
    });
}

// Deshabilita todos los formularios
function disableAllForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.querySelectorAll('input, textarea, button, select').forEach(el => {
            el.disabled = true;
        });
    });
}

// Muestra mensaje para visitantes
function showVisitorMessage() {
    const visitorMessage = document.createElement('div');
    visitorMessage.className = 'notification';
    visitorMessage.style.display = 'block';
    visitorMessage.style.backgroundColor = '#f8f9fa';
    visitorMessage.style.color = '#666';
    visitorMessage.textContent = 'Modo visitante: Solo puede ver información, no puede realizar cambios.';
    
    // Añade mensaje a todas las tarjetas
    document.querySelectorAll('.card').forEach(card => {
        card.prepend(visitorMessage.cloneNode(true));
    });
    
    // Selecciona pestaña de proyectos activos
    setTimeout(() => {
        document.querySelector('.tab[data-tab="active-projects"]').click();
    }, 100);
}

// Convierte el código del rol a nombre legible
function getRoleDisplayName(role) {
    switch(role) {
        case 'visitante': return 'Visitante';
        case 'auditor': return 'Auditor';
        case 'constructor': return 'Constructor';
        case 'gobierno': return 'Gobierno';
        default: return role;
    }
}

// Configura el botón de cerrar sesión
export function setupLogout() {
    document.getElementById('logoutButton').addEventListener('click', function() {
        sessionStorage.removeItem('userRole');
        window.location.href = 'login.html';
    });
}