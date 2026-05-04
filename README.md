# PokéCards Market 🎴⚡

Tienda de cartas coleccionables con integración de PokéAPI y PayPal Sandbox.

## Tecnologías
- React 18 + Vite
- CSS Modules
- PokéAPI (https://pokeapi.co/)
- PayPal SDK JS (Sandbox)

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:5173
```

## Configuración de PayPal Sandbox

1. Ir a https://developer.paypal.com/
2. Crear una cuenta de desarrollador (gratis)
3. Ir a **Dashboard → My Apps & Credentials → Sandbox**
4. Crear una nueva app y copiar el **Client ID**
5. Pegar el Client ID en `src/constants.js`:

```js
export const PAYPAL_CLIENT_ID = 'TU_CLIENT_ID_AQUI'
```

### Credenciales de prueba (buyer sandbox)
- **Email:** sb-xxxxx@personal.example.com *(ver tu dashboard)*
- **Contraseña:** la que asignaste al crear la cuenta sandbox buyer

> **Nota:** Si PayPal no carga (sin HTTPS en local), el sistema usa un botón simulado que reproduce el flujo completo de pago con 85% éxito / 15% rechazo.

## Funcionalidades

- ✅ 30 cartas cargadas desde la PokéAPI
- ✅ Filtros por tipo de Pokémon
- ✅ Precios dinámicos según el tipo
- ✅ Integración con PayPal SDK (Sandbox)
- ✅ Validación de pago exitoso/fallido
- ✅ Desbloqueo visual de cartas compradas
- ✅ Persistencia en localStorage
- ✅ Vista "Mi Colección"
- ✅ Notificaciones toast
- ✅ Responsive para móvil

## Estructura del proyecto

```
src/
├── components/
│   ├── Header.jsx / .module.css
│   ├── PokeCard.jsx / .module.css
│   ├── BuyModal.jsx / .module.css
│   ├── MarketPage.jsx / .module.css
│   ├── MyCardsPage.jsx / .module.css
│   ├── TypeBadge.jsx / .module.css
│   ├── Toast.jsx / .module.css
│   └── Loader.jsx / .module.css
├── hooks/
│   ├── usePokemon.js
│   ├── useOwned.js
│   └── useToast.js
├── constants.js
├── App.jsx
├── main.jsx
└── index.css
```
