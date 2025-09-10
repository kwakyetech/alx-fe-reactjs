import { useRecipeStore } from '../recipeStore'

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <div>
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes available. Add some recipes to get started!</p>
      ) : (
        recipes.map(recipe => (
          <div key={recipe.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', borderRadius: '5px' }}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;