import "dotenv/config";
import { Sequelize, DataTypes, Model } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: process.env.DATABASE_DIALECT ,
    storage: process.env.DATABASE_STORAGE ,
    database: process.env.DATABASE_NAME ,
    username: process.env.DATABASE_USER ,
    password: process.env.DATABASE_PASSWORD ,
});

export class User extends Model {}
export class List extends Model {}
export class Author extends Model {}
export class Editor extends Model {}
export class Genre extends Model {}
export class Book extends Model {}


User.init({
    lastname: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, { sequelize });

List.init({
    name: {
        type: DataTypes.STRING(255),
        allowNull:false
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { sequelize });

Author.init({
    lastname: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    nationality: {
        type: DataTypes.STRING(255),
        allowNull: true,
    }
}, { sequelize });

Editor.init({
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, { sequelize });

Genre.init({
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, { sequelize });

Book.init({
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    isbn: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    yearPublished: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    pages: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, { sequelize });

Booklist.init({
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'book_list_unique',
        references: {
            model: Book,
            key: 'id'
        }
    },
    listId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'book_list_unique',
        references: {
            model: List,
            key: 'id'
        }
    }
}, { sequelize });

// BookList.associate = (models) => {
//     BookList.belongsTo(models.Book, { foreignKey: 'bookId', onDelete: 'CASCADE' });
//     BookList.belongsTo(models.List, { foreignKey: 'listId', onDelete: 'CASCADE' });
// };