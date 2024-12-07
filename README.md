# RentalCar Project

## Descripción del Proyecto

Proyecto integral de alquiler de autos desarrollado con las siguientes tecnologías:
- Backend: JHipster
- Frontend: Vue.js
- Testing: Cypress
- Infraestructura: Docker
- Logging: ELK Stack
- Aplicación Móvil: Ionic con PWA

## Requisitos Previos

- Docker
- Docker Compose
- Node.js
- Ionic CLI
- NPX

## Estructura del Proyecto

```
project-root/
│
├── infsoft-front/              # Frontend Vue.js
├── infsoft-front/cypress-tests # Pruebas de Cypress      
├── backend/                    # Backend JHipster
├── elk/                        # Configuración de servicios Docker junto ELK
├── rentalcar-app/              # Aplicación Ionic
         
```

## Configuración y Despliegue

### Levantar Servicios Docker

Para iniciar todos los servicios configurados:

```bash
cd elk/
```

```bash
docker compose up
```

### Frontend Vue.js

El frontend está dockerizado y se puede acceder en:
- URL: `http://localhost:3000`

### Pruebas con Cypress

Ejecutar pruebas:

```bash
cd infsoft-front/cypress-tests
npx cypress open
```

### Aplicación Ionic (PWA)

Iniciar la aplicación:

```bash
cd rentalcar-app
ionic serve
```

### Servidor de Logs ELK

Configurado para capturar logs de Docker. Se levanta automáticamente con `docker compose up`.
- URL: `http://localhost:5601`
- User: elastic   Password: changeme

## Integración Continua

Servidor Jenkins configurado:
- URL: `http://localhost:8088`
- Función: Lee el repositorio y sube imágenes a DockerHub

## Características

- Aplicación web de alquiler de autos
- Progressive Web App (PWA)
- Soporte para uso offline
- Integración continua con Jenkins
- Monitoreo de logs con ELK Stack

## Tecnologías Utilizadas

- JHipster
- Vue.js
- Ionic
- Docker
- Cypress
- Jenkins
- ELK Stack

