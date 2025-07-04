import type { HomePageList, HomePageBook } from "../@types";

type HomePageListCardProps = {
    list: HomePageList;
};

export default function HomePageListCard({ list }: HomePageListCardProps) {
    return (
        <div className="card bg-base-300 text-base-content w-96">
            <div className="card-body">
                <h2 className="card-title">{list.name}</h2>
                <ul>
                    {list.books.map((book: HomePageBook) => (
                        <li key={book.id}>
                            {book.title}
                            {book.genre && <span>{book.genre.name}</span>}
                            {book.author && (
                                <span>
                                    {" "}
                                    {book.author.firstname} {book.author.lastname}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
