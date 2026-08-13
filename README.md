## Cara jalanin lokal (buat testing)

```bash
npm install
cp .env.example .env
npm run dev
```

Test:

```bash
curl http://localhost:4000/health
curl -H "x-api-key: API_KEY_LO" http://localhost:4000/api/departemen-it?page=1&limit=10
```

## Cara deploy Docker

```bash
docker build -t api-edp .
docker run -d \
  --name api-edp \
  --restart unless-stopped \
  -p 4000:4000 \
  --env-file .env \
  api-edp
```

## Endpoint yang tersedia

| Method | Endpoint                                               | Keterangan                |
| ------ | ------------------------------------------------------ | ------------------------- |
| GET    | `/health`                                              | Cek API hidup, tanpa auth |
| GET    | `/api/departemen-it?page=1&limit=20&sort=id&order=asc` | List data + pagination    |
| GET    | `/api/departemen-it/:id`                               | Detail satu row           |
