const sendErrorResponse = (res, error) => {
    console.error(error);
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    res.status(statusCode).json({ error: message });
  };
  
  module.exports = { sendErrorResponse };
  