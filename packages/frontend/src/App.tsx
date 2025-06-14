import Header from "./components/header/header";
import Footer from "./components/footer/footer";

function App() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-grow">TODO</main>
            <Footer />
        </div>
    );
}

export default App;
