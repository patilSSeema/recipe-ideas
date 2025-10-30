import { useState } from "react";
import { motion } from "framer-motion";

export default function SearchBar({ onSearch }) {
  const [ingredient, setIngredient] = useState("");
  const [type, setType] = useState("all");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ingredient.trim()) {
      setError("Please enter an ingredient before searching.");
      return;
    }

    if (!/^[a-zA-Z,\s]+$/.test(ingredient)) {
      setError("Ingredient name should only contain letters and commas.");
      return;
    }

    setError("");
    setLoading(true);

    await onSearch(ingredient.trim(), type);

    setLoading(false);
  };

  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 w-full max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <input
          type="text"
          placeholder="Enter ingredient (e.g., rice, paneer)"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          className="w-full sm:flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-3 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All</option>
          <option value="veg">Vegetarian</option>
          <option value="nonveg">Non-Vegetarian</option>
        </select>

        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className={`px-6 py-3 rounded-xl text-white font-semibold transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Searching..." : "Search"}
        </motion.button>
      </motion.form>

      {/* ✅ Error below all inputs/buttons */}
      {error && (
        <motion.p
          className="text-red-500 text-sm mt-3 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}
    </>
  );
}
