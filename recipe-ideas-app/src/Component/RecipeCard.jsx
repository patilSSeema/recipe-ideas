import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const RecipeCard = ({recipe }) => {
  return (
    <Link to={`/recipe/${recipe.idMeal}`}>  <motion.div
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-3 cursor-pointer"
      whileHover={{ scale: 1.05 }}
    >
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="text-lg font-semibold mt-3 text-center">{recipe.strMeal}</h3>
    </motion.div></Link>
  )
}

export default RecipeCard