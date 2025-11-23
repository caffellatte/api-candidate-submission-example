import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import FormPage from "@/pages/form";
function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<FormPage />} path="/form" />
    </Routes>
  );
}

export default App;
