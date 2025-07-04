import { useQuery } from "@tanstack/react-query";
import type { HomePageList } from "../@types";
import { fetchHomePageLists } from "../services/api";
import HomePageListCard from "../components/HomePageListCard";

export default function HomePage() {
    const {
        isPending,
        error,
        data: lists,
    } = useQuery<HomePageList[]>({
        queryKey: ["repoData"],
        queryFn: () => fetchHomePageLists(),
    });

    if (isPending) return "Loading";

    if (error) return `An error has occured: ${error.message}`;

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
        </div>
    );
}
