import React, {useEffect, useState} from 'react';
import Recipe from './components/Recipe';
import './App.css';

const App = () => {
  
  const APP_ID = 'b31edb2b';
  const APP_KEY = '014d713b219a46c3af44d4d3edf5d9e4';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('banana');

  useEffect( () => {
    getRecepies();
  }, [query]);

  const getRecepies = async() => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }
  
  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault(); // prevent page refresh
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/> 
        <button
          className="search-button" 
          type="submit">
            Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe title={recipe.recipe.label}
                  calories={recipe.recipe.calories} 
                  image={recipe.recipe.image}
                  ingredients={recipe.recipe.ingredients}
                  />
        ))}
      </div>
    </div>  
  );
};

export default App;

