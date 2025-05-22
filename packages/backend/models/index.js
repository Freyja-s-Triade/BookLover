import { Author, Book, Genre, Editor, List, BookList } from './models.js';

// One book has one author / genre / editor
// One author has many books
// One genre has many books
// One editor has many books
// -> One To Many
Book.belongsTo(Author, { 
    foreignKey: 'author_id',
    as: 'author'
});

Book.belongsTo(Genre, {
    foreignKey: 'genre_id',
    as: 'genre'
});

Book.belongsTo(Editor, {
    foreignKey: 'editor_id',
    as: 'editor'
});

// Many books belongs to many List
// -> Many To Many
Book.belongsToMany(List, {
    through: BookList,
    foreignKey: 'book_id',
    otherKey: 'list_id',
    as: 'lists'
});

List.belongsToMany(Book, {
    through: BookList,
    foreignKey: 'list_id',
    otherKey: 'book_id',
    as: 'books'
});

export { Author, Book, Genre, Editor, List, BookList }