import React from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { useTypedSelector } from "./hooks/useTypedSelector";

import MainLayout from "./layouts/MainLayout/MainLayout";
import HomePage from "./pages/Home/HomePage";
import HotelPage from "./pages/Hotel/HotelPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import { getUser } from "./store/action-creators/user";

function App() {
  const { user } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className="App">
      <MainLayout user={user}>
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/hotel/:hotelId" element={<HotelPage user={user} />} />
        </Routes>
      </MainLayout>
    </div>
  );
}

export default App;
