module.exports = authenticate;

function authenticate(req, res, next) {
    // user authenticated
    if (req.session.user) return next()
    
    // Check for api call and throw error
    const url = req.originalUrl.substring(0, 4)
    if(url === '/api') throw { name: 'Unauthorized', message: 'You have to be logged in to fetch ressources.'}
    
    // Redirect for all unauthorized request to html views
    res.redirect('/login')
}
