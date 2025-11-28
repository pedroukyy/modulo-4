# 📊 Módulo 4: Dashboard de Estadísticas

**Desarrollado por:** Pedro Hernández  
**Curso:** Arquitectura Cloud  
**Estado:** 🚀 Desplegado y Operativo

---

## 📖 Descripción

Este módulo es el **Frontend de Analítica** del sistema. Su función es visualizar en tiempo real el comportamiento de los enlaces acortados. Se conecta al Backend (Módulo 3) para obtener el historial de tráfico y renderizar gráficos interactivos.

Permite a los usuarios responder preguntas como:
* ¿Cuántas personas han entrado a mi enlace?
* ¿En qué fechas hubo más tráfico?
* ¿A dónde redirige este código corto?

---

## 🚀 Enlace en Vivo (Demo)

Para ver las estadísticas de un enlace, usa la siguiente estructura:
👉 **[https://d3nskhypo9b48i.cloudfront.net/stats/7f571b8](https://d3nskhypo9b48i.cloudfront.net/stats/7f571b8)**
*(Reemplaza el código final por cualquier ID generado en el Módulo 5)*

---

## 🛠️ Tecnologías Utilizadas

| Categoría | Tecnología | Descripción |
| :--- | :--- | :--- |
| **Frontend** | React.js + Vite | Framework principal de desarrollo. |
| **Visualización** | **Recharts** | Librería para renderizar gráficos de barras dinámicos. |
| **Estilos** | CSS Moderno | Diseño responsive y tarjetas de información. |
| **Conexión** | Axios | Consumo de API REST (Módulo 3). |
| **Infraestructura** | Terraform | Código para desplegar S3 y CloudFront. |
| **Hosting** | AWS S3 | Almacenamiento de archivos estáticos. |
| **CDN** | AWS CloudFront | Distribución global de baja latencia. |
| **CI/CD** | GitHub Actions | Despliegue automático al hacer push. |

---

## ✨ Funcionalidades Principales

1.  **Datos en Tiempo Real:** El dashboard consulta la base de datos DynamoDB al instante. Si alguien da clic en un link, el contador sube automáticamente.
2.  **Gráficos Históricos:**
    * Procesa la lista cruda de fechas ("timestamps") que vienen del backend.
    * Agrupa las visitas por día.
    * Genera un gráfico de barras visual e interactivo.
3.  **Información del Enlace:** Muestra la URL original de destino y el código único.
4.  **Manejo de Errores:** Pantallas amigables de carga ("Loading") y error si el código no existe.

---

## 🏗️ Infraestructura Cloud

El proyecto está alojado en una arquitectura **Serverless Estática**:

* **Bucket S3:** `parcial-modulo-4-pedrokorone-2025` (Almacena el HTML/JS/CSS).
* **CloudFront Distribution:** Se encarga de servir el contenido con HTTPS y caché global.
* **Policies:** El bucket es privado y solo CloudFront tiene permiso para leerlo (OAC).

---

## 💻 Instalación y Ejecución Local

Si deseas correr este proyecto en tu máquina:

```bash
# 1. Entrar a la carpeta del frontend
cd frontend

# 2. Instalar dependencias (incluyendo Recharts)
npm install

# 3. Levantar el servidor de desarrollo
npm run dev
© 2025 Pedro Hernández - Parcial de Arquitectura Cloud