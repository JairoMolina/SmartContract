// Importación de módulos necesarios
import ProjectManagementContract from './SmartContract.js';  // Importa la clase del contrato inteligente
import { checkAuth, setupUserInterface, setupLogout } from './auth.js';  // Funciones de autenticación
import { 
    updateUsersTable, 
    updateAuditorsTable, 
    updateActiveProjects, 
    updateCompletedProjects 
} from './ui.js';  // Funciones para actualizar la interfaz de usuario

// Verifica la autenticación del usuario y obtiene su rol
const currentUserRole = checkAuth();

// Crea una instancia del contrato inteligente
const contract = new ProjectManagementContract();

// Datos de ejemplo para demostración - registra constructoras y auditores
contract.registerConstructor('Constructora A');
contract.registerConstructor('Constructora B');
contract.registerAuditor('Auditor 1', 'AUD001');
contract.registerAuditor('Auditor 2', 'AUD002');
contract.registerAuditor('Auditor 3', 'AUD003');

// Configura la interfaz según el rol del usuario y prepara el botón de cierre de sesión
setupUserInterface(currentUserRole);
setupLogout();

// Obtiene referencias a elementos del DOM que se usarán frecuentemente
const tabs = document.querySelectorAll('.tab');  // Pestañas de navegación
const tabContents = document.querySelectorAll('.tab-content');  // Contenidos de las pestañas
const newProjectForm = document.getElementById('newProjectForm');  // Formulario para nuevos proyectos
const registerUserForm = document.getElementById('registerUserForm');  // Formulario para registrar constructoras
const registerAuditorForm = document.getElementById('registerAuditorForm');  // Formulario para registrar auditores
const projectSuccess = document.getElementById('projectSuccess');  // Mensaje de éxito para proyectos
const userSuccess = document.getElementById('userSuccess');  // Mensaje de éxito para usuarios
const auditorSuccess = document.getElementById('auditorSuccess');  // Mensaje de éxito para auditores

// Configura el sistema de pestañas para la navegación
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Ignora clics en pestañas ocultas (no disponibles para el rol actual)
        if (tab.classList.contains('hidden')) return;
        
        // Desactiva todas las pestañas y contenidos
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.remove('active'));
        
        // Activa la pestaña seleccionada y su contenido
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
        
        // Actualiza los datos según la pestaña seleccionada
        if (tab.dataset.tab === 'users') {
            updateUsersTable(contract, currentUserRole);
        } else if (tab.dataset.tab === 'active-projects') {
            updateActiveProjects(contract, currentUserRole);
        } else if (tab.dataset.tab === 'completed-projects') {
            updateCompletedProjects(contract, currentUserRole);
        } else if (tab.dataset.tab === 'auditors') {
            updateAuditorsTable(contract, currentUserRole);
        }
    });
});

// Maneja el envío del formulario para registrar una nueva constructora
registerUserForm.addEventListener('submit', function(e) {
    e.preventDefault();  // Evita que el formulario recargue la página
    
    const userName = document.getElementById('userName').value;
    
    if (contract.registerConstructor(userName)) {
        // Muestra mensaje de éxito temporalmente
        userSuccess.style.display = 'block';
        setTimeout(() => {
            userSuccess.style.display = 'none';
        }, 3000);
        
        // Actualiza la tabla de constructoras y limpia el formulario
        updateUsersTable(contract, currentUserRole);
        registerUserForm.reset();
    } else {
        alert('Error: La constructora ya existe');
    }
});

// Maneja el envío del formulario para registrar un nuevo auditor
registerAuditorForm.addEventListener('submit', function(e) {
    e.preventDefault();  // Evita que el formulario recargue la página
    
    const auditorName = document.getElementById('auditorName').value;
    const auditorCode = document.getElementById('auditorCode').value;
    
    if (contract.registerAuditor(auditorName, auditorCode)) {
        // Muestra mensaje de éxito temporalmente
        auditorSuccess.style.display = 'block';
        setTimeout(() => {
            auditorSuccess.style.display = 'none';
        }, 3000);
        
        // Actualiza la tabla de auditores y limpia el formulario
        updateAuditorsTable(contract, currentUserRole);
        registerAuditorForm.reset();
    } else {
        alert('Error: El auditor ya existe');
    }
});

// Maneja el envío del formulario para crear un nuevo proyecto
newProjectForm.addEventListener('submit', function(e) {
    e.preventDefault();  // Evita que el formulario recargue la página
    
    // Obtiene los valores del formulario
    const projectName = document.getElementById('projectName').value;
    const constructorName = document.getElementById('constructorName').value;
    const projectDescription = document.getElementById('projectDescription').value;
    const initialBudget = parseFloat(document.getElementById('initialBudget').value);
    
    // Verifica que la constructora exista antes de crear el proyecto
    if (!contract.users[constructorName]) {
        alert('Error: La constructora no está registrada en el sistema');
        return;
    }
    
    // Intenta crear el proyecto
    const project = contract.createProject(
        projectName,
        constructorName,
        projectDescription,
        initialBudget
    );
    
    if (project) {
        // Muestra mensaje de éxito temporalmente
        projectSuccess.style.display = 'block';
        setTimeout(() => {
            projectSuccess.style.display = 'none';
        }, 3000);
        
        // Limpia el formulario
        newProjectForm.reset();
        
        // Cambia automáticamente a la pestaña de proyectos activos
        setTimeout(() => {
            document.querySelector('.tab[data-tab="active-projects"]').click();
        }, 1000);
    } else {
        alert('Error: No se pudo crear el proyecto');
    }
});

// Inicializa la tabla de usuarios al cargar la página
updateUsersTable(contract, currentUserRole);

// Crea un proyecto de ejemplo para demostración
setTimeout(() => {
    const demoProject = contract.createProject(
        'Parque Central Ciudad Nueva',
        'Constructora A',
        'Construcción de un parque urbano con áreas verdes, juegos infantiles, zonas deportivas y un lago artificial.',
        500000
    );
    
    // Simula votos de auditores para el proyecto de demostración
    if (demoProject) {
        contract.voteOnProject(demoProject.id, 'Auditor 1', true);
        contract.voteOnProject(demoProject.id, 'Auditor 2', true);
        // Con dos votos positivos, el proyecto pasa a estado "in-progress"
    }
    
    // Actualiza la vista de proyectos activos
    updateActiveProjects(contract, currentUserRole);
}, 1000);  // Espera 1 segundo para crear el proyecto de demostración