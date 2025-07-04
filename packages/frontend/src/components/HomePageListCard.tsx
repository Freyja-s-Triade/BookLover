import type { HomePageList, HomePageBook } from "../@types";

type HomePageListCardProps = {
    list: HomePageList;
}

export default function HomePageListCard({list}: HomePageListCardProps) {
    return (
        <div>
            <h2>{list.name}</h2>
            <ul>
                {list.books.map((book:HomePageBook) => (
                    <li key={book.id}>
                        {book.title}
                        {book.genre && (
                            <span>{book.genre.name}</span>
                        )}
                        {book.author && (
                            <span> {book.author.firstname} {book.author.lastname}</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}