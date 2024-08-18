

```markdown
# Web Scraper and AI Analysis Tool

This project is a web scraping and analysis tool that extracts data from given URLs, analyzes it using AI, and presents the results through a web interface. The system is built using React TypeScript for the frontend, Node.js and Express for the backend, MongoDB for data storage, and Puppeteer for scraping automation. The AI model used for analysis is `openai/gpt-3.5-turbo`, accessed through OpenRouter.

## Features

- **Web Scraping:** Extracts data from specified URLs using Puppeteer.
- **AI Analysis:** Analyzes the scraped data with the OpenAI GPT-3.5-turbo model.
- **Automation:** Utilizes GitHub Actions for automated backend scraping and analysis tasks.
- **Frontend:** User-friendly interface built with React and TypeScript.
- **Backend:** Robust server-side operations handled by Node.js and Express.
- **Database:** Efficient data storage and retrieval using MongoDB.

## Technology Stack

- **Frontend:** React, TypeScript
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Web Scraping:** Puppeteer
- **AI Analysis:** OpenAI GPT-3.5-turbo via OpenRouter
- **Automation:** GitHub Actions

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/birongliu/Olostep-Hackathon.git
   cd your-repo
   ```

2. **Install dependencies:**

   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in both `backend` and `frontend` directories with the following variables:

   **Backend:**
   ```
   MONGO_URI=your_mongodb_uri
   OPENAI_API_KEY=your_openai_api_key
   ```

   **Frontend:**
   ```
   REACT_APP_API_URL=your_backend_api_url
   ```

4. **Start the application:**

   ```bash
   # Start the backend
   cd backend
   npm start
   
   # Start the frontend
   cd ../frontend
   npm start
   ```

5. **Run Puppeteer for scraping:**

   Puppeteer is set up to automate web scraping. Ensure that you have a scraping script ready and run it via Node.js:

   ```bash
   node scraper.js
   ```

## Usage

1. **Scrape Data:**
   - Enter a URL in the frontend interface.
   - The backend will use Puppeteer to scrape data from the provided URL.

2. **Analyze Data:**
   - The scraped data is sent to the AI model (GPT-3.5-turbo) for analysis.
   - Results are stored in MongoDB and displayed on the frontend.

3. **Automate Tasks:**
   - GitHub Actions handle automated scraping and analysis workflows. Modify the `.github/workflows` scripts as needed.

## Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/my-new-feature`.
3. Commit your changes: `git commit -am 'Add some feature'`.
4. Push to the branch: `git push origin feature/my-new-feature`.
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
