const knex = require("../db/knex");

exports.getAllProducts = async (req, res) => {
  try {
    // Use query builder explicitly
    const products = await knex.queryBuilder().select("*").from("products");
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching products" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await knex
      .queryBuilder()
      .insert(req.body)
      .into("products")
      .returning("*");
    res.status(201).json(newProduct[0]);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the product" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const [updatedProduct] = await knex
      .queryBuilder()
      .table("products")
      .where({ id: req.params.id })
      .update(req.body)
      .returning("*");

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedCount = await knex
      .queryBuilder()
      .table("products")
      .where({ id: req.params.id })
      .del();

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the product" });
  }
};
