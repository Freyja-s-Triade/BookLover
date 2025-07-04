import { useQuery } from "@tanstack/react-query";
import type { HomePageList } from "../@types";
import { fetchHomePageLists } from "../services/api";
import HomePageListCard from "../components/HomePageListCard";
import Heading from "../components/styles/Heading";

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
        <div>
            <Heading tag="h1">Mes listes</Heading>

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
