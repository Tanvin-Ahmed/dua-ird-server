const { db } = require("../db/db");

const getAllCategory = async (req, res) => {
  try {
    const sql = `SELECT * FROM category`;
    db.all(sql, (err, result) => {
      if (err) return res.status(404).json({ message: err.message });
      return res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

const getSubcategoriesByCategoryId = async (req, res) => {
  try {
    const catId = req.params.catId;
    const sql = `SELECT * FROM sub_category WHERE cat_id =${catId}`;
    db.all(sql, (err, result) => {
      if (err) return res.status(404).json({ message: err.message });
      return res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

const getDuaByCatAndSubCatId = async (req, res) => {
  try {
    const { catId, subCatId } = req.params;
    const sql = `SELECT * FROM dua WHERE cat_id=${catId} AND subcat_id=${subCatId}`;
    db.all(sql, (err, result) => {
      if (err) return res.status(404).json({ message: err.message });
      return res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

const getDuaNameByCatAndSubCatId = async (req, res) => {
  try {
    const { catId, subCatId } = req.params;
    const sql = `SELECT cat_id, subcat_id, dua_id, dua_name_en, dua_name_bn FROM dua WHERE cat_id=${catId} AND subcat_id=${subCatId}`;
    db.all(sql, (err, result) => {
      if (err) return res.status(404).json({ message: err.message });
      return res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

const getCategoryNameByCatId = async (req, res) => {
  try {
    const { catId } = req.params;
    const sql = `SELECT cat_name_bn, cat_name_en, cat_id FROM category WHERE cat_id=${catId}`;
    db.get(sql, (err, result) => {
      if (err) return res.status(404).json({ message: err.message });
      return res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

const getAllInfoOfCategory = async (req, res) => {
  try {
    const catId = req.params.catId;
    const sql = `
        SELECT
            c.cat_id,
            c.cat_name_en,
            c.cat_name_bn,
            s.subcat_id,
            s.subcat_name_en,
            s.subcat_name_bn,
            d.*
        FROM Category c WHERE c.cat_id = ${catId}
        LEFT JOIN Subcategory s ON c.cat_id = s.cat_id
        LEFT JOIN Dua d ON s.subcat_id = d.subcat_id
        ORDER BY c.cat_id, s.subcat_id, d.dua_id;
    `;

    db.get(sql, (err, result) => {
      if (err) return res.status(404).json({ message: err.message });
      return res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getAllCategory,
  getSubcategoriesByCategoryId,
  getDuaByCatAndSubCatId,
  getDuaNameByCatAndSubCatId,
  getCategoryNameByCatId,
  getAllInfoOfCategory,
};
