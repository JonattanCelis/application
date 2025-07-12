import { Router } from "express";
import moduleRoleController from '../controllers/moduleRole.controller.js';
const router = Router();
const name = '/moduleRole';
const nameUserRole = '/moduleIdRole';

// Public route
router.route(name)
  .post(moduleRoleController .register) // Register a new user
  .get(moduleRoleController .show);// Show all users

router.route(`${name}/:id`)
  .get(moduleRoleController .findById)// Show a user by ID
  .put(moduleRoleController .update)// Update a user by ID
  .delete(moduleRoleController .delete);// Delete a user by ID

  //Login route
  // router.route(`${nameUserRole}/:id`)
  //   .get(moduleRoleController .showRoleUser);// Login a user

export default router;