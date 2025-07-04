import { Routes, Route } from "react-router";

import Header from "./components/header";
import Footer from "./components/footer";

import HomePage from "./pages/HomePage";

function App() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
