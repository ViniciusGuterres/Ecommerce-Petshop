const jwt = require('jsonwebtoken');
const auth = require('./app.json');

async function includeToken(customer) {
    const token = await jwt.sign({ code: customer.code }, auth.appId, {
        expiresIn: 3600
    });

    customer.token = token;
    customer.password = undefined;

    return customer;
}

function authorize(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ error: 'O token não foi enviado!' });
    }

    const parts = authHeader.split(' ');

    if (parts?.length !== 2) {
        return res.status(401).send({ error: 'Token incompleto!' });
    }

    const [tipo, token] = parts;

    if (!/^Bearer$/i.test(tipo)) {
        return res.status(401).send({ error: 'Token mal formado!' });
    }

    jwt.verify(token, auth.appId, (err, usuario) => {
        if (err) {
            return res.status(401).send({ error: 'Token inválido!' });
        }
        req.usuarioLogadoId = usuario.id;
        return next();
    });
}

module.exports = {
    includeToken,
    authorize
};