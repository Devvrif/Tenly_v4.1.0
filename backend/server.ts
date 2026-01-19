import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Load .env file explicitly
// dotenv.config({ path: '../.env' });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// Debug environment variables (remove this after fixing)
console.log('🔍 Environment check:');
console.log('Available env vars:', Object.keys(process.env).filter(key => key.includes('API') || key.includes('KEY')));

// API route to fetch dynamic news based on user input
app.get('/api/news', async (req, res) => {
  const { query = 'technology', category = 'technology', country = 'us', language = 'en', imageRequired = true } = req.query;

  // Valid NewsData.io categories
  const validCategories = ['business', 'entertainment', 'environment', 'food', 'health', 'politics', 'science', 'sports', 'technology', 'top', 'world'];
  const validCountries = ['us', 'gb', 'ca', 'au', 'in', 'de', 'fr', 'it', 'es', 'jp', 'cn', 'ru'];
  const validLanguages = ['en', 'ar', 'de', 'es', 'fr', 'he', 'it', 'nl', 'no', 'pt', 'ru', 'sv', 'zh'];

  // Validate and fix parameters
  const safeCategory = validCategories.includes(category as string) ? category : 'technology';
  const safeCountry = validCountries.includes(country as string) ? country : 'us';
  const safeLanguage = validLanguages.includes(language as string) ? language : 'en';

  try {
    // Check what API keys are available in your .env (matching your variable names)
    const newsDataApiKey = process.env.NEWSDATAAPI_KEY || process.env.NEWSDATA_API_KEY || process.env.NEWS_API_KEY;

    console.log('🔑 Looking for API keys...');
    console.log('NEWSDATAAPI_KEY exists:', !!process.env.NEWSDATAAPI_KEY);
    console.log('NEWSDATA_API_KEY exists:', !!process.env.NEWSDATA_API_KEY);
    console.log('NEWS_API_KEY exists:', !!process.env.NEWS_API_KEY);

    if (!newsDataApiKey) {
      console.error('❌ No NewsData API key found. Check your .env file.');
      return res.status(500).json({
        message: 'API key is missing from environment variables.',
        debug: 'Make sure you have NEWSDATA_API_KEY in your .env file'
      });
    }

    console.log('✅ API key found, making request...');
    console.log('📋 Using parameters:', { query, category: safeCategory, country: safeCountry, language: safeLanguage });

    // Fixed NewsData.io API call with valid parameters
    const newsDataUrl = `https://newsdata.io/api/1/latest?apikey=${newsDataApiKey}&q=${query}&category=${safeCategory}&country=${safeCountry}&language=${safeLanguage}&image=${imageRequired ? 1 : 0}&size=10`;

    console.log('🌐 Requesting:', newsDataUrl.replace(newsDataApiKey, '***API_KEY***'));

    const newsDataIOResponse = await axios.get(newsDataUrl);
    const newsDataIOArticles = newsDataIOResponse.data.results || []; // Note: NewsData.io uses 'results', not 'articles'

    console.log('📰 Got', newsDataIOArticles.length, 'articles from NewsData.io');

    // For now, let's just use NewsData.io and comment out other APIs
    // until we get this working first

    /*
    // OTHER NEWS APIs - Uncomment when you have their API keys
    const newsAPIKey = process.env.NEWSAPI_KEY;
    const mediaStackKey = process.env.MEDIASTACK_API_KEY;
    
    let newsAPIData = [];
    let mediaStackData = [];

    if (newsAPIKey) {
      try {
        const newsAPIResponse = await axios.get(`https://newsapi.org/v2/top-headlines?apiKey=${newsAPIKey}&q=${query}&category=${category}&country=${country}&pageSize=10`);
        newsAPIData = newsAPIResponse.data.articles || [];
      } catch (error) {
        console.warn('NewsAPI request failed:', error.message);
      }
    }

    if (mediaStackKey) {
      try {
        const mediaStackResponse = await axios.get(`http://api.mediastack.com/v1/news?access_key=${mediaStackKey}&keywords=${query}&countries=${country}&limit=10`);
        mediaStackData = mediaStackResponse.data.data || [];
      } catch (error) {
        console.warn('MediaStack request failed:', error.message);
      }
    }
    */

    // For now, just return NewsData.io articles in a consistent format
    // Replace the mapping section with this:
    const combinedNews = newsDataIOArticles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.link, // Map link to url
      source: { name: article.source_id || 'NewsData.io' }, // Map to expected format
      image: article.image_url || null, // Map image_url to image
      publishedAt: article.pubDate, // Map pubDate to publishedAt
      category: article.category?.[0] || category,
    }));

    console.log('✅ Returning', combinedNews.length, 'formatted articles');

    // Send response
    res.json({
      articles: combinedNews,
      total: combinedNews.length,
      query: query,
      category: safeCategory,
      country: safeCountry,
      status: 'success'
    });

  } catch (error: any) {
    console.error('❌ Error fetching news:', error.message);
    console.error('Full error:', error.response?.data || error);

    res.status(500).json({
      message: 'Failed to fetch news',
      error: error.message,
      debug: 'Check server logs for details'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    env_loaded: !!process.env.NEWSDATA_API_KEY || !!process.env.NEWS_API_KEY
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔗 News API: http://localhost:${PORT}/api/news?query=technology`);
});

export default app;