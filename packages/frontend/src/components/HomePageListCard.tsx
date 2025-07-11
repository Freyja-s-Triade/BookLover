import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import type { HomePageList, HomePageBook } from "../@types";

type HomePageListCardProps = {
    list: HomePageList;
};

export default function HomePageListCard({ list }: HomePageListCardProps) {
    return (
        <div className="card bg-base-300 text-base-content w-x1 mx-auto my-5">
            <div className="card-body">
                <div className="flex flex-row justify-between">
                    <h2 className="card-title">{list.name}</h2>

                    <div className="flex gap-2">
                        <button type="button">
                            <FontAwesomeIcon icon={faPen} />
                        </button>
                        <button type="button">
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>

                <ul className="flex gap-2">
                    {list.tags?.map((tag) => (
                        <li key={tag.name}>
                            <button className={`btn btn-${tag.color}`}>
                                {tag.name}
                            </button>
                        </li>
                    ))}
                </ul>

                <ul>
                    {list.books.map((book: HomePageBook) => (
                        <li key={book.id}>
                            <span className="font-semibold">{book.title} - </span>
                            {book.genre && <span>{book.genre.name} - </span>}
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
