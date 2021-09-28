import Role from "../models/roles.js";
import Usuario from "../models/usuario.js";
import Categoria from "../models/categoria.js";

import bcrypt from "bcryptjs";

export const createRoles = async () => {
  try {
    // contando datos de los roles
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
  const rol = await Role.find({ name: { $in: ["admin", "supervisor"] } });

  if (!user) {
    // create a new admin user
    await Usuario.create({
      username: "admin",
      email: "admin@localhost",
      password: await bcrypt.hash("admin", 10),
      rol: rol.map((role) => role._id),
    });
    console.log('Usuario admin creado!')
  }
};
export const createCategoria = async () => {
  
  try {
    // Contando datos de la categoria
    const count = await Categoria.estimatedDocumentCount();

    // Verificando si hay categorias
    if (count > 0) return;

    // Creando categorias por defecto
    const values = await Promise.all([
      new Categoria({ categoria: "Ropa" }).save(),
      new Categoria({ categoria: "Zapatos" }).save(),
      new Categoria({ categoria: "Cosmeticos" }).save(),
      new Categoria({ categoria: "Celulares" }).save(),
      new Categoria({ categoria: "Comida" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};