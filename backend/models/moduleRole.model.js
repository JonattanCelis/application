import { connect } from '../config/db/connectMysql.js';

class ModuleRoleModel {

  static async create({ module_fk, role_user_fk, can_view, can_create, can_edit, can_delete }) {
    const [result] = await connect.query(
      `INSERT INTO module_role 
      (module_fk, role_user_fk, can_view, can_create, can_edit, can_delete) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [module_fk, role_user_fk, can_view, can_create, can_edit, can_delete]
    );
    return result.insertId;
  }

  static async show() {
    const [rows] = await connect.query(
      'SELECT * FROM module_role ORDER BY id'
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await connect.query(
      'SELECT * FROM module_role WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async update(id, { module_fk, role_user_fk, can_view, can_create, can_edit, can_delete }) {
    const [result] = await connect.query(
      `UPDATE module_role 
       SET module_fk = ?, role_user_fk = ?, can_view = ?, 
           can_create = ?, can_edit = ?, can_delete = ?, 
           updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [module_fk, role_user_fk, can_view, can_create, can_edit, can_delete, id]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async delete(id) {
    const [result] = await connect.query(
      'DELETE FROM module_role WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}

export default ModuleRoleModel;
