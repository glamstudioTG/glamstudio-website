# GlamStudio — Beauty Studio Management Platform

Plataforma web full-stack diseñada para la gestión integral de reservas en estudios de belleza. Permite administrar servicios, disponibilidad, trabajadores y reservas en tiempo real, con un panel administrativo robusto y autenticación segura basada en cookies httpOnly.

El sistema está desplegado en producción y fue desarrollado para un cliente real bajo criterios de escalabilidad, seguridad y mantenibilidad.

---

## Producción

- Sitio en producción: https://www.glamstudiotg.com

Arquitectura desacoplada: Frontend y backend desplegados en entornos independientes.

Las credenciales demo (si se proporcionan) están limitadas y no otorgan acceso administrativo completo.

---

## Arquitectura del Sistema

### Stack Tecnológico

**Frontend**

- Next.js (App Router)
- TypeScript
- React Query
- Context API
- Framer Motion
- TailwindCSS

**Backend**

- NestJS
- Prisma ORM
- Postgres SQL
- Prisma
- JWT Authentication
- Event Emitter interno

**Infraestructura**

- Frontend: Vercel
- Backend: Railway
- Base de datos: Postgres SQL (Railway)
- Almacenamiento de imágenes: Cloudinary y uploadthink
- Dominio personalizado y CORS configurado para entorno productivo

---

## Arquitectura General

```
Cliente (Browser)
    │
    │ HTTPS (Cookies httpOnly)
    ▼
Frontend (Next.js - Vercel)
    │
    │ REST API
    ▼
Backend (NestJS - Railway)
    │
    ▼
Postgres SQL
```

**Principios aplicados**

- Separación estricta frontend / backend
- Arquitectura modular en backend
- Estado desacoplado del transporte
- Infraestructura preparada para escalabilidad horizontal

---

## Seguridad y Autenticación

La autenticación está diseñada para minimizar riesgos comunes en aplicaciones SPA.

**Implementación**

- JWT firmado con expiración corta (access token)
- Refresh token con expiración extendida
- Tokens almacenados en cookies httpOnly
- `secure: true` en producción
- `sameSite: none` para soporte cross-domain
- CORS configurado con whitelist explícita
- Protección por roles (RBAC) para rutas administrativas
- Validación estricta con class-validator
- Sanitización y control de payloads
- Manejo centralizado de errores
- Protección de endpoints críticos mediante Guards

**Decisión clave:**  
Se evitó el uso de localStorage para almacenar tokens debido a vulnerabilidades XSS. El uso de cookies httpOnly reduce la superficie de ataque.

---

## Módulos Principales del Sistema

**Usuario**

- Registro y autenticación segura
- Gestión de sesión persistente
- Consulta de servicios
- Reserva con validación de disponibilidad en tiempo real
- Gestión de perfil

**Administrador**

- CRUD completo de servicios
- CRUD de categorías
- Gestión de trabajadores
- Configuración de horarios (business hours)
- Bloqueo de disponibilidad
- Visualización de reservas
- Estadísticas del sistema
- Gestión de pruebas de pago

---

## Lógica de Negocio Destacada

- Sistema de disponibilidad basado en business hours, overrides, bloqueos manuales y reservas activas
- Sistema de expiración automática de reservas
- Manejo de estados transaccionales
- Cálculo dinámico de horarios disponibles
- Separación entre eventos BOOKING, BLOCK y OVERRIDE
- Contexto dinámico de usuario (cliente vs trabajador)

---

## Diseño del Frontend

- Animaciones fluidas con Framer Motion
- Modal tipo Bottom Sheet en mobile (interacción tipo iOS)
- Responsive avanzado con breakpoints personalizados
- Manejo de estados optimista con React Query
- Debounce en búsquedas administrativas
- Sistema de modales reutilizable
- Manejo granular de errores por campo
- Gestión global de sesión con restauración automática

---

## Manejo de Estado y Datos

**React Query**

- Cacheo inteligente
- Invalidación automática
- Refetch controlado
- Sincronización eficiente

**Context API**

- Estado global de autenticación
- Control de sesión

---

## Estructura del Proyecto

```
/frontend
  /components
  /hooks
  /context
  /lib
  /service
  /ui
/backend
  /auth
  /booking
  /business-hours
  /availability
  /worker
  /notification
  /admin-stats
  /prisma
```

La arquitectura backend sigue el patrón modular de NestJS, permitiendo escalabilidad por dominio.

---

## Consideraciones de Escalabilidad

- Backend desacoplado del frontend
- Base de datos en cloud
- Arquitectura modular
- Sistema preparado para múltiples trabajadores
- Separación de lógica de disponibilidad
- Infraestructura preparada para escalar horizontalmente

---

## Trade-offs y Decisiones Técnicas

| Decisión                         | Motivo                                   |
| -------------------------------- | ---------------------------------------- |
| NestJS en lugar de Express plano | Estructura modular y escalable           |
| JWT en cookies httpOnly          | Seguridad frente a XSS                   |
| Separación frontend/backend      | Escalabilidad y despliegue independiente |
| React Query                      | Cache y sincronización avanzada          |
| Railway + Vercel                 | Simplicidad de CI/CD                     |

---

## Estado del Proyecto

- En producción
- Cliente activo
- Arquitectura modular
- Despliegue automatizado
- Mejoras evolutivas en curso

---

## Roadmap Futuro

- Notificaciones push
- Dashboard analítico avanzado
- Sistema de pagos integrado
- Sistema multi-tenant
- Métricas en tiempo real
- Optimización SSR avanzada

---

## Objetivo del Proyecto

Este proyecto fue desarrollado como solución real para un negocio operativo, con enfoque en:

- Seguridad
- Escalabilidad
- Experiencia de usuario
- Arquitectura mantenible
- Buenas prácticas de ingeniería

No es un proyecto académico, sino un sistema desplegado y utilizado en entorno real.
