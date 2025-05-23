import "dotenv/config";
import { Sequelize, DataTypes, Model } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: process.env.DATABASE_DIALECT ,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
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
export class BookList extends Model {}


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
}, { sequelize,
    tableName: 'user',
    freezeTableName: true

 });

List.init({
    name: {
        type: DataTypes.STRING(255),
        allowNull:false
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { sequelize,
    tableName: 'list',
    freezeTableName: true
 });

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
}, { sequelize,
    tableName: 'author'
 });

Editor.init({
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, { sequelize,
    tableName: 'editor',
    freezeTableName: true
 });

Genre.init({
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, { sequelize,
    tableName: 'genre',
    freezeTableName: true
 });

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
    year_published: {
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
}, { sequelize,
    tableName: 'book',
    freezeTableName: true
 });

BookList.init({
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'book_list_unique',
        references: {
            model: Book,
            key: 'id'
        }
    },
    list_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'book_list_unique',
        references: {
            model: List,
            key: 'id'
        }
    }
}, { sequelize,
    tableName: 'booklist',
    freezeTableName: true
 });

// BookList.associate = (models) => {
//     BookList.belongsTo(models.Book, { foreignKey: 'bookId', onDelete: 'CASCADE' });
//     BookList.belongsTo(models.List, { foreignKey: 'listId', onDelete: 'CASCADE' });
// }; 