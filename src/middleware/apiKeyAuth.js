function apiKeyAuth(req, res, next) {
  const key = req.header("x-api-key");

  if (!key || key !== process.env.API_KEY) {
    return res.status(401).json({ error: "Unauthorized: API key tidak valid atau tidak ada" });
  }

  next();
}

module.exports = apiKeyAuth;
