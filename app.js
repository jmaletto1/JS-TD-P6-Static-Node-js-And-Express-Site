const e = require('express');
const express = require('express');
const app = express();

const data = require('./data.json').projects;

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set static middleware for serving static files
app.use('/static', express.static('public'))

// Set the Index route.
app.get('/', (req, res) => {
    const name1 = data[0].project_name;
    res.render('index', {data});
});

// Set the 'About' route.
app.get('/about', (req, res) => {
    res.render('about');
})

// Set the dynamic routes.
app.get('/projects/:id', (req, res) => {
    const id = req.params.id;
    const projectData = data[id];
    if (projectData) {
    res.render('project', {id, projectData});
    } else {
        console.log("Error!!!");
        const err = new Error("That project doesn't exist yet!");
        err.status = 404;
        res.redirect('/');
    }
})

// Redirect if no ID is supplied.
app.get('/projects/', (req, res) => {
    res.redirect('/');
});

// Global Error Handler

// Start the server
app.listen(3000, () => {
    console.log('The app is running on localhost:3000!')
});
