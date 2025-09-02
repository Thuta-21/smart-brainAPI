const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('*')
    .then(entries => res.json(entries[0].entries))
    .catch(err => res.status(400).json('unable to ger entries'));
}

export default handleImage;