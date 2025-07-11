import { Author, Book, Tag, Genre, Editor, List, BookList, ListHasTag } from './models.js';

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
// Many tags belong to many List
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

Tag.belongsToMany(List, {
    through: ListHasTag,
    foreignKey: 'tag_id',
    otherKey: 'list_id',
    as: 'lists'
});

List.belongsToMany(Tag, {
    through: ListHasTag,
    foreignKey: 'list_id',
    otherKey: 'tag_id',
    as: 'tags'
});


export { Author, Book, Tag, Genre, Editor, List, BookList, ListHasTag }