const checkMillionDollarIdea = (req, res, next) => {
    const ideaValue = req.body.weeklyRevenue * req.body.numWeeks
    if (!ideaValue || ideaValue < 1000000) {
        res.status(400).send()
    } else {
        console.log(ideaValue)
        next()
    }
};

module.exports = checkMillionDollarIdea;