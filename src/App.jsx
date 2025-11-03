import { Routes, Route, Link } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Favorite, { FavoriteProvider } from "./pages/Favorite";
import Search from "./pages/Search";

function App() {
  return (
    <FavoriteProvider>
      <div>
        <nav style={{ display: "flex", gap: "10px", padding: "10px" }}>
          <Link to="/">메인</Link>
          <Link to="/favorite">찜목록</Link>
          <Link to="/search">검색</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </FavoriteProvider>
  );
}

export default App;