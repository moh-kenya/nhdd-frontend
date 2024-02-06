import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import * as path from 'path';

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    return response.status(405).end();
  }
  let filename = request.query.filename;
  let files_dir = '/public/assets/resources/'

  response.setHeader('Content-Disposition', 'attachment; filename='+filename);
  response.setHeader('Content-Type', 'application/text');

  const filePath = path.join(process.cwd(), files_dir, filename);
  const fileStream = fs.createReadStream(filePath);

  fileStream.pipe(response);

  response.on('finish', () => {
    fileStream.close();
  });
}