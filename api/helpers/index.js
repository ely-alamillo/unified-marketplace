const sendUserError = (err, res) => {
  res.status(422);
  if (typeof err === 'string') {
    res.json({ err });
    return;
  } else if (err && err.message) {
    res.json({
      message: err.message,
      stack: err.stack
    });
    return;
  }
  res.json(err);
};

module.exports = { sendUserError };
