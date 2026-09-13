const validarCampos = (campos) => (req, res, next) => {
  for (const campo of campos) {
    if (!req.body[campo] || req.body[campo].toString().trim() === '') {
      return res.status(400).json({ ok: false, error: `El campo '${campo}' es obligatorio` });
    }
  }
  next();
};

export default validarCampos;
