export default function loggerMiddleware(req, res, next) {
  const logEntry = {
    method: req.method,
    url: req.originalUrl,
    time: new Date().toISOString(),
    body: req.body,
  };

  console.log('[LOG]', JSON.stringify(logEntry));
  next();
}
