import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        setRecipe(data.meals[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-lg font-medium text-gray-600">
          Loading recipe details... ⏳
        </p>
      </div>
    );

  if (!recipe)
    return (
      <div className="text-center mt-10 text-red-500 text-lg font-medium">
        Recipe not found 😕
      </div>
    );

  return (
    <motion.div
      className="max-w-6xl mx-auto p-6 md:p-10 bg-gray-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Back Button */}
      <motion.button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-white bg-[#1E3A8A] hover:bg-[#1E40AF] font-medium px-4 py-2 rounded-lg shadow-md transition-all"
        whileHover={{ scale: 1.05 }}
      >
        ⬅️ Back
      </motion.button>

      {/* Title */}
      <motion.h1
        className="text-4xl font-bold text-[#1E3A8A] text-center mb-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {recipe.strMeal}
      </motion.h1>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Image Section */}
        <motion.div
          className="rounded-2xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full object-cover rounded-2xl"
          />
        </motion.div>

        {/* Ingredients Section */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-[#1E3A8A] mb-5">
            🧾 Ingredients
          </h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 20 }).map((_, i) => {
              const ingredient = recipe[`strIngredient${i + 1}`];
              const measure = recipe[`strMeasure${i + 1}`];
              if (ingredient) {
                return (
                  <motion.li
                    key={i}
                    className="bg-gray-50 text-gray-700 border border-gray-200 rounded-lg p-3 text-sm shadow-sm hover:shadow-md transition hover:bg-white"
                    whileHover={{ scale: 1.03 }}
                  >
                    <span className="font-medium text-gray-800">
                      {ingredient}
                    </span>{" "}
                    <span className="text-gray-500">– {measure}</span>
                  </motion.li>
                );
              }
              return null;
            })}
          </ul>
        </motion.div>
      </div>

      {/* Details Section */}
      <motion.div
        className="bg-white rounded-xl shadow-md p-6 border border-gray-100 space-y-5 mt-10"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex justify-between flex-wrap text-gray-700">
          <p>
            <span className="font-semibold text-[#1E3A8A]">Category:</span>{" "}
            {recipe.strCategory}
          </p>
          <p>
            <span className="font-semibold text-[#1E3A8A]">Area:</span>{" "}
            {recipe.strArea}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#1E3A8A] mb-2">
            🧑‍🍳 Instructions
          </h2>
          <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
            {recipe.strInstructions}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
