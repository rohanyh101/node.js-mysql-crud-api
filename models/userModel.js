const UserController = require('../controllers/userController');

const User = {};

User.GetUsers = (req, res) => {
    UserController.findUsers((err, data) => {
        if (err) {
            res.status(404).json({
                message: err.message || 'Users not found',
            });
        } else {
            const responseArr = [];

            data?.map((user) => {
                const response = {
                    id: user.id,
                    name: user.u_name,
                    age: user.age,
                    email: user.email,
                    // password: user.u_password,
                };
                responseArr.push(response);
            });

            res.send(responseArr);
        }
    });
};

User.GetUser = (req, res) => {
    const { id } = req.params;

    UserController.findUser(id, (err, data) => {
        if (err) {
            res.status(404).json({
                message: err.message || 'User not found',
            });
        } else {
            const resp = data[0];

            const response = {
                id: resp.id,
                name: resp.u_name,
                age: resp.age,
                email: resp.email,
                password: resp.u_password,
            };

            res.status(200).send(response);
        }
    });
};

User.GetUserByEmailAndPassword = (req, res) => {
    const body = req.body;

    UserController.GetUserByEmailAndPassword(body, (err, data) => {
        if (err === null && data === null) {
            res.status(404).json({
                message: err?.message || 'email or password is incorrect...',
            });
        } else {
            const response = {
                id: data.id,
                name: data.u_name,
                age: data.age,
                email: data.email,
                // password: data.u_password,
            };

            res.status(200).send(response);
        }
    });
};

User.AddUser = (req, res) => {
    const body = req.body;

    UserController.findUserByNameAndEmail(body, (err, data) => {
        if (data.length > 0) {
            return res.status(200).json({ message: 'User already exists, try using different email & uername' });
        }

        UserController.AddUser(body, (err, data) => {
            if (err) {
                res.status(404).json({
                    message: err.message || 'Error creating user',
                });
            } else {
                res.status(201).json({
                    message: 'User Added to database',
                    info: {
                        affectedRows: data.affectedRows,
                        insertId: data.insertId,
                    },
                });
            }
        });
    });
};

User.DeleteUser = (req, res) => {
    const { id } = req.params;

    UserController.findUser(id, (err, data) => {
        if (data.length <= 0) {
            return res.status(200).json({ message: 'User does not exist' });
        }

        UserController.DeleteUser(id, (err, data) => {
            if (err) {
                res.status(404).json({
                    message: err.message || 'Error deleting user',
                });
            } else {
                res.status(200).json({
                    message: 'User deleted from database',
                    info: { affectedRows: data.affectedRows },
                });
            }
        });
    });
};

User.UpdateUser = (req, res) => {
    const { id } = req.params;
    const body = req.body;

    UserController.findUser(id, (err, data) => {
        if (data.length <= 0) {
            return res.status(404).json({
                message: err?.message || 'user not found...',
            });
        }

        UserController.UpdateUser(id, body, (err, data) => {
            if (err) {
                res.status(404).json({
                    message: err.message || 'Error updating user',
                });
            } else {
                res.status(200).json({
                    message: 'User updated in database',
                    info: {
                        affectedRows: data.affectedRows,
                        changedRows: data.changedRows,
                    },
                });
            }
        });
    });
};

module.exports = User;
