const validarCampos = (campos) => (req, res, next) => {
  for (const campo of campos) {
    const valor = req.body[campo];
    if (valor === undefined || valor === null || valor.toString().trim() === '') {
      return res.status(400).json({ ok: false, error: `El campo '${campo}' es obligatorio` });
    }
  }
  next();
};

export default validarCampos;
