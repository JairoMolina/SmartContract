# 🏗️ SmartContract - Sistema de Gestión de Proyectos de Construcción

## 📋 Descripción
**SmartContract** es una plataforma basada en tecnología blockchain diseñada para aumentar la transparencia y reducir la corrupción en proyectos de construcción gubernamentales en Guatemala.  
El sistema permite la supervisión pública de proyectos de infraestructura, desde su planificación hasta su finalización, asegurando que los fondos públicos se utilicen de manera adecuada y transparente.

## 🎯 Motivación
En Guatemala, la corrupción en proyectos de infraestructura pública ha sido un problema persistente que ha resultado en:

- 🏚️ Obras inconclusas o de baja calidad  
- 💰 Sobrecostos injustificados  
- 📜 Asignación irregular de contratos  
- 😡 Pérdida de confianza ciudadana en las instituciones públicas  

**SmartContract** nace como una solución tecnológica para combatir estos problemas, creando un registro inmutable y transparente de todas las transacciones y decisiones relacionadas con los proyectos de construcción pública.

## ✨ Características Principales
- 🏛 **Sistema de Roles:** Gobierno, constructoras y auditores independientes  
- 🔒 **Registro Inmutable:** Todas las transacciones y cambios quedan registrados permanentemente  
- ✅ **Aprobación por Consenso:** Los proyectos avanzan solo con la aprobación de múltiples auditores independientes  
- 👁 **Transparencia Total:** Cualquier ciudadano puede verificar el estado y presupuesto de los proyectos  
- 📑 **Gestión de Fases:** Control detallado de cada etapa de construcción  

## 🛠️ Tecnologías Utilizadas
- ⚡ JavaScript
- 🔗 Estructuras de datos Listas Enlazadas  
- 📱 Interfaz de usuario responsiva  

## 📊 Estructura del Proyecto
SmartContract/
├── html/
    └── index.html
├── css/
│   └── styles.css
├── js/
│   ├── SmartContract.js       # Contrato principal
│   ├── LinkedList.js          # Implementación de lista enlazada
│   ├── UserList.js            # Gestión de usuarios
│   ├── ProjectList.js         # Gestión de proyectos
│   ├── ProjectActions.js      # Acciones sobre proyectos
│   ├── ExampleData.js         # Datos de ejemplo
│   └── ui.js                  # Funciones de interfaz de usuario


## 🔍 Funcionalidades Principales

### 👥 Gestión de Usuarios
- Registro de constructoras  
- Registro de auditores con código de verificación  
- Eliminación de usuarios (solo rol de gobierno)  

### 🏗️ Gestión de Proyectos
- Creación de nuevos proyectos de construcción  
- Seguimiento de presupuesto inicial y actual  
- Registro detallado de cada fase del proyecto  
- Sistema de votación para aprobación de fases  

### 🔎 Sistema de Auditoría
- Votación independiente por múltiples auditores  
- Requisito de mayoría para avanzar en las fases del proyecto  
- Capacidad de rechazar proyectos que no cumplan estándares  

### 🌍 Transparencia
- Visualización pública del estado de todos los proyectos  
- Historial completo de cada proyecto y sus fases  
- Registro de presupuestos y gastos adicionales  

## 💻 Cómo Usar

### 🏛 Acceso como Gobierno:
✅ Registrar constructoras y auditores  
✅ Supervisar todos los proyectos  

### 🏗️ Acceso como Constructora:
✅ Crear nuevos proyectos  
✅ Solicitar nuevas fases de construcción  
✅ Finalizar proyectos completados  

### 🔎 Acceso como Auditor:
✅ Revisar detalles de proyectos  
✅ Aprobar o rechazar fases de construcción  
✅ Verificar presupuestos y gastos  

### 👁️ Acceso Público:
✅ Consultar proyectos activos y completados  
✅ Verificar presupuestos y estados  
