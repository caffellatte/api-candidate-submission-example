import { Route, Routes } from "react-router-dom";

import IndexPage from "~/app/pages/index";
import FormPage from "~/app/pages/form";
function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<FormPage />} path="/form" />
    </Routes>
  );
}

export default App;
