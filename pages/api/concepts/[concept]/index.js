const { API_BASE_URL } = require('../../../../index');

export default async function handler(req, res) {
    const { concept } = req.query;

    let conceptDetail = {}
    let concept_url = API_BASE_URL + '/concepts/' + concept
    const response = await fetch(concept_url)
    const data = await response.json()
    conceptDetail = data

    res.status(200).json(conceptDetail);
}