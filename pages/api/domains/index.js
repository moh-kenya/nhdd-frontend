// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { API_BASE_URL } from '../../index';
const domains = require('./domains.json')

export default async function handler(req, res) {
    for (let i = 0; i < domains.length; i++) {
        const domain = domains[i]
        // for each domain.apiUrls, fetch the data and add it to domain.data
        let domain_urls = domain.apiUrls
        domain.sources_data = []
        if (domain_urls && domain_urls.length > 0) {
            let domain_data = []
            for (let i = 0; i < domain_urls.length; i++) {
                let apiurl = domain_urls[i]
                let queries = req.query
                queries.includeSummary = 'true'
                // if req has other query params, pass them to the apiurl
                if (req.query && Object.keys(req.query).length > 0) {
                    apiurl = apiurl + '?'
                    for (const [key, value] of Object.entries(req.query)) {
                        apiurl = apiurl + key + '=' + value + '&'
                    }
                    apiurl = apiurl.slice(0, -1)
                }
                console.log('api:: ', API_BASE_URL + apiurl)
                const response = await fetch(API_BASE_URL + apiurl)
                if (response.status !== 200) { continue; }
                const data = await response.json()
                if (data && data != []) domain_data.push(data)
            }
            if (domain_urls.length === 1) domain_data = domain_data[0]
            if (domain_data && JSON.stringify(domain_data) != '[]') {
                domain.sources_data.push(domain_data)
            }
        } else {
            domain.sources_data = []
        }
    }
    res.status(200).json(domains);
}
