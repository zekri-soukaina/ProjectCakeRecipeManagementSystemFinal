"use strict";
// Data:
const cakeRecipes = require("./cake-recipes.json");
// console.log(cakeRecipes[0])
// console.log(cakeRecipes[9])
// console.log(cakeRecipes.length)
// console.log(typeof cakeRecipes)

// Functions:
// *************************************************************************************
// When this option is selected, the program should display a list of all unique authors found in the recipe data.
const getUniqueAuthors = (listOfRecipes) => {
  const uniqueAuthors = [];
  // for (let i = 0; i < listOfRecipes.length; i++) {
  listOfRecipes.forEach((recipe) => {
    const author = recipe.Author;
    if (!uniqueAuthors.includes(author)) {
      uniqueAuthors.push(author);
    }
  });
  return uniqueAuthors;
};
// *************************************************************************************
// If you choose this option, you will be prompted to enter the name of an author.
// The program will then display a list of recipe names authored by the specified author.
const searchRecipesByAuthor = (listOfRecipes, authorName) => {
  const recipesByAuthor = [];
  listOfRecipes.filter((recipe) => {
    const { Author } = recipe;
    if (Author.toLowerCase() === authorName.toLowerCase()) {
      recipesByAuthor.push(recipe);
    }
  });
  return recipesByAuthor;
};
// *************************************************************************************
// This option allows you to search for recipes containing a specific ingredient.
// You will be prompted to enter the name of the ingredient.
// The program will display a list of recipe names that include the entered ingredient.
const searchRecipesByIngredient = (listOfRecipes, ingredientName) => {
  const recipesByIngredient = [];
  listOfRecipes.filter((recipe) => {
    const { Ingredients } = recipe;
    if (
      Ingredients.some((ingredient) =>
        ingredient.includes(ingredientName.toLowerCase())
      )
    ) {
      recipesByIngredient.push(recipe);
    }
  });
  return recipesByIngredient;
};
// *************************************************************************************
// If you select this option, you can search for a recipe by its name.
// Enter the name of the recipe you're looking for.
// The program will display the details of the found recipe.
// You'll also have the option to save the ingredients of the recipe. Save them in a global variable, so that you can save the ingredients of multiple recipes and also use it for the next step.
const savedRecipes = [];
const searchRecipesByName = (listOfRecipes, recipeName) => {
  const recipesByName = listOfRecipes.find((recipe) => {
    const { Name } = recipe;
    if (Name.toLowerCase().includes(recipeName.toLowerCase())) {
      // savedRecipies.push(recipe)
      return recipe;
    } else {
      return null;
    }
  });
  return recipesByName;
};
// *************************************************************************************
// Choose this option to view a list of ingredients from the saved recipes.
// The program will display the ingredient list from all the saved recipes.
const printSavedIngredients = (listOfRecipes) => {
  const savedIngredients = listOfRecipes.reduce((acc, currentValue) =>
    acc.concat(currentValue)
  );
  return savedIngredients;
};

// *************************************************************************************
// Main:

const displayMenu = () => {
  console.log("---------------------------------------------------");
  console.log("---Recipe Management System Menu:               ---");
  console.log("---1. Show All Authors                          ---");
  console.log("---2. Show Recipe names by Author               ---");
  console.log("---3. Show Recipe names by Ingredient           ---");
  console.log("---4. Get Recipe by Name                        ---");
  console.log("---5. Get All Ingredients of Saved Recipes      ---");
  console.log("---0. Exit                                      ---");
  const choice = prompt("---Enter a number (1-5) or 0 to exit:    ");
  console.log("---------------------------------------------------");
  return parseInt(choice);
};
// *************************************************************************************
let choice;

do {
  choice = displayMenu();

  switch (choice) {
    case 1:
      // When this option is selected, the program should display a list of all unique authors found in the recipe data.
      const authors = getUniqueAuthors(cakeRecipes);
      console.log("All Authors:", authors);
      // console.log(authors.length)
      break;

    case 2:
      // If you choose this option, you will be prompted to enter the name of an author.
      // The program will then display a list of recipe names authored by the specified author.
      const authorName = prompt("Enter the author name: ");
      const recipesByAuthor = searchRecipesByAuthor(cakeRecipes, authorName);
      if (recipesByAuthor.length !== 0) {
        console.log(`Recipes by Author: ${authorName}`);
        console.log("---------------------------------------------------");
        for (let i = 0; i < recipesByAuthor.length; i++) {
          console.log(`${i + 1} : ${recipesByAuthor[i].Name}`);
        }
      } else {
        console.log("---------------------------------------------------");
        console.log("No recipes found by the specified author.");
        console.log("Slelect author from the list of authors, press:1.");
      }
      break;

    case 3:
      // This option allows you to search for recipes containing a specific ingredient.
      // You will be prompted to enter the name of the ingredient.
      // The program will display a list of recipe names that include the entered ingredient.
      const ingredient = prompt("Enter the ingredient name: ");
      const recipesByIngredient = searchRecipesByIngredient(
        cakeRecipes,
        ingredient
      );
      if (recipesByIngredient.length !== 0) {
        console.log(`Recipes contain the ingredient "${ingredient}":`);
        console.log("---------------------------------------------------");
        for (let i = 0; i < recipesByIngredient.length; i++) {
          console.log(`${i + 1} : ${recipesByIngredient[i].Name}`);
        }
      } else {
        console.log("---------------------------------------------------");
        console.log(`No recipes found with the ingredient "${ingredient}".`);
      }
      break;

    case 4:
      // If you select this option, you can search for a recipe by its name.
      // Enter the name of the recipe you're looking for.
      // The program will display the details of the found recipe.
      // You'll also have the option to save the ingredients of the recipe. Save them in a global variable, so that you can save 
      // the ingredients of multiple recipes and also use it for the next step.
      const recipeName = prompt("Enter the recipe name: ");
      const recipe = searchRecipesByName(cakeRecipes, recipeName);
      if (recipe !== undefined) {
        console.log("---------------------------------------------------");
        console.log(`Recipe: ${recipe.Name}`);
        console.log(`Author: ${recipe.Author}`);
        console.log(`Ingredients:`);
        for (let i = 0; i < recipe.Ingredients.length; i++) {
          console.log(`${i + 1} : ${recipe.Ingredients[i]}`);
        }
        console.log("---------------------------------------------------");
        const save = prompt(
          "Do you want to save the ingredients of this recipe? (yes/no): "
        );
        if (save.toLowerCase() === "yes") {
          savedRecipes.push(recipe.Ingredients);

          console.log("---------------------------------------------------");
          console.log("Ingredients saved successfully.");
          // console.log("savedRecipes" , savedRecipes)
        } else {
          console.log("---------------------------------------------------");
          console.log("Ingredients not saved.");
        }
      } else {
        console.log("---------------------------------------------------");
        console.log(`No recipes found with the name "${recipeName}".`);
      }
      break;

    case 5:
      // Choose this option to view a list of ingredients from the saved recipes.
      // The program will display the ingredient list from all the saved recipes.
      const savedIngredients = printSavedIngredients(savedRecipes);

      console.log("Saved Ingredients:", savedIngredients);
      break;

    case 0:
      console.log("Exiting...");
      break;

    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);
