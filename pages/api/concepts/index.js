const { API_BASE_URL } = require('../../index');

export default async function handler(req, res) {

    let concepts = []

    
    let url = API_BASE_URL + '/concepts'
    // if the url is passed as a query param, use that
    if (req.query.url) {
      url = API_BASE_URL + req.query.url
    }
    console.log('url', url)
    // get all concepts
    const response = await fetch(url)
    // console.log('response', response)

    const data = await response.json()
    // console.log('data', data)
    concepts = data

    res.status(200).json(concepts);
}