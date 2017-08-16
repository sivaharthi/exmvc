exports.Index = function(request, response){
    response.pageInfo = {};
    response.pageInfo.title = 'Home';
    response.render('index', response.pageInfo);
   
};
exports.About = function(request, response){
    response.pageInfo = {};
    response.pageInfo.title = 'About';
    response.render('about', response.pageInfo);
};

exports.Other = function(request, response){
    response.pageInfo = {};
    response.pageInfo.title = 'Other';
    response.render('Other', response.pageInfo);
};
exports.Login = function(request, response){
    response.pageInfo = {};
    response.pageInfo.title = 'Login';
    response.render('login', response.pageInfo);   
};