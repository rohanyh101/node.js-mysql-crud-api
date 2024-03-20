const mysql = require('mysql2');
const { HashPassword, MatchPassword } = require('../utils/utils');

const dbConfig = require('../config/database');
const connection = mysql.createConnection(dbConfig);

const UserController = {};

// get all users in the database
UserController.findUsers = (result) => {
    connection.query('SELECT * FROM Users', (err, results, fields) => {
        if (err) {
            console.error('Error getting users: ', err);
            result(err, null);
            return;
        }
        // console.log('Users found successfully');
        result(null, results);
    });
};

// get a single user by id
UserController.findUser = (id, result) => {
    const data = connection.query(
        'SELECT * FROM Users WHERE id = ? LIMIT 1',
        id,
        (err, results, fields) => {
            if (err) {
                console.error('Error getting user: ', err);
                result(err, null);
                return;
            }
            // console.log('User found successfully');
            result(null, results);
        }
    );
};

UserController.GetUserByEmailAndPassword = (args, result) => {
    connection.query(
        'SELECT * FROM Users WHERE email = ? LIMIT 1',
        [args.email],
        async (err, results, fields) => {
            if (err) {
                console.error('Error getting user: ', err);
                result(err, null);
                return;
            }

            if (results.length === 0) {
                // No user found with the given email
                console.log('No user found with the given email');
                result(null, null);
                return;
            }

            const user = results[0];

            // Check if the entered password matches the stored hashed password
            const passwordMatch = await MatchPassword(
                args.password,
                user.u_password
            );

            if (passwordMatch) {
                // Passwords match, return user data
                result(null, user);
            } else {
                // Passwords don't match
                result(null, null);
            }
        }
    );
};

// get a single user by name
UserController.findUserByNameAndEmail = (args, result) => {
    const data = connection.query(
        'SELECT * FROM Users WHERE u_name = ? AND email = ?',
        [args.name, args.email],
        (err, results, fields) => {
            if (err) {
                console.error('Error getting user: ', err);
                result(err, null);
                return;
            }
            // console.log('User found successfully');
            result(null, results);
        }
    );
};

// add a single user to the database
UserController.AddUser = async (args, result) => {
    try {
        // Hash the password
        const hashPassword = await HashPassword(args);

        // Insert user using a prepared statement
        connection.query(
            'INSERT INTO Users (u_name, age, email, u_password) VALUES (?, ?, ?, ?)',
            [args.name, args.age, args.email, hashPassword],
            (err, results, fields) => {
                if (err) {
                    console.error('Error creating user: ', err);
                    result(err, null);
                    return;
                }
                // console.log('User created successfully');
                result(null, results);
            }
        );
    } catch (error) {
        console.error('Error hashing password: ', error);
        result(error, null);
    }
};

// delete a single user from the database
UserController.DeleteUser = (id, result) => {
    connection.query(
        'DELETE FROM Users WHERE id = ?',
        id,
        (err, results, fields) => {
            if (err) {
                console.error('Error deleting user: ', err);
                result(err, null);
                return;
            }
            // console.log('User deleted successfully');
            result(null, results);
        }
    );
};

UserController.UpdateUser = async(id, args, result) => {
    const hashPassword = await HashPassword(args);

    connection.query(
        'UPDATE Users SET u_name = ?, age = ?, email = ?, u_password = ? WHERE id = ?',
        [args.name, args.age, args.email, hashPassword, id],
        (err, results, fields) => {
            if (err) {
                console.error('Error updaing user: ', err);
                result(err, null);
                return;
            }
            // console.log('User updated successfully');
            result(null, results);
        }
    );
};

module.exports = UserController;
