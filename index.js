const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

const mysql = require('mysql');

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(bodyParser.json());

// Connect database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'loop_database',
    port: '3307'
});

//login
app.post('/login', function (request, response) {
    // Capture the input fields
    let username = request.body.username;
    let password = request.body.password;

    // Ensure the input fields exists and are not empty
    if (username && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        connection.query('SELECT UID, username, plan, role FROM user_information WHERE username = ? AND password = ?', [username, password], function (error, results) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                // Authenticate the user
                connection.query('INSERT INTO login_information (UID) VALUE(?)', [results[0].UID], function (err) {
                    if (err) {
                        throw err;
                    }
                });
                let body = {
                    username: username,
                    plan: results[0].plan,
                    role: results[0].role,
                    uid: results[0].UID
                }
                response.send(body);
                response.end();
            } else {
                throw err;
            }
            response.end();
        });
    } else {
        throw err;
    }
});

//Song manage page
app.get('/admin/song', function (req, res) {
    let sql = "select song_id, song_name, image, artist, category, description, create_date, update_date from song_information";
    if (req.query.search != undefined && req.query.search != "") {
        sql += " where lower(song_name) like '%" + req.query.search.toLocaleLowerCase() + "%' or lower(artist) like '%" + req.query.search.toLocaleLowerCase() + "%' or lower(description) like '%" + req.query.search.toLocaleLowerCase() + "%'";
    }
    let dataResult = [];
    connection.query(sql, function (error, results) {
        if (error) {
            console.log("ERROR")
            throw error;
        }
        // If the account exists
        if (results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                let body = {
                    song_id: results[i].song_id,
                    song_name: results[i].song_name,
                    image: results[i].image,
                    artist: results[i].artist,
                    username: results[i].username,
                    category: results[i].category.toUpperCase(),
                    description: results[i].description,
                    create_date: results[i].create_date,
                    update_date: results[i].update_date
                }
                dataResult.push(body);
            }
        }

        res.send(dataResult);
        res.end();
    });
});

//song add
app.post('/admin/song/add', function (request, response) {
    let name = request.body.name;
    let imgfile = request.body.imgfile;
    let artist = request.body.artist;
    let category = request.body.category.toUpperCase();
    let description = request.body.description;

    // Ensure the input fields exists and are not empty
    if (name && imgfile && artist && category && description) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        connection.query('INSERT INTO `song_information`(`song_name`, `image`, `artist`, `category`, `description`) VALUES (?,?,?,?,?)', [name, imgfile, artist, category, description], function (error) {
            // If there is an issue with the query, output the error
            if (error) {
                throw error;
            } else {
                response.sendStatus(200);
                response.end();
            }
        });
    } else {
        throw error;
    }
});

//song edit
app.patch('/admin/song/edit', function (request, response) {
    let songid = request.body.id;
    let name = request.body.name;
    let imgfile = request.body.imgfile;
    let artist = request.body.artist;
    let category = request.body.category.toUpperCase();
    let description = request.body.description;

    // Ensure the input fields exists and are not empty
    if (name && imgfile && artist && category && description) {
        connection.query('UPDATE song_information SET song_name=?, image=?, artist=?, category=?, description=?, update_date = current_timestamp where song_id = ?', [name, imgfile, artist, category, description, songid], function (error) {
            // If there is an issue with the query, output the error
            if (error) {
                throw error;
            } else {
                response.sendStatus(200);
                response.end();
            }
        });
    } else {
        throw error;
    }
});

//song delete
app.delete('/admin/song/delete', function (request, response) {
    let songid = request.body.id;
    // Ensure the input fields exists and are not empty
    if (songid) {
        connection.query('DELETE FROM song_information where song_id = ?', [songid], function (error) {
            // If there is an issue with the query, output the error
            if (error) {
                throw error;
            } else {
                response.sendStatus(200);
                response.end();
            }
        });
    } else {
        throw error;
    }
});

