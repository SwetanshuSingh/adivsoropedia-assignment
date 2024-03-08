import {BrowserRouter, Routes, Route } from "react-router-dom"
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import PostsPage from "./pages/PostsPage";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/posts" element={<PostsPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;