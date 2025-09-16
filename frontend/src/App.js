import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home/Home";
import Navbar from "../src/components/Navbar/Navbar";
import SingleArticle from "./pages/SingleArticle/SingleArticle";
import TagsPage from "./pages/TagsPage/TagsPage";
import NotFound from "./pages/NotFound/NotFound";
import AddArticle from "./pages/AddArticle/AddArticle";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Contact from "./pages/Contact/Contact";
import ReadLaterList from "./pages/ReadLaterList/ReadLaterList";
import SearchedArticles from "./pages/SearchedArticles/SearchedArticles";
import HotTopicsPoland from "./pages/HotTopicsPoland/HotTopicsPoland";
import HotTopicsSport from "./pages/HotTopicsSport/HotTopicsSport";
import HotTopicsTechnology from "./pages/HotTopicsTechnology/HotTopicsTechnology";

function App() {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/article/:id" element={<SingleArticle />} />
          <Route
            path="/articles/search/q:query"
            element={<SearchedArticles />}
          />
          <Route path="/tags/:tag" element={<TagsPage />} />
          <Route
            path="/user/read-later"
            element={user ? <ReadLaterList /> : <Navigate to="/login" />}
          />
          <Route path="/articles/new" element={<AddArticle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/hot-topics" element={<HotTopicsPoland />} />
          <Route path="/hot-topics/sport" element={<HotTopicsSport />} />
          <Route
            path="/hot-topics/technology"
            element={<HotTopicsTechnology />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