//store song
app.get('/admin/song/data', function (req, res) {
    let sql = "select song_id, song_name, image, artist, category, description, create_date, update_date from song_information where song_id=" + req.query.search;
    let dataResult = [];
    connection.query(sql, function (error, results) {
        if (error) {
            console.log("ERROR")
            throw error;
        }
        // If the account exists
        if (results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                let body = {
                    song_id: results[i].song_id,
                    song_name: results[i].song_name,
                    image: results[i].image,
                    artist: results[i].artist,
                    username: results[i].username,
                    category: results[i].category.toUpperCase(),
                    description: results[i].description,
                    create_date: results[i].create_date,
                    update_date: results[i].update_date
                }
                dataResult.push(body);
            }
            res.send(dataResult[0]);
        } else {
            throw error;
        }
    });
});

//User management
app.get('/admin/user', function (req, res) {
    let sql = "select UID, email, firstname, lastname, username, dob, plan, role from user_information";
    if (req.query.search != undefined && req.query.search != "") {
        sql += " where username like '%" + req.query.search + "%'";
    }
    let dataResult = [];
    connection.query(sql, function (error, results) {
        if (error) {
            console.log("ERROR")
            throw error;
        }
        // If the account exists
        if (results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                let body = {
                    UID: results[i].UID,
                    email: results[i].email,
                    firstname: results[i].firstname,
                    lastname: results[i].lastname,
                    username: results[i].username,
                    dob: results[i].dob,
                    plan: results[i].plan,
                    role: results[i].role
                }
                dataResult.push(body);
            }
        }

        res.send(dataResult);
        res.end();
    });
});

//store user
app.get('/admin/user/data', function (req, res) {
    let sql = "select UID, email, firstname, lastname, username, DATE_FORMAT(dob, '%Y-%m-%d') as dob, plan, role from user_information where UID=" + req.query.search;
    let dataResult = [];
    connection.query(sql, function (error, results) {
        if (error) {
            console.log("ERROR")
            throw error;
        }
        // If the account exists
        if (results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                let body = {
                    UID: results[i].UID,
                    email: results[i].email,
                    firstname: results[i].firstname,
                    lastname: results[i].lastname,
                    username: results[i].username,
                    dob: results[i].dob,
                    plan: results[i].plan,
                    role: results[i].role
                }
                dataResult.push(body);
            }
            res.send(dataResult[0]);
        } else {
            throw error;
        }
    });
});

//add user
app.post('/admin/user/add', function (request, response) {
    let username = request.body.username;
    let password = request.body.password;
    let firstname = request.body.firstname;
    let lastname = request.body.lastname;
    let dob = request.body.bd_d;
    let email = request.body.email;
    let plan = request.body.plan != '' ? request.body.plan : 'Free';
    let role = request.body.role != '' ? request.body.role : 'USER';

    // Ensure the input fields exists and are not empty
    if (firstname && lastname && dob && plan && role) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        connection.query('INSERT INTO user_information(Email, Firstname, Lastname,Username,Password,Dob,Plan,Role) VALUES (?,?,?,?,?,?,?,?)', [email, firstname, lastname, username, password, dob, plan, role], function (error) {
            // If there is an issue with the query, output the error
            if (error) {
                throw error;
            } else {
                response.sendStatus(200);
                response.end();
            }
        });
    } else {
        throw 'error';
    }
});

//edit user
app.patch('/admin/user/edit', function (request, response) {
    let username = request.body.username;
    let firstname = request.body.firstname;
    let lastname = request.body.lastname;
    let dob = request.body.bd_d;
    let plan = request.body.plan;
    let role = request.body.role;

    // Ensure the input fields exists and are not empty
    if (firstname && lastname && dob && plan && role) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        connection.query('UPDATE user_information SET firstname=?, lastname=?, dob=?, plan=?, role=? WHERE username =?', [firstname, lastname, dob, plan, role, username], function (error) {
            // If there is an issue with the query, output the error
            if (error) {
                throw error;
            } else {
                response.sendStatus(200);
                response.end();
            }
        });
    } else {
        throw error;
    }
});

