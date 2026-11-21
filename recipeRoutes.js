const express = require("express");
const router = express.Router();

const Recipe = require("../models/Recipe");

// CREATE RECIPE
router.post("/", async (req, res) => {
    try {
        const recipe = new Recipe(req.body);
        await recipe.save();

        res.status(201).json({
            message: "Recipe added successfully",
            recipe
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// GET ALL RECIPES
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ createdAt: -1 });
        res.json(recipes);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET RECIPE BY ID
router.get("/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found"
            });
        }

        res.json(recipe);

    } catch (error) {
        res.status(400).json({ message: "Invalid recipe ID" });
    }
});

// UPDATE RECIPE
router.put("/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found"
            });
        }

        res.json({
            message: "Recipe updated successfully",
            recipe
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE RECIPE
router.delete("/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found"
            });
        }

        res.json({
            message: "Recipe deleted successfully"
        });

    } catch (error) {
        res.status(400).json({ message: "Invalid recipe ID" });
    }
});

module.exports = router;