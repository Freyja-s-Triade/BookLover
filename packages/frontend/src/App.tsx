import Header from "./components/header/header";

function App() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-grow">TODO</main>
        </div>
    );
}

export default App;
