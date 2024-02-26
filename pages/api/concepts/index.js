const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(req, res) {

    let return_data = {}
    return_data.concepts = []


    let url = API_BASE_URL + '/concepts'
    // if the url is passed as a query param, use that
    if (req.query.url) {
        url = API_BASE_URL + req.query.url
    }

    // if domain is set, get the apiurls from the domain data
    if (req.query.domain) {
        /////
        const domainMapping = require('../domains/domains.json');
        const domainDetail = domainMapping.find(d => d.id === req.query.domain);
        if (domainDetail) {
            ///
            let domain_urls = domainDetail.apiUrls
            if (domain_urls && domain_urls.length > 0) {
                let domain_data = []
                for (let i = 0; i < domain_urls.length; i++) {
                    let apiurl = domain_urls[i]
                    let query = req.query

                    // if (query && Object.keys(query).length > 0) {
                    //     apiurl = apiurl + '?'
                    //     for (const [key, value] of Object.entries(query)) {
                    //         apiurl = apiurl + key + '=' + value + '&'
                    //     }
                    //     apiurl = apiurl.slice(0, -1)
                    // }
                    // const response = await fetch(API_BASE_URL + apiurl)
                    // const data = await response.json()
                    let data = {}

                    if (req.query.subdomain) {
                        // fetch concepts
                        let concepts_url = API_BASE_URL + domain_urls[i] + 'concepts/' + req.query.subdomain + '/' + (domainDetail.metadata?.cascadeQueryParam ? domainDetail.metadata?.cascadeQueryParam : '?limit=100')
                        console.log('concepts url === ', concepts_url)
                        const conceptsResponse = await fetch(concepts_url)
                        if (conceptsResponse.status !== 200) {
                            res.status(conceptsResponse.status).json({ message: 'Concepts not found' });
                        }
                        const conceptsData = await conceptsResponse.json()
                        data.concepts = conceptsData
                    }
                    domain_data.push(data)
                }
                if (domain_urls.length === 1) domain_data = domain_data[0]
                domainDetail.data = domain_data
            } else {
                domainDetail.data = []
            }
            ///
            res.status(200).json(domainDetail);

        } else {
            res.status(404).json({ message: 'Domain not found' });
        }
        /////
    }
    // if subdomain is set, get the flag to append to the domain/'concepts' endpoint
    if (req.query.subdomainurl) {
        url = API_BASE_URL + req.query.subdomainurl + "$cascade/?cascadeLevels=1&view=hierarchy&reverse=true&includeRetired=false&limit=20&page=" + (req.query.page ?? 1)
        const response_ = await fetch(url)
        if (response_.status !== 200) {
            console.error(response_)
            res.status(404).json({ message: 'Concepts not found' });
        }
        const conceptspagecount = response_.headers.get('pages') ?? 1
        const conceptspagesize = response_.headers.get('num_returned') ?? 20
        const conceptscurrentpage = response_.headers.get('page_number') ?? 1
        const data = await response_.json()
        return_data.concepts = data?.entry?.entries || []
        return_data.conceptsMeta = {
            pagecount: conceptspagecount,
            pagesize: conceptspagesize,
            currentpage: conceptscurrentpage
        
        }
    } else {
        // get all concepts
        const response = await fetch(url)
        if (response.status !== 200) {
            res.status(404).json({ message: 'Concepts not found' });
            return
        }
        const conceptspagecount = response.headers.get('pages') ?? 1
        const conceptspagesize = response.headers.get('num_returned') ?? 20
        const conceptscurrentpage = response.headers.get('page_number') ?? 1
        const data = await response.json()
        
        return_data.concepts = data
        return_data.conceptsMeta = {
            pagecount: conceptspagecount,
            pagesize: conceptspagesize,
            currentpage: conceptscurrentpage
        }
    }

    res.status(200).json(return_data);
}