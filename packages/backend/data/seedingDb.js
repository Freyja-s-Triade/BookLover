import  sequelize from "../models/sequelizeClient.js";
import  { Author, Book, Genre, Editor, List, BookList } from "../models/index.js"
import { User } from "../models/models.js";

// Seeding Users
const users = [
    { lastname: 'Durand', firstname:'Sophie', email:'sophie.durand@example.com', password: 'hashedpassword1'},
    { lastname: 'Martin', firstname:'Julien', email:'julien.martin@example.com', password: 'hashedpassword2'}
];

for (const user of users) {
  const newUser = await User.create({
    id: user.id,
    lastname: user.lastname,
    firstname: user.firstname,
    email: user.email,
    password: user.password,
  });
}

//Seeding Authors
const authors = [
  { lastname: 'Verne', firstname:'Jules', nationality: 'Française'},
  { lastname: 'Rowling', firstname:'J.K.', nationality: 'Britannique'},
]

for (const author of authors) {
  const newAuthor = await Author.create({
    id: author.id,
    lastname: author.lastname,
    firstname: author.firstname,
    nationality: author.nationality,
  });
}


//Seeding Genres
const genres = [
  { name : 'Science-Fiction' },
  { name: 'Fantastique' }
]

for (const genre of genres) {
  const newGenre = await Genre.create({
    id: genre.id,
    name: genre.name,
  });
}

//Seeding Editor
const editors = [
  { name : 'Gallimard' },
  { name : 'Bloomsbury' }
]

for (const editor of editors) {
  const newEditor = await Editor.create({
    id: editor.id,
    name: editor.name,
  });
}

//Seeding Books
const books = [
  {title:'Vingt mille lieues sous les mers' , isbn: '9782070418794', year_published:1870, description:'Une aventure sous-marine fascinante.', pages:300, author_id:1, genre_id:1, editor_id:1},
  {title:'Harry Potter à l\'école des sorciers' , isbn: '9780747532743', year_published:1997, description: 'Le début de la saga Harry Potter.', pages:320, author_id:2, genre_id:2, editor_id:2}
]

for (const book of books) {
  const newBook = await Book.create({
    id: book.id,
    title: book.title,
    isbn: book.isbn,
    year_published: book.year_published,
    description: book.description,
    pages: book.pages,
    author_id: book.author_id,
    genre_id: book.genre_id,
    editor_id: book.editor_id
  });
}


//Seeding Lists
const lists = [
  { name: 'À lire', position: 1, books: [1]},
  { name: 'Mes favoris', position: 2, books: [1,2]},
]

for (const list of lists) {
  try {
    const newList = await List.create({
      id: list.id,
      name: list.name,
      position: list.position,
    });
    
      for (const bookId of list.books){
        const book = await Book.findByPk(bookId);
        await newList.addBook(book);
      }
  } catch (error) {
    
  }
}

console.log('\n✅ Seeding done!\n');
console.log('---')
console.log('Data inserted:'); 
console.log(users.length, 'users');
console.log(lists.length, 'lists');
console.log(editors.length, 'editors');
console.log(genres.length, 'genres');
console.log(authors.length, 'authors');
console.log(books.length, 'books');
console.log('---')
console.log('');
await sequelize.close();