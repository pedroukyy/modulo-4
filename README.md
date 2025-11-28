# 📊 Módulo 4: Dashboard de Estadísticas

Este módulo es el Frontend encargado de la visualización de datos. Permite a los usuarios ver las métricas de rendimiento de sus enlaces acortados de forma gráfica y elegante.

## 🚀 Enlace en Vivo (Demo)
👉 **[https://d3nskhypo9b48i.cloudfront.net/stats/prueba](https://d3nskhypo9b48i.cloudfront.net/stats/prueba)**

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React.js + Vite
* **Estilos:** CSS-in-JS (Diseño responsive y moderno).
* **Visualización:** Gráficos de barras personalizados con CSS puro (sin librerías pesadas).
* **Infraestructura (IaC):** Terraform
* **Nube AWS:** S3 + CloudFront.
* **CI/CD:** GitHub Actions.

## ✨ Funcionalidades

1.  **Dashboard Visual:** Tarjeta de información con Total de Visitas y URL original.
2.  **Gráficos Históricos:** Visualización de barras de las visitas de los últimos 7 días.
3.  **Filtrado (Mock):** Preparado para recibir datos filtrados por fecha desde el backend.
4.  **Integración:** Listo para consumir API Gateway (Módulo 3).

## 🏗️ Despliegue e Infraestructura

El proyecto utiliza un **Bucket S3** (`parcial-modulo-4-pedrokorone-2025`) configurado como sitio web estático, distribuido a través de **CloudFront** para baja latencia.

### Comandos Clave

**Levantar entorno local:**
```bash
cd frontend
npm run dev