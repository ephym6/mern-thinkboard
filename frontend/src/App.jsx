import React from 'react';
import { Route, Routes } from "react-router";
import HomePage from "./page/HomePage.jsx";
import CreatePage from "./page/CreatePage.jsx";
import NoteDetailPage from "./page/NoteDetailPage.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;