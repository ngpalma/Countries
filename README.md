# 🌍 Aplicación de Países

Aplicación web full-stack para explorar información de todos los países del mundo y gestionar actividades turísticas asociadas a cada uno.

---

## ✨ Funcionalidades

- 🔍 **Búsqueda** de países por nombre en tiempo real
- 🗂️ **Filtros** por continente y por actividad turística
- 🔡 **Ordenamiento** alfabético (A-Z / Z-A) y por población
- 📄 **Paginación** de 10 países por página
- 🗺️ **Detalle** de cada país: bandera, área, población, subregión y actividades
- ➕ **Crear actividades** turísticas vinculadas a uno o más países
- 💾 **Persistencia** en base de datos PostgreSQL local
- 🎨 **Diseño moderno** con Tailwind CSS y animaciones con Framer Motion
- 📱 **Responsive** para mobile, tablet y desktop

---

## 🛠️ Stack tecnológico

### Frontend
| Tecnología | Versión | Uso |
|---|---|---|
| React | 18 | UI |
| React Router | v6 | Navegación |
| Redux | 4 | UI state (filtros, paginación) |
| TanStack React Query | 5 | Fetching y caché de datos |
| Tailwind CSS | 3 | Estilos |
| Framer Motion | — | Animaciones |
| Sonner | — | Notificaciones toast |
| Axios | 1 | Llamadas HTTP |

### Backend
| Tecnología | Versión | Uso |
|---|---|---|
| Node.js | ≥ 18 | Runtime |
| Express | 4 | Servidor HTTP |
| Sequelize | 6 | ORM |
| PostgreSQL | — | Base de datos |
| Axios | 1 | Consumo de API externa |

### API externa
- [REST Countries API v3.1](https://restcountries.com) — datos de los 250 países

---

## 📁 Estructura del proyecto

```
PI-Countries/
├── api/                        # Backend (Node.js + Express)
│   ├── src/
│   │   ├── controllers/        # Lógica de negocio
│   │   │   ├── countriesC.js
│   │   │   └── activitiesC.js
│   │   ├── handlers/           # Middlewares de rutas
│   │   │   ├── countriesH.js
│   │   │   └── activitiesH.js
│   │   ├── models/             # Modelos Sequelize
│   │   │   ├── Country.js
│   │   │   └── Activity.js
│   │   ├── routes/             # Endpoints
│   │   ├── app.js
│   │   └── db.js               # Conexión y relaciones
│   ├── index.js
│   └── package.json
│
└── client/                     # Frontend (React)
    ├── src/
    │   ├── components/
    │   │   ├── Card/
    │   │   ├── Cards Container/
    │   │   ├── Nav Bar/
    │   │   └── Search Bar/
    │   ├── hooks/              # Custom hooks React Query
    │   │   ├── useCountries.js
    │   │   ├── useActivities.js
    │   │   └── useCountry.js
    │   ├── redux/              # UI state (filtros, paginación)
    │   │   ├── actions.js
    │   │   ├── reducer.js
    │   │   ├── store.js
    │   │   └── types.js
    │   ├── views/
    │   │   ├── Landing/
    │   │   ├── Home/
    │   │   ├── Detail/
    │   │   └── Form/
    │   └── index.js
    └── package.json
```

---

## ⚙️ Requisitos previos

- [Node.js](https://nodejs.org) v18 o superior
- [PostgreSQL](https://www.postgresql.org) instalado y corriendo

---

## 🚀 Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/ngpalma/Countries.git
cd PI-Countries
```

### 2. Configurar la base de datos

Crear una base de datos en PostgreSQL:

```sql
CREATE DATABASE countries;
```

### 3. Configurar variables de entorno del backend

Crear el archivo `api/.env` con tus credenciales locales:

```env
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
PORT=3001
```

### 4. Instalar dependencias

```bash
# Backend
cd api
npm install

# Frontend
cd ../client
npm install
```

---

## ▶️ Correr el proyecto

Abrir **dos terminales** en paralelo:

```bash
# Terminal 1 — Backend (desde /api)
npm start
```

```bash
# Terminal 2 — Frontend (desde /client)
npm start
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:3001](http://localhost:3001)

> Al iniciar el backend por primera vez, la base de datos se puebla automáticamente con los datos de los 250 países desde la API de REST Countries.

---

## 🔌 API endpoints

### Países

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/countries` | Obtener todos los países |
| `GET` | `/countries?name=arg` | Buscar países por nombre |
| `GET` | `/countries/:id` | Obtener un país por código (ej: `ARG`) |

### Actividades

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/activities` | Obtener todas las actividades |
| `POST` | `/activities` | Crear una nueva actividad |

#### Body para crear actividad

```json
{
  "name": "Senderismo",
  "difficulty": 3,
  "season": "Verano",
  "duration": "4",
  "countries": ["ARG", "CHL", "PER"]
}
```

---

## 🗄️ Modelos de base de datos

### Country
| Campo | Tipo | Descripción |
|---|---|---|
| `id` | STRING(3) | Código alpha-3 (PK) |
| `name` | STRING | Nombre oficial |
| `flag` | STRING | URL de la bandera |
| `continent` | STRING | Continente |
| `capital` | STRING | Capital |
| `subregion` | STRING | Subregión |
| `area` | FLOAT | Superficie en km² |
| `population` | BIGINT | Cantidad de habitantes |

### Activity
| Campo | Tipo | Descripción |
|---|---|---|
| `id` | UUID | Generado automáticamente (PK) |
| `name` | STRING | Nombre (único) |
| `difficulty` | INTEGER | Escala del 1 al 5 |
| `season` | ENUM | Verano / Otoño / Invierno / Primavera |
| `duration` | STRING | Duración en horas |

> Relación **Many-to-Many** entre `Country` y `Activity` a través de la tabla `actividad_pais`.

---

## 👤 Autor

**Nicolás Gerardo Palma**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nicolas-gerardo-palma/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ngpalma)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:nicolasgerardopalma@gmail.com)
