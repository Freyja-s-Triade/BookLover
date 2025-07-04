import axios from "axios";

import type { HomePageList } from "../@types";

const apiUrl = "http://localhost:3000";

export async function fetchHomePageLists() {
    const { data } = await axios.get<HomePageList[]>(`${apiUrl}/lists`);
    return data;
}
