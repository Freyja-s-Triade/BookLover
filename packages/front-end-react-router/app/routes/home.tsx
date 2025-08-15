import { Link } from "react-router";
import HomePageListCard from "../components/HomePageListCard";
import { Button } from "../components/button";
import { fetchHomePageLists } from "../services/api";
import type { Route } from "./+types/home";

// pré chargement des données récupérées depuis l'API
export async function loader() {
    const lists = await fetchHomePageLists();

    return { lists };
}

// Route.ComponentPros = type qui inclut loaderData
export default function HomePage(props: Route.ComponentProps) {
    const { lists } = props.loaderData;

    return (
        <div className="m-auto w-4/5 mt-4">
            <h1 className="h1">Mes listes</h1>

            <ul>
                {lists.map((list) => (
                    <li key={list.id}>
                        <HomePageListCard list={list} />
                    </li>
                ))}
            </ul>

            <div className="flex justify-end">
                <Link to="/addList">
                    <Button className="btn-primary">+</Button>
                </Link>
            </div>
        </div>
    );
}
