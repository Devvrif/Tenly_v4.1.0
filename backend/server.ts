import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/news', (req, res) => {
  res.json({
    articles: [
      {
        urlToImage: "https://source.unsplash.com/random/400x200",
        title: "Sample News Title",
        source: { name: "Mock News" },
        publishedAt: new Date().toISOString(),
        description: "This is a mock news article used for testing.",
        url: "https://example.com",
      },
      {
        urlToImage: "https://source.unsplash.com/random/400x201",
        title: "Another News Title",
        source: { name: "Mock Times" },
        publishedAt: new Date().toISOString(),
        description: "Another mock article with different content.",
        url: "https://example.com",
      },
    ],
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
