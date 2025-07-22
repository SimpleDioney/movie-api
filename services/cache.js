const mcache = require('memory-cache');

const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url;
    const cachedBody = mcache.get(key);

    if (cachedBody) {
      console.log(`Cache HIT para a chave: ${key}`);
      res.send(cachedBody);
      return;
    } else {
      console.log(`Cache MISS para a chave: ${key}`);
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

module.exports = cacheMiddleware;
