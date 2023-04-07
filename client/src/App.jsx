import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register } from "./pages";
import SharedLayout from "./components/layout/SharedLayout";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <div className="">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
