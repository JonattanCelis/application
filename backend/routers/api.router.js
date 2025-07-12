import { Router } from "express";
import RoleController from '../controllers/role.controller.js';
import ProfileController from "../controllers/profile.controller.js";
import ApiUserController from "../controllers/apiUser.controller.js";
import { verifyApiToken } from "../middleware/verifyApiToken.js";

const router = Router();

router.post("/api-user", ApiUserController.create);        // Registro
router.post("/login", ApiUserController.login);   // Login con JWT

const name='/role';
const name2= '/profile';
// Ejemplo de ruta protegida solo para usuarios con token válido
router.route(name)
  .post(verifyApiToken,RoleController.register) // Register a new user
  .get(verifyApiToken,RoleController.show);// Show all users

router.route(`${name}/:id`)
  .get(verifyApiToken,RoleController.findById)// Show a user by ID
  .put(verifyApiToken,RoleController.update)// Update a user by ID
  .delete(verifyApiToken,RoleController.delete);// Delete a user by ID

   router.route(name2)
    .post(verifyApiToken,ProfileController.register) // Register a new profile
    .get(verifyApiToken,ProfileController.show);// Show all profile
  
  router.route(`${name2}/:id`)
    .get(verifyApiToken,ProfileController.findById)// Show a profile by ID
    .put(verifyApiToken,ProfileController.update)// Update a profile by ID
    .delete(verifyApiToken,ProfileController.delete);// Delete a profile by ID
  

export default router;
