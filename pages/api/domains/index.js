// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { API_BASE_URL } from '../../index';
const domainMapping = require('./domains.json')

export default function handler(req, res) {
  res.status(200).json(domainMapping);
}