//delete user
app.delete('/admin/user/delete', function (request, response) {
    let user = request.body.username;
    // Ensure the input fields exists and are not empty
    if (user) {
        connection.query('DELETE FROM user_information where username = ?', [user], function (error) {
            // If there is an issue with the query, output the error
            if (error) {
                throw error;
            } else {
                response.sendStatus(200);
                response.end();
            }
        });
    } else {
        throw error;
    }
});

//sign up
app.post('/signup', function (request, response) {
    let username = request.body.username;
    let password = request.body.password;
    let firstname = request.body.firstname;
    let lastname = request.body.lastname;
    let dob = request.body.bd_d;
    let email = request.body.email;
    let plan = request.body.plan != '' ? request.body.plan : 'Free';

    // Ensure the input fields exists and are not empty
    if (firstname && lastname && dob && plan) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        connection.query('INSERT INTO user_information(Email, Firstname, Lastname,Username,Password,Dob,Plan) VALUES (?,?,?,?,?,?,?)', [email, firstname, lastname, username, password, dob, plan], function (error) {
            // If there is an issue with the query, output the error
            if (error) {
                throw error;
            } else {
                response.sendStatus(200);
                response.end();
            }
        });
    } else {
        throw 'error';
    }
});

//serch song
router.get('/search', function (req, res) {
    let sql = "select song_id, song_name, image, artist, category, description, create_date, update_date from song_information where 1=1";
    if (req.query.searchuser != undefined && req.query.searchuser != "") {
        sql += " and (lower(song_name) like '%" + req.query.searchuser.toLocaleLowerCase() + "%' or lower(artist) like '%" + req.query.searchuser.toLocaleLowerCase() + "%' or lower(description) like '%" + req.query.searchuser.toLocaleLowerCase() + "%') ";
    }
    if (req.query.category != undefined && req.query.category != "" && req.query.category != "all") {
        sql += " and category = '" + req.query.category + "'";
        cat = req.query.category;
    }
    let dataResult = [];
    let category = [];
    let data = {};
    connection.query(sql, function (error, results) {
        if (error) {
            console.log("ERROR")
            throw error;
        }

        connection.query("SELECT DISTINCT category FROM `song_information`", function (err, resp) {
            if (err) {
                console.log("ERROR")
                throw err;
            }
            if (resp.length > 0) {
                for (let i = 0; i < resp.length; i++) {
                    let body = {
                        category: resp[i].category.toUpperCase()
                    }
                    category.push(body);
                }
                if (results.length > 0) {
                    for (let i = 0; i < results.length; i++) {
                        let body = {
                            song_id: results[i].song_id,
                            song_name: results[i].song_name,
                            image: results[i].image,
                            artist: results[i].artist,
                            username: results[i].username,
                            category: results[i].category.toUpperCase(),
                            description: results[i].description
                        }
                        dataResult.push(body);
                    }
                }
                data = {
                    dataResult : dataResult,
                    category: category
                }
                res.send(data);
                res.end();
            } else {
                res.send(data);
                res.end();
            }
        });
    });
});

//play song page
app.get('/play', function (req, res) {
    let sql = "select song_id, song_name, image, artist, category, description, create_date, update_date from song_information where song_id=" + req.query.search;
    let dataResult = [];
    connection.query(sql, function (error, results) {
        if (error) {
            console.log("ERROR")
            throw error;
        }
        // If the account exists
        if (results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                let body = {
                    song_id: results[i].song_id,
                    song_name: results[i].song_name,
                    image: results[i].image,
                    artist: results[i].artist,
                    username: results[i].username,
                    category: results[i].category.toUpperCase(),
                    description: results[i].description
                }
                dataResult.push(body);
            }
            res.send(dataResult[0]);
        } else {
            throw error;
        }
    });
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3001);

console.log('Running at Port 3001');