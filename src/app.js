import express from 'express';
import './firebase.js'
import { getAuth } from 'firebase-admin/auth';

const PORT = 8000;

const app = express();
const router = express.Router()
const admins = []


function isAdmin(userInfo) {
    //return admins.indexOf(userInfo.email) >= 0;
    return true
}

let authRequired = async(req, res, next) => {
    if (!req.headers['x-auth']) return next('router')
    const token = req.headers['x-auth']
    try {
        let decodedToken = await getAuth().verifyIdToken(token);
        if (isAdmin(decodedToken)) next()
        else next('router')
    } catch (e) {
        return next('router')
    }
}

router.use(authRequired)
router.get('/user/:id', (req, res) => {
    res.send('hello, user!')
})

// use the router and 401 anything falling through
app.use('/api', router, (req, res) => {
    res.sendStatus(401)
})

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}...`);
});

export default app;
