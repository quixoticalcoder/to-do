# to-do

A minimal task-list prototype using **React 18, Vite 5, Express 4, MongoDB, Mongoose 8, and Zod**. The frontend submits a title and description to the API and displays stored tasks. Records are shared globally; there are no user accounts or ownership boundaries.

## Structure

```text
to-do/
├── backend/
│   ├── index.js       Express routes; listens on port 3000
│   ├── db.js          MongoDB connection and task model
│   └── types.js       Zod request schemas
└── frontend/
    └── src/
        ├── App.jsx                   Task-list fetching and state
        └── components/
            ├── CreateTodo.jsx        Task submission form
            └── Todos.jsx             Task rendering
```

The API stores `title`, `description`, and `completed` fields. New tasks set `completed: false`. MongoDB also supplies document identifiers; the schema does not enable timestamps.

## Local setup

Use Node.js 22 LTS with npm and a running MongoDB instance. Install each application from its lockfile:

```bash
git clone https://github.com/quixoticalcoder/to-do.git
cd to-do
npm ci --prefix backend
npm ci --prefix frontend
```

Start the backend:

```bash
cd backend
cp .env.example .env
node --env-file=.env index.js
```

`MONGODB_URI` is required. The example uses `mongodb://127.0.0.1:27017/to_do`; replace it for your database. The application does not load dotenv itself, so the command above uses Node's environment-file support. Keep credentials out of source control.

In a second terminal:

```bash
cd frontend
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`. The browser hardcodes `http://localhost:3000` for API requests. Remote deployment requires changing that origin.

## API

| Method | Route | Request / response |
| --- | --- | --- |
| POST | `/todos` | `{ "title": "Read documentation", "description": "Review setup" }`; creates an incomplete task and returns a message. |
| GET | `/todos` | Returns `{ "todos": [...] }` for all stored tasks. |
| PUT | `/completed` | Accepts `{ "id": "<document-id>" }`; intended to mark completion, but currently uses an unsupported model method. |

Invalid Zod input returns HTTP **411**. The schemas require strings but permit empty titles/descriptions and do not validate MongoDB ID syntax.

```bash
curl -X POST http://localhost:3000/todos \
  -H 'Content-Type: application/json' \
  -d '{"title":"Read documentation","description":"Review setup"}'
curl http://localhost:3000/todos
```

## Implementation limits

- `App.jsx` fetches during rendering, then updates state. This repeatedly triggers requests instead of loading through an effect or explicit refresh.
- The completion button has no click handler. The API also calls `todo.update()`, which is unavailable in the installed Mongoose 8 model API; completion is not functional.
- Async database errors are not forwarded through a consistent Express error handler, and startup does not await the database connection.
- The create form does not check HTTP status before displaying success. Loading, error, and empty states are incomplete.
- There are no edit/delete endpoints, authentication, pagination, or per-user filtering. CORS permits cross-origin requests broadly.

## Development

```bash
npm run build --prefix frontend
npm run lint --prefix frontend
node --check backend/index.js
```

The frontend build passes; ESLint currently reports eight errors.

The backend's `npm test` script is a placeholder that exits with failure. No automated test suite or CI workflow is included. A frontend build and mocked route checks do not establish live MongoDB integration.

## License

The backend package declares `ISC`; no standalone license text or explicit repository-wide license is included.
