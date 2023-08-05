// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Settings from "./components/Settings";
// import PomodoroTimer from "./components/PomodoroTimer";
// import SignUp from "./auth/SignUp";
// import Login from "./auth/Login";
// import AuthDetail from "./auth/AuthDetail";
// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";
// import { auth } from "./firebaseConfig";

// function App() {
//   const [authUser, setAuthUser] = useState(null);
//   const [showSignUp, setShowSignUp] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setAuthUser(user);
//       } else {
//         setAuthUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleLogin = async (email, password) => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   const handleSignUp = async (email, password) => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <Router>
      
//       <div>
      
//         <Routes>  
//         {authUser ? (        
//               <Route exact path="/" element={<PomodoroTimer />} />
//               <Route path="/settings" element={<Settings />} />
//               <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600">Logout</button> 
//           ) : showSignUp ? (
            
//             <Route path="/signup" element={<SignUp handleSignUp={handleSignUp} setShowSignUp={setShowSignUp} />} />
            
//           ) : (
            
//             <Route path="/login" element={<Login handleLogin={handleLogin} setShowSignUp={setShowSignUp} />} />
            
//           ) }   
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;




import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Settings from "./components/Settings";
import PomodoroTimer from "./components/PomodoroTimer";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import AuthDetail from "./auth/AuthDetail";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
function App() {
  const [authUser, setAuthUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Router>
      <div className="p-rounded-md m-auto flex- justify-center mt-5">
        <Routes>
          {/* When user is logged in, show the Timer, Settings, and Logout */}
          {authUser ? (
            <>
              <Route path="/" element={<PomodoroTimer />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/logout" element={<button onClick={handleLogout}>Log out</button>} />
            </>
          ) : (
            // When user is not logged in, show the SignUp or Login page
            <>
              <Route
                path="/signup"
                element={
                  <SignUp
                    handleSignUp={handleSignUp}
                    setShowSignUp={setShowSignUp}
                  />
                }
              />
              <Route
                path="/"
                element={
                  <Login
                    handleLogin={handleLogin}
                    setShowSignUp={setShowSignUp}
                  />
                }
              />
            </>
          )}
        </Routes>

        {/* Show logout button after login */}
        {authUser && (
           <button className="  mt-5 px-4 py-2 mx-40
            bg-red-500 text-white font-semibold rounded hover:bg-red-600 " onClick={handleLogout}>Log out</button>
        )}
      </div>
    </Router>
  );
}

export default App;





