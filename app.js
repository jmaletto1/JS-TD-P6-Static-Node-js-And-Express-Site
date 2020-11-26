// Set initial express requirements and App Declarations.
const express = require('express');
const app = express();

// Import project data from data.json
const data = require('./data.json').projects;

// Set the view engine to pug (to render pug template)
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

// Set the 'Error' Route
app.get('/error', (req, res) => {
    res.render('error');
})

// Set the 'Page Not Found' Route
app.get('/page-not-found', (req, res) => {
    res.render('page-not-found');
})

// // Set the Dynamic Project routes.
app.get('/projects/:id', (req, res) => {
    const id = req.params.id;
    const projectData = data[id];
    if (projectData) {
    res.render('project', {id, projectData});
    } else {
            res.redirect('/404-redirect');
        }
    });

// 404 Handler Error
app.use((req, res, next) => {
    const err = new Error("This is not the page you're looking for! Please visit our homepage, and try again.");
    err.status = 404;
    next(err);
  });
  
/* Global Error Handler.
Errors that are not 404s are passed to the 'error' template.
*/
  app.use((err, req, res, next) => {
    res.locals.error = err;
    if (err.status === 404) {
        console.log("Unfortunately this link is not valid! Please return to the homepage.")
        res.locals.message = 'Not found!';
        res.status(404).render('page-not-found', { err });
    } else {
        console.log("Unfortunately there seems to have been a server error! Please return to the homepage.")
        err.message = `Oops!  It looks like something went wrong on the server.`;
        err.status = 500 || err.status;
        res.status(500).render('error', { err });
    }
  });

// Start the server
// app.listen(3000, () => {
//     console.log('The app is running on localhost:3000!')
// });

app.listen(process.env.PORT || 5000)