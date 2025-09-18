import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const result = dotenv.config({ path: '../.env' });
if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('Successfully loaded .env file');
}

import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());

interface NewsAPIResponse {
  articles: Array<{ title: string; url: string; [key: string]: any }>;
}

interface MediaStackResponse {
  data: Array<{ title: string; url: string; [key: string]: any }>;
}

interface NewsDataAPIResponse {
  results: Array<{ title: string; link: string; [key: string]: any }>;
}

app.get('/api/news', async (req, res) => {
  const newsAPIKey = process.env.NEWSAPI_KEY;
  const mediaStackKey = process.env.MEDIASTACKAPI_KEY;
  const newsDataKey = process.env.NEWSDATAAPI_KEY;

  if (!newsAPIKey || !mediaStackKey || !newsDataKey) {
    return res.status(500).json({ error: 'API keys not configured' });
  }

  const newsAPIUrl = `https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=${newsAPIKey}`;
  const mediaStackUrl = `https://api.mediastack.com/v1/news?access_key=${mediaStackKey}&category=general&country=in`;
  const newsDataUrl = `https://newsdata.io/api/1/news?apikey=${newsDataKey}&category=general&country=in`;

  try {
    const [newsAPIResponse, mediaStackResponse, newsDataResponse] = await Promise.all([
      fetch(newsAPIUrl),
      fetch(mediaStackUrl),
      fetch(newsDataUrl),
    ]);

    const newsAPIData = (await newsAPIResponse.json()) as NewsAPIResponse;
    const mediaStackData = (await mediaStackResponse.json()) as MediaStackResponse;
    const newsDataAPIData = (await newsDataResponse.json()) as NewsDataAPIResponse;

    return res.json({
      newsAPI: newsAPIData.articles,
      mediaStack: mediaStackData.data,
      newsDataAPI: newsDataAPIData.results,
    });
  } catch (error: any) {
    console.error('Error fetching news:', error);
    return res.status(500).json({ error: error.message || 'Unknown error' });
  }
});

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
