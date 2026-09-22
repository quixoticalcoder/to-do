# to-do frontend

React 18/Vite 5 client for the shared task list. See the [root README](../README.md) for database setup, API contracts, and current defects.

```bash
npm ci
npm run dev
```

The Express API must run at `http://localhost:3000`. `npm run build` writes `dist/`; `npm run preview` previews that build; `npm run lint` runs ESLint.

The current client creates and lists tasks. Fetching happens during render, and completion buttons are not wired to the API. There is no authentication or API-origin configuration.
