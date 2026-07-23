module.exports = (app) => {
  // This middleware runs whenever a requested URL doesn't match any of our routes
  app.use((req, res, next) => {
    res.status(404).json({ message: "This route does not exist" });
  });

  // This middleware catches any errors passed down with next(err)
  app.use((err, req, res, next) => {
    // Log the error to your Mac's terminal so we can debug it
    console.error("ERROR", req.method, req.path, err);

    // Only send a 500 status if the error hasn't already been given a status code
    if (!res.headersSent) {
      res.status(500).json({
        message: "Internal server error. Check the server console",
      });
    }
  });
};

