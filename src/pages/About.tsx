// src/pages/About.tsx


export const About: React.FC = () => {
  return (
    <main className="pt-24 max-w-4xl mx-auto px-6 prose prose-indigo">
      <h1>About Tenly</h1>
      <p>
        Tenly is a modern news aggregator app built with React, TypeScript, and Tailwind CSS. It fetches top news stories from India and worldwide, providing a clean and intuitive user experience.
      </p>
      <p>
        This app leverages serverless API routes to securely fetch news data without exposing sensitive API keys on the client side.
      </p>
      <p>
        Inspired by minimalist design principles and apps like ChatGPT, Tenly is designed to keep you informed effortlessly.
      </p>
    </main>
  );
};
