const handleSignin = (req, res, db, bcrypt) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json('unable to sign in');
    }
    db.select('hash', 'email')
    .from('login')
    .where('email', '=', email)
    .then(user => {
        const isValid = bcrypt.compareSync(password, user[0].hash)
        if (isValid) {
            db.select('*')
            .from('users')
            .where('email', '=', email)
            .then(data => {
                res.json(data[0]);
            })
            .catch(err => res.status(400).json('unable to get user'))
        } else {
            res.status(400).json('unable to sign in')
        }
    })
    .catch(err => res.status(400).json('wrong credentials'))
}

export default handleSignin;