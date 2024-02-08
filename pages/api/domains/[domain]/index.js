const { API_BASE_URL } = require('../../../index');

export default async function handler(req, res) {
    const { org, domain } = req.query;
    const domainMapping = require('../domains.json');
    const domainDetail = domainMapping.find(d => d.id === domain);
    if (domainDetail) {
        ///
        let domain_urls = domainDetail.apiUrls
        if (domain_urls && domain_urls.length > 0) {
            let domain_data = []
            for (let i = 0; i < domain_urls.length; i++) {
                let apiurl = domain_urls[i]
                let query = req.query
                
                if (query && Object.keys(query).length > 0) {
                    apiurl = apiurl + '?'
                    for (const [key, value] of Object.entries(query)) {
                        apiurl = apiurl + key + '=' + value + '&'
                    }
                    apiurl = apiurl.slice(0, -1)
                }
                const response = await fetch(API_BASE_URL + apiurl)
                const data = await response.json()


                if(domainDetail?.metadata?.subdomainQueryParam){
                    // fetch subdomains
                    let subdomain_url = API_BASE_URL  + domain_urls[i] + 'concepts/' + '?' + domainDetail.metadata.subdomainQueryParam
                    console.log("subdomain_url ", subdomain_url)
                    const subdomainResponse = await fetch(subdomain_url)
                    if(subdomainResponse.status !== 200) {
                        res.status(subdomainResponse.status).json({ message: 'Subdomains not found' });
                    }
                    const subdomainData = await subdomainResponse.json()
                    data.subdomains = subdomainData
                }
                if(req.query.includeConcepts){
                    // fetch concepts
                    let concepts_url = API_BASE_URL + domain_urls[i] + 'concepts/?limit=100&page='+(req.query.page || 1)
                    // console.log("concepts_url ", concepts_url)
                    const conceptsResponse = await fetch(concepts_url)
                    
                    const conceptspagecount = conceptsResponse.headers.get('pages')
                    const conceptspagesize = conceptsResponse.headers.get('num_returned')
                    const conceptscurrentpage = conceptsResponse.headers.get('page_number')
                    if(conceptsResponse.status !== 200) {
                        res.status(conceptsResponse.status).json({ message: 'Concepts not found' });
                    }
                    const conceptsData = await conceptsResponse.json()
                    data.concepts = conceptsData
                    data.conceptsMeta = {
                        pagecount: conceptspagecount,
                        pagesize: conceptspagesize,
                        currentpage: conceptscurrentpage
                    }
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
}