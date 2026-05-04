# 🎴 PokéCards Market

Una tienda de cartas coleccionables interactiva construida con **React + Vite**, que consume datos en tiempo real desde la **PokéAPI** y permite realizar compras a través de **PayPal Sandbox**.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=flat-square&logo=javascript)
![PayPal](https://img.shields.io/badge/PayPal-Sandbox-00457C?style=flat-square&logo=paypal)

---

## ✨ Funcionalidades

- **30 cartas dinámicas** cargadas desde la PokéAPI con imagen oficial, nombre, tipo y stats
- **Precios por rareza** — calculados automáticamente según el tipo del Pokémon (Dragón = más caro, Normal = más barato)
- **Filtros por tipo** — filtra el catálogo en tiempo real
- **Integración PayPal Sandbox** — botón de pago real con el SDK oficial de PayPal
- **Validación de pago** — la carta solo se desbloquea si PayPal confirma `status: COMPLETED`
- **Mi Colección** — vista de todas las cartas adquiridas con resumen de inversión
- **Persistencia local** — las cartas compradas se guardan en `localStorage`
- **Notificaciones** — toasts animados de éxito/error con ID de transacción
- **Responsive** — funciona en móvil y escritorio

---

## 🚀 Instalación y uso

### Requisitos
- Node.js 18 o superior
- npm 9 o superior

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/leninalejan/pokecards-market.git
cd pokecards-market

# 2. Instalar dependencias
npm install

# 3. Correr en modo desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:5173
```

### Build para producción

```bash
npm run build
npm run preview
```

---

## 🔑 Configuración de PayPal Sandbox

1. Crear cuenta en [developer.paypal.com](https://developer.paypal.com/)
2. Ir a **Dashboard → My Apps & Credentials → Sandbox**
3. Crear una nueva app y copiar el **Client ID**
4. Pegarlo en `src/constants.js`:

```js
export const PAYPAL_CLIENT_ID = 'TU_CLIENT_ID_AQUI'
```

### Credenciales de prueba
Para probar el flujo de pago, usar una cuenta **buyer sandbox** desde el dashboard de PayPal Developer.

> **Nota:** Si PayPal no carga en entorno local (sin HTTPS), el sistema activa automáticamente un botón de simulación que reproduce el flujo completo con 85% éxito / 15% rechazo.

---

## 📁 Estructura del proyecto

```
pokecards-market/
├── public/
│   └── pokeball.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── PokeCard.jsx
│   │   ├── BuyModal.jsx
│   │   ├── MarketPage.jsx
│   │   ├── MyCardsPage.jsx
│   │   ├── TypeBadge.jsx
│   │   ├── Toast.jsx
│   │   └── Loader.jsx
│   ├── hooks/
│   │   ├── usePokemon.js
│   │   ├── useOwned.js
│   │   └── useToast.js
│   ├── constants.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├──package-lock.json
├── package.json
├── README.md
└── vite.config.js

```

---

## 🛠 Stack tecnológico

| Tecnología | Uso |
|---|---|
| React 18 | UI y manejo de estado |
| Vite 5 | Bundler y servidor de desarrollo |
| CSS Modules | Estilos encapsulados por componente |
| PokéAPI | Datos de personajes, imágenes y tipos |
| PayPal SDK JS | Procesamiento de pagos Sandbox |
| localStorage | Persistencia de cartas compradas |

---

## 🌐 APIs utilizadas

- **PokéAPI** — `https://pokeapi.co/api/v2/pokemon/{id}` — Datos, imágenes y tipos
- **PayPal JS SDK** — `https://www.paypal.com/sdk/js` — Botón de pago y captura de órdenes

---

## 📄 Licencia

MIT — libre para uso educativo y personal.
