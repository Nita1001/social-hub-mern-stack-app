import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    Login,
    Register,
    Profile,
    NotFound,
    Home,
    Messages,
    Storage,
} from "./pages";
import SharedLayout from "./components/layout/SharedLayout";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SharedLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/storage" element={<Storage />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
