import { useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "../Component/SearchBar";
import RecipeCard from "../Component/RecipeCard";
import toast from "react-hot-toast";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const handleSearch = async (ingredient, type) => {
  const ingredients = ingredient
    .split(",")
    .map((i) => i.trim().toLowerCase())
    .filter((i) => i);

  if (ingredients.length === 0) {
    toast.error("Please enter at least one ingredient 🥕");
    return;
  }

  setLoading(true);
  setError("");

  try {
    let allResults = [];

    for (const ing of ingredients) {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ing)}`
      );
      const data = await res.json();
      if (data.meals) {
        allResults.push(data.meals);
      }
    }

    if (allResults.length === 0) {
      toast.error("No recipes found for those ingredients 🍽️");
      setRecipes([]);
      setLoading(false);
      return;
    }

    // ✅ Combine all recipes (ANY ingredient match)
    let combined = allResults.flat();
    const uniqueMap = new Map(combined.map((m) => [m.idMeal, m]));
    let commonMeals = Array.from(uniqueMap.values());

    // ✅ Veg / Non-Veg filter
    if (type !== "all") {
      const resVeg = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian`
      );
      const dataVeg = await resVeg.json();
      const vegSet = new Set((dataVeg.meals || []).map((m) => m.idMeal));

      let veganSet = new Set();
      try {
        const resVgn = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegan`
        );
        const dataVgn = await resVgn.json();
        veganSet = new Set((dataVgn.meals || []).map((m) => m.idMeal));
      } catch {}

      const excluded = new Set([...vegSet, ...veganSet]);

      if (type === "veg") {
        commonMeals = commonMeals.filter((m) => excluded.has(m.idMeal));
      } else if (type === "nonveg") {
        commonMeals = commonMeals.filter((m) => !excluded.has(m.idMeal));
      }
    }

    setRecipes(commonMeals);

    toast.success(`${commonMeals.length} recipes found 👨‍🍳`);
  } catch (err) {
    console.error(err);
    setError("Failed to fetch recipes.");
    toast.error("Something went wrong! Please try again ⚠️");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen bg-gray-50">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold text-center text-[#1E3A8A]   mb-10"
      >
     Find the Perfect Recipe for Every Ingredient 🍝
      </motion.h1>

      {/* Search Section */}
      <div className="bg-white shadow-md rounded-xl p-6 max-w-3xl mx-auto border border-gray-100">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Loading State */}
      {loading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 mt-8 text-lg"
        >
          Fetching recipes... ⏳
        </motion.p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-500 mt-6 font-medium">{error}</p>
      )}

      {/* Recipes Grid */}
      {!loading && recipes.length > 0 && (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10"
        >
          {recipes.map((recipe) => (
            <motion.div
              key={recipe.idMeal}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <RecipeCard recipe={recipe} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* No Results */}
      {!loading && !recipes.length && !error && (
        <p className="text-center text-gray-500 mt-10 text-lg">
          🔍 Try searching for an ingredient like “rice” or “tomato”.
        </p>
      )}
    </div>
  );
}
