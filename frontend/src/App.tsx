// src/App.tsx

import { useState } from "react";

import Login from "./pages/Login";
import Navbar from "./components/Home/Navbar";

function App() {

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  return (

    <div>
      
      {isLoggedIn ? (

        <div
          className="
            min-h-screen
            flex
            items-center
            justify-center
            text-5xl
            font-bold
          "
        >
          Dashboard
        </div>

      ) : (

        <Login
          setIsLoggedIn={setIsLoggedIn}
        />

      )}

    </div>

  );
}

export default App;