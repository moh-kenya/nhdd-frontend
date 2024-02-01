const { API_BASE_URL } = require('../../../index');

export default async function handler(req, res) {
    const { org, domain } = req.query;
    const domainMapping = require('../domains.json');
    const domainDetail = domainMapping.find(d => d.id === domain);
    if (domainDetail) {
        res.status(200).json(domainDetail);
    } else {
        res.status(404).json({ message: 'Domain not found' });
    }
}