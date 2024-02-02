const { API_BASE_URL } = require('../../../../index');

export default async function handler(req, res) {
    const { org, domain, resource } = req.query;

    const domainMapping = require('../../domains.json');
    const domainDetail = domainMapping.find(d => d.id === domain);
    if (domainDetail) {
        // if resource is not provided, return domain detail
        if (!resource) {
            res.status(200).json(domainDetail);
        }
        let domain_urls = domainDetail.apiUrls
        if (domain_urls && domain_urls.length > 0) {
            let domain_data = []
            for (let i = 0; i < domain_urls.length; i++) {
                let apiurl = domain_urls[i] + resource
                // if req has other query params, pass them to the apiurl
                if (req.query && Object.keys(req.query).length > 0) {
                    apiurl = apiurl + '?'
                    for (const [key, value] of Object.entries(req.query)) {
                        apiurl = apiurl + key + '=' + value + '&'
                    }
                    apiurl = apiurl.slice(0, -1)
                }
                const response = await fetch(API_BASE_URL + apiurl)
                const data = await response.json()
                domain_data.push(data)
            }
            if (domain_urls.length === 1) domain_data = domain_data[0]
            domainDetail.data = domain_data
        } else {
            domainDetail.data = []
        }
        res.status(200).json(domainDetail);
    } else {
        res.status(404).json({ message: 'Domain not found' });
    }
}