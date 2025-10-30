import { useState } from "react";
import RecipeCard from "../Component/RecipeCard";
import { useNavigate } from "react-router-dom";


export default function Category() {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleCategory = async (cat) => {
    setCategory(cat);
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`
    );
    const data = await res.json();
    setRecipes(data.meals || []);
  };

  return (
    <div className="container mx-auto px-4 py-8">
        <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-white bg-[#1E3A8A] hover:bg-[#1E40AF] font-medium px-4 py-2 rounded-lg shadow-md transition-all"
        whileHover={{ scale: 1.05 }}
      >
        ⬅️ Back
      </button>
      <h1 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-6">
        Recipe Categories 🍝
      </h1>
    

      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => handleCategory("Vegetarian")}
          className={`px-4 py-2 rounded-lg font-medium border ${
            category === "Vegetarian"
              ? "bg-green-600 text-white"
              : "bg-white text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
          }`}
        >
          Vegetarian
        </button>
        <button
          onClick={() => handleCategory("Chicken")}
          className={`px-4 py-2 rounded-lg font-medium border ${
            category === "Chicken"
              ? "bg-green-600 text-white"
              : "bg-white text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
          }`}
        >
          Chicken
        </button>
        <button
          onClick={() => handleCategory("Seafood")}
          className={`px-4 py-2 rounded-lg font-medium border ${
            category === "Seafood"
              ? "bg-green-600 text-white"
              : "bg-white text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
          }`}
        >
          Seafood
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {recipes?.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
