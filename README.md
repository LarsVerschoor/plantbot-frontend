# plantbot-frontend

## How to set up:

1. Clone repository.

```bash
git clone https://github.com/LarsVerschoor/plantbot-frontend.git
```

2. Navigate to the created directory.

```bash
cd plantbot-frontend
```

3. Install dependencies.

```bash
npm install
```

4. Rename .env.development.example and .env.production.example to exclude .example and enter the URL.

```text
VITE_BACKEND_URL=https://example.com
```

## How to run:

Vite run development

```bash
npm run dev
```

Vite build production

```bash
npm run build
```