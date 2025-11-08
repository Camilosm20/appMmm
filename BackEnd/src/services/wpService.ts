import { RowDataPacket } from "mysql2";
import pool from "../config/configDB";
import { IWPService } from "../models/interface/IWPService";

class WPService implements IWPService {
  async getAll(limit = 25) {
    try {
      const sql = `SELECT * FROM wp_launch_2025 LIMIT ?`;
      const [rows] = await pool.query<RowDataPacket[]>(sql, [limit]);
      return rows as any[];
    } catch (err: any) {
      console.error("Error en WPService.getAll:", err);
      throw err;
    }
  }
}

export default WPService;