// src/App.tsx

import { useState } from "react";

import Login from "./pages/Login";
import Homepage from "./pages/Homepage";

function App() {

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  return (

    <div>
      
      {isLoggedIn ? (
        <Homepage/>

      ) : (

        <Login
          setIsLoggedIn={setIsLoggedIn}
        />

      )}
      

    </div>

  );
}

export default App;