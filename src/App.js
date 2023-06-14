import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

// Hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

// pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Search from "./pages/Search/Search";
import Register from "./pages/Register/Register";
import Darshboard from "./pages/Dashborard/Darshboard";
import Login from "./pages/Login/Login";
import Createpost from "./pages/CreatePost/Createpost";
import Post from "./pages/Post/Post";

// Components
import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";

// Context
import { AuthProvider } from "./context/AuthContext";
import EditPost from "./pages/EditPost/EditPost";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="/posts/:id" element={<Post />} />

              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/posts/edit/:id"
                element={user ? <EditPost /> : <Navigate to={<Register />} />}
              />
              <Route
                path="/posts/create"
                element={user ? <Createpost /> : <Navigate to={<Register />} />}
              />
              <Route
                path="/dashboard"
                element={user ? <Darshboard /> : <Navigate to={<Register />} />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
