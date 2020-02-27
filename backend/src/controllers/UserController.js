module.exports = {
  async store(req, res) {
    const { name, address, email, phone, password } = req.body;

    return res.send(req.body);
  }
};
