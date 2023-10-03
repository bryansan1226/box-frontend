import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*<Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NoPage />} />
        </Route>*/}
        <Route index element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/searchResults" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
