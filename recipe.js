const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: true,
        trim: true
    },

    category: {
        type: String,
        required: true,
        enum: ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"]
    },

    ingredients: {
        type: String,
        required: true
    },

    preparationSteps: {
        type: String,
        required: true
    },

    cookingTime: {
        type: Number,
        required: true,
        min: 1
    }

}, { timestamps: true });

module.exports = mongoose.model("Recipe", recipeSchema);