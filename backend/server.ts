import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Enable CORS so your frontend can call this API
app.use(cors());

// Optional: parse JSON body if needed
app.use(express.json());

const PORT = process.env.PORT || 4000;

// News API route
app.get('/api/news', async (req: Request, res: Response) => {
  try {
    const { query = 'technology', category = 'business', country = 'us', language = 'en', imageRequired = 'true' } = req.query;

    const response = await axios.get('https://api.example-news.com/v1/news', {
      params: {
        q: query,
        category,
        country,
        language,
        image: imageRequired
      },
      headers: {
        'Authorization': `Bearer ${process.env.NEWS_API_KEY}`
      }
    });

    // Always return normalized data for frontend
    const articles = response.data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      link: article.url,
      source: { name: article.source?.name || 'Unknown' },
      source_id: article.source?.name || 'Unknown',
      image_url: article.image || null,
      image: article.image || null,
      pubDate: article.publishedAt || new Date().toISOString(),
      publishedAt: article.publishedAt || new Date().toISOString()
    }));

    res.json({ articles });
  } catch (error: any) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ error: 'Failed to fetch news from API' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
