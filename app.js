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

app.get('/error', (req, res) => {
    res.render('error');
})

app.get('/not-found', (req, res) => {
    res.render('not-found');
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
        res.locals.err = err;
        // next(err);
        res.redirect('/not-found');
    }
})

// Redirect if no ID is supplied.
app.get('/projects/', (req, res) => {
    res.redirect('/');
});

// 404 Handler Error

app.use((req, res, next) => {
    const err = new Error("This is not the page you're looking for! Please visit our homepage, and try again.");
    err.status = 404;
    next(err);
  });
  
// Global Error Handler

  app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
    res.render('./error', err);
  });


// Start the server
app.listen(3000, () => {
    console.log('The app is running on localhost:3000!')
});
