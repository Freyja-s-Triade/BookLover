import { fetchHomePageLists } from "../services/api";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
    const { isPending, error, data } = useQuery({
        queryKey: ["repoData"],
        queryFn: () => fetchHomePageLists(),
    });
}
