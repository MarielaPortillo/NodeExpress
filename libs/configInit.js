import Role from "../models/roles.js";
import Usuario from "../models/usuario.js";

import bcrypt from "bcryptjs";

export const createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.estimatedDocumentCount();

    // Verificando si hay roles
    if (count > 0) return;

    // Creando roles por defecto
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "supervisor" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

export const createAdmin = async () => {
  // check for an existing admin user
  const user = await Usuario.findOne({ email: "admin@localhost" });
  // get roles _id
  const roles = await Role.find({ name: { $in: ["admin", "supervisor"] } });

  if (!user) {
    // create a new admin user
    await User.create({
      username: "admin",
      email: "admin@localhost",
      password: await bcrypt.hash("admin", 10),
      roles: roles.map((role) => role._id),
    });
    console.log('Admin User Created!')
  }
};