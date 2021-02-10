const url = require('url');
const qs = require('querystring');

const serverHandle = function (req, res) {
    const route = url.parse(req.url)
    const path = route.pathname
    const params = qs.parse(route.query)

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    if (path === '/') {
        res.write('How /hello works ?\n\nAfter referecing /hello to path, you can enrich the URL with query paramaters:\n- Place first "?"\n- Then you can specify a parameter. For here, we go for "name"\n- After, you can specify the operator, let s go for "="\n- Finally, type the name you are looking for\n\nPS : My name is Johan\n\nHave fun !')
    }

    else if (path === '/hello' && 'name' in params) {
        if (params['name'] !== 'Johan') {
            res.write('Hello ' + params['name'])
        }
        else {
            res.write('My name is Johan !\nI am an engineer apprentice in Thales, and student at ECE Paris in ING4 APP SI01.\nXOXO.')
        }
    }

    else {
        res.writeHead(404)
    }

    res.end();
}

module.exports = {
    serverHandle: serverHandle,
};