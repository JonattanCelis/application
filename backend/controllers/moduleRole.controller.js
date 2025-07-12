import ModuleRoleModel from '../models/moduleRole.model.js';

class ModuleRoleController {

  async register(req, res) {
    try {
      const { module_fk, role_user_fk, can_view, can_create, can_edit, can_delete } = req.body;
      // Basic validate
      if (!module_fk || !role_user_fk || !can_view || !can_create || !can_edit || !can_delete) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }
      // Create the new User Status
      const ModuleRoleModelId = await ModuleRoleModel.create({
        module_fk, 
        role_user_fk, 
        can_view, 
        can_create, 
        can_edit, 
        can_delete
      });
      res.status(201).json({
        message: 'User Status created successfully',
        data: ModuleRoleModelId
      });
    } catch (error) {
      console.error('Error in registration:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async show(req, res) {
    try {
      // Verify if the User Status already exists
      const existingModuleRoleModel = await ModuleRoleModel.show();
      if (!existingModuleRoleModel) {
        return res.status(409).json({ error: 'The User Status no already exists' });
      }
      res.status(201).json({
        message: 'User Status successfully',
        data: existingModuleRoleModel
      });
    } catch (error) {
      console.error('Error in registration:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(req, res) {
    try {
      const { module_fk, role_user_fk, can_view, can_create, can_edit, can_delete } = req.body;
      const id = req.params.id;
      // Basic validate
      if (!module_fk || !role_user_fk || !can_view || !can_create || !can_edit || !can_delete || !id) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }
      // Verify if the User Status already exists
      const updateModuleRoleModel = await ModuleRoleModel.update(id, { module_fk, role_user_fk, can_view, can_create, can_edit, can_delete });
      if (!updateModuleRoleModel) {
        return res.status(409).json({ error: 'The User Status already exists' });
      }
      res.status(201).json({
        message: 'User Status update successfully',
        data: updateModuleRoleModel
      });
    } catch (error) {
      console.error('Error in registration:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req, res) {
    try {

      const id = req.params.id;
      // Basic validate
      if (!id) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }
      // Verify if the User Status already exists
      const deleteModuleRoleModel = await ModuleRoleModel.delete(id);
      if (!deleteModuleRoleModel) {
        return res.status(409).json({ error: 'The User Status already exists' });
      }
      res.status(201).json({
        message: 'User Status delete successfully',
        data: deleteModuleRoleModel
      });
    } catch (error) {
      console.error('Error in registration:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id;

      // Basic validate
      if (!id) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }
      // Verify if the User Status already exists
      const existingModuleRoleModel = await ModuleRoleModel.findById(id);
      if (!existingModuleRoleModel) {
        return res.status(409).json({ error: 'The User Status No already exists' });
      }
      res.status(201).json({
        message: 'User Status successfully',
        data: existingModuleRoleModel
      });
    } catch (error) {
      console.error('Error in registration:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
export default new ModuleRoleController();