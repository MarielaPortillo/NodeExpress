import usuario from "../models/usuario.js";
import { Roles } from "../models/roles.js";

const chechRole = {};


chechRole.checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await usuario.findOne({ username: req.body.username });
    if (user)
      return res.status(400).json({ message: "The user already exists" });
    const email = await usuario.findOne({ email: req.body.email });
    if (email)
      return res.status(400).json({ message: "The email already exists" });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

chechRole.checkRolesExisted = (req, res, next) => {
  if (req.body.rol) {
    for (let i = 0; i < req.body.rol.length; i++) {
      if (!Roles.includes(req.body.rol[i])) {
        return res.status(400).json({
          message: `El rol ${req.body.rol[i]} no existe pruebe con admin, supervisor o user`,
        });
      }
    }
  }

  next();
};

export default chechRole