## Recipe Application
This is a simple Recipe Management Application built with React, Axios, and JSON Server. The application allows users to register, log in, add, edit, view, search, and delete recipes. User authentication is implemented using local storage, and recipes are linked to individual users.

## Features
User Authentication: Allows users to register, log in, and log out.
Add Recipe: Users can create new recipes with details such as name, ingredients, instructions, category, preparation time, cooking time, servings, and an optional image.
Edit Recipe: Users can edit existing recipes.
Delete Recipe: Users can delete their own recipes.
Recipe List: Displays a list of recipes for the logged-in user.
Search Functionality: Allows users to search for recipes by name.
Account Management: Users can view and update their account details, including password changes.
Protected Routes: Ensures that only authenticated users can access certain pages.
Installation
To get started with the application, follow these steps:

## Clone the repository:

bash
Copy code
git clone https://github.com/your-repo/recipe-app.git
cd recipe-app
Install dependencies:

bash
Copy code
npm install
Start JSON Server:

bash
Copy code
npx json-server --watch db.json --port 5000
This will run a JSON Server to simulate a REST API backend on http://localhost:5000.

Run the application:

bash
Copy code
npm start
The application should now be running on http://localhost:3000.

## Screenshots

### Home Screen (Current Weather)
![Home Screen](public/Screenshot%202024-10-18%20125142.png)
*log into the page.*

### Daily Forecast
![Recipe Ul](public/Screenshot%202024-10-18%20125208.png)s




## Project Structure
The project has the following structure:

css
Copy code
src/
├── components/
│   ├── Account.js
│   ├── AddRecipe.js
│   ├── EditRecipe.js
│   ├── Home.js
│   ├── Login.js
│   ├── Register.js
│   ├── RecipeItem.js
│   ├── RecipeList.js
│   ├── SearchBar.js
│   ├── WithAuth.js
├── App.js
├── index.js
└── styles/
    ├── Login.css
    ├── AddRecipe.css
    └── Recipe.css
 ## Endpoints
Users Endpoint: http://localhost:5000/users
Recipes Endpoint: http://localhost:5000/recipes
Components Overview
App.js: The main component that defines the routes and renders the appropriate component based on the current URL.
Login.js: Component for user login, styled using Login.css.
Register.js: Component for user registration.
Home.js: Displays a list of recipes added by the user, with options to search, edit, and delete.
AddRecipe.js: Allows the user to add a new recipe.
EditRecipe.js: Allows the user to update an existing recipe.
Account.js: Displays the user's email and allows them to change their password.
RecipeItem.js: Represents an individual recipe in the recipe list.
RecipeList.js: Renders a list of RecipeItem components.
SearchBar.js: Handles search functionality for filtering recipes.
WithAuth.js: A higher-order component that protects routes from unauthorized access.
Authentication Flow
Login: Authenticates users by checking the credentials against the users stored in the JSON server.
Register: Adds a new user to the JSON server.
Protected Routes: Uses a higher-order component (WithAuth) to ensure that only authenticated users can access certain pages.
Logout: Clears the user data from local storage and redirects to the login page.
Styling
The application uses CSS files to style components. Some components are styled using CSS inspired by designs from Uiverse.io.

Brutalist Design: Applied to login and input fields for a bold and unique look.
Card Style: Applied to recipe items for consistent display.
Custom Buttons and Forms: Styled for better user experience.
Usage
Register an account: Go to the registration page and create a new user account.
Log in: Use your registered credentials to log in.
Add a recipe: Navigate to "Add Recipe" and fill in the details. You can also upload an image for the recipe.
View and Edit Recipes: The home page will show your added recipes. Click "Edit" to update the details of a recipe.
Delete a Recipe: Click "Delete" to remove a recipe from the list.
Search Recipes: Use the search bar to filter recipes by name.
Update Account: Go to the "Account" page to change your password.
Dependencies
react: Frontend framework for building the user interface.
axios: For making HTTP requests to the JSON server.
react-router-dom: For client-side routing and navigation.
json-server: Simulates a REST API for backend functionality.
Future Improvements
Real Backend Integration: Replace JSON server with a real backend (e.g., Node.js, Express, or Firebase).
Image Storage: Store images in a cloud service (e.g., Cloudinary) rather than using Base64 encoding.
User Roles: Implement different roles (e.g., admin) with varying levels of access.
Responsive Design: Improve mobile-friendliness.
Error Handling: Display more detailed error messages to the user.
License
This project is open-source and available under the MIT License.

 ## Acknowledgments

Uiverse.io for design inspiration.
JSON Server for providing a quick mock backend solution.