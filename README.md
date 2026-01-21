# IntegriApp Frontend - Sistema de Gestión de Rutas y Vehículos

  

Aplicación web desarrollada con **Angular** para la gestión de unidades (vehículos), rutas y análisis de rendimiento.

  

## 📋 Requisitos Previos

  

Antes de comenzar, asegúrate de tener instalado:

  

-  **Node.js** (versión 18 o superior)

-  **npm** (versión 9 o superior)

-  **Angular CLI** (versión 17 o superior) - Opcional pero recomendado

  

### Verificar instalación

  

```bash

node  --version

npm  --version

ng  version  # Si tienes Angular CLI instalado

```

  

### Instalar Angular CLI (Opcional)

  

```bash

npm  install  -g  @angular/cli

```

  

## 🚀 Instalación y Configuración

  

### 1. Clonar el repositorio

  

```bash

git  clone <url-del-repositorio>

cd  integriapp-frontend

```

  

### 2. Instalar dependencias

  

```bash

npm  install

```

  

Este comando instalará todas las dependencias necesarias del proyecto definidas en `package.json`.

  

### 3. Configurar la conexión al backend

  

El archivo de configuración se encuentra en `src/environments/`:

  

**Para desarrollo local:**

-  `environment.ts` - Configuración de desarrollo

  

Por defecto, la aplicación apunta a:

```typescript

apiUrl: 'http://localhost:8000'

```

  

>  **⚠️ Importante:** Asegúrate de que el backend esté corriendo en `http://localhost:8000` antes de iniciar el frontend.

  

### 4. Ejecutar la aplicación

  

```bash

npm  start

```

  

O con Angular CLI:

  

```bash

ng  serve

```

  

La aplicación estará disponible en: **http://localhost:4200**

  

### 5. Abrir en el navegador

  

Navega a [http://localhost:4200](http://localhost:4200) y la aplicación se recargará automáticamente si cambias algún archivo fuente.

  

## 📁 Estructura del Proyecto

  

```

src/

├── app/

│ ├── dtos/ # Data Transfer Objects

│ ├── mappers/ # Conversores DTO ↔ Model

│ ├── models/ # Modelos de dominio

│ ├── services/ # Servicios compartidos

│ ├── unidades/ # Módulo de Unidades (Vehículos)

│ ├── routes/ # Módulo de Rutas

│ ├── performance/ # Módulo de Rendimiento

│ ├── usuarios/ # Módulo de Usuarios (heredado)

│ ├── app.component.ts

│ ├── app.module.ts

│ └── app-routing.module.ts

├── environments/ # Configuración de entornos

│ ├── environments.ts # Desarrollo

├── index.html

```

  

## 🏗️ Arquitectura y Diseño

  

### Patrón de Capas

  

```

Components (UI/Presentación)

↓

Services (Lógica de negocio)

↓

DTOs + Mappers (Transformación de datos)

↓

Models (Dominio)

↓

HTTP Service (Comunicación con API)

```

  

### Flujo de Datos

  

1.  **Component** solicita datos al **Service**

2.  **Service** llama al backend vía HTTP

3. Backend responde con **DTOs**

4.  **Mappers** transforman DTOs a **Models**

5.  **Models** se usan en los componentes

  

## 📦 Módulos Implementados

  

### 1. Módulo de Unidades (Vehículos)

- ✅ CRUD completo de unidades

- ✅ Listado

- ✅ Activación/Desactivación de unidades

  

### 2. Módulo de Rutas

- ✅ Gestión de rutas

- ✅ Asignación de rutas a unidades

- ✅ Cambio de estado (Assigned → In Progress → Completed)

- ✅ Registro de métricas al completar

- ✅ Filtros por estado y unidad

  

### 3. Módulo de Rendimiento

- ✅ Visualización de métricas de rendimiento

  
  

### 4. Módulo de Usuarios (Heredado)

- ✅ Nuevo CRUD generado

  

## 🛠️ Scripts Disponibles

  

### Desarrollo

  

```bash

# Iniciar servidor de desarrollo

npm  start

# o

ng  serve

  

# Servidor con puerto personalizado

ng  serve  --port  4300

  

# Abrir automáticamente en el navegador

ng  serve  --open

```

  

## 🔧 Configuración del Backend

  

### Archivo: `src/environments/environment.ts`

  

```typescript

export  const  environment = {

production:  false,

apiUrl:  'http://localhost:8000'

};

```

  
  

## 🌐 Conexión con el Backend

  

### Prerequisito: Backend en ejecución

  

Asegúrate de que el backend de IntegriApp esté corriendo:

  

```bash

# En el directorio del backend

docker-compose  up  -d

  

# Verificar que esté corriendo

curl  http://localhost:8000/health

```

  

## 🐛 Troubleshooting

  

### Error: "Cannot connect to backend"

  

**Solución:**

1. Verifica que el backend esté corriendo: `curl http://localhost:8000/health`

2. Revisa la URL en `src/environments/environment.ts`

3. Verifica la configuración de CORS en el backend

  

### Error: "Module not found"

  

**Solución:**

```bash

# Eliminar node_modules y reinstalar

rm  -rf  node_modules  package-lock.json

npm  install

```

  

### El servidor no se inicia

  

**Solución:**

```bash

# Verificar que no haya otro proceso en el puerto 4200

lsof  -ti:4200 | xargs  kill  -9

  

# Limpiar caché de Angular

ng  cache  clean

  

# Reintentar

npm  start

```

  

### Cambios no se reflejan en el navegador

  

**Solución:**

1. Limpia la caché del navegador (Ctrl/Cmd + Shift + R)

2. Verifica que el servidor esté en modo watch

3. Revisa la consola del navegador por errores

  

### Error: "ng: command not found"

  

**Solución:**

```bash

# Instalar Angular CLI globalmente

npm  install  -g  @angular/cli

  

# O usar npx

npx  ng  serve

```

  

## 📚 Documentación Adicional

  

- [Angular Documentation](https://angular.io/docs)

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

- [RxJS Documentation](https://rxjs.dev/)


  

## 📊 Tecnologías Utilizadas

  

-  **Framework:** Angular 17+

-  **Lenguaje:** TypeScript 5+

-  **Estado:** RxJS

-  **HTTP Client:** Angular HttpClient

-  **Routing:** Angular Router

-  **Formularios:** Reactive Forms

-  **Estilos:** CSS3 / SCSS

  

## 📝 Notas Importantes

  

- 🔄 **Hot Reload:** Los cambios se reflejan automáticamente en desarrollo

- 🎯 **TypeScript:** Aprovecha el tipado fuerte para evitar errores

- 📦 **Modularidad:** Cada funcionalidad está en su propio módulo

- 🗺️ **Mappers:** Separan la lógica de transformación de datos

- 🔌 **Servicios:** Centralizan la comunicación con el backend

  
  

## 🎯 Flujo de Trabajo Típico

  

### 1. Gestión de Unidades

```

Login → Unidades → Crear/Editar Unidad → Guardar

```

  

### 2. Asignación de Rutas

```

Rutas → Crear Ruta → Asignar a Unidad → Iniciar Ruta → Completar Ruta

```

  

### 3. Análisis de Rendimiento

```

Rendimiento → Seleccionar Unidad/Ruta → Ver Métricas → Exportar Reporte

```

  
  

### Desarrollado por Oscar Omar Arias Rodríguez 🐻