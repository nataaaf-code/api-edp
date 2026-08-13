const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");

const TABLE_NAME = "nama_tabel_departemen_it";
const ALLOWED_SORT_COLUMNS = ["id", "nama", "created_at"];

// GET /api/departemen-it?page=1&limit=20&sort=id&order=asc
router.get("/", async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const offset = (page - 1) * limit;

    const sortCol = ALLOWED_SORT_COLUMNS.includes(req.query.sort) ? req.query.sort : "id";
    const order = req.query.order?.toLowerCase() === "desc" ? "DESC" : "ASC";

    const [countRows] = await pool.query(`SELECT COUNT(*) AS total FROM ??`, [TABLE_NAME]);
    const total = countRows[0].total;

    const [rows] = await pool.query(`SELECT * FROM ?? ORDER BY ?? ${order} LIMIT ? OFFSET ?`, [TABLE_NAME, sortCol, limit, offset]);

    res.json({
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("[GET /departemen-it] Error:", err.message);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
});

// GET /api/departemen-it/:id
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM ?? WHERE id = ? LIMIT 1`, [TABLE_NAME, req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Data tidak ditemukan" });
    }

    res.json({ data: rows[0] });
  } catch (err) {
    console.error("[GET /departemen-it/:id] Error:", err.message);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
});

module.exports = router;
