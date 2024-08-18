"use client";

import React, { useState } from "react";

interface DeepScrap {
  context: {
    title: string;
    paragraphs: string[];
  };
  analysis: {
    choices: {
      message: {
        content: string;
      };
      finish_reason: "stop";
    }[];
  };
}
export default function UrlPages() {
  const [url, setUrl] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [scrapedData, setScrapedData] = useState<{
    allowedEndpoints: string[];
    disallowedEndpoints: string[];
  } | null>(null);
  const [data, setData] = useState<DeepScrap>();
  const [wait, setWait] = useState(false)
  const [activeApi, setActiveApi] = useState<"scrap" | "deep_scrap" | null>(
    null
  );

  //api request
  const handleScraping = async () => {
    setActiveApi("scrap");
    setWait(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scraper/scrap`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        }
      );
      const responseData = await response.json();

      if (responseData.status === 200) {
        setScrapedData(responseData.data);
        setWait(false)
      }
    } catch (error) {
      console.error("Error during scraping:", error);
    }
  };

  const handleSearch = async () => {
    setActiveApi("deep_scrap");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scraper/deep_scrap`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: searchTerm }),
        }
      );

      const ctx = await response.json();
      setData(ctx.data);
    } catch (error) {
      console.error("Error during deep scraping:", error);
    }
  };

  return (
    <main className={`relative flex w-full ${data ? "h-full" : "h-screen"} bg-[url('/img/background.png')] bg-cover bg-center`}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-15"></div>

      <div className="relative flex mt-32 flex-col justify-center items-center w-full z-10 px-4 md:px-8 lg:px-16">
        {/* "Ready to start" */}
        <div className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] bg-gradient-to-r from-purple-700 via-red-600 to-pink-500 bg-clip-text text-transparent font-bold uppercase mb-4 px-4 md:px-6 lg:px-8 text-center">
          Ready to start scrapping?
        </div>

        {/* Description */}
        <p className="relative uppercase tracking-widest text-sm md:text-base lg:text-lg xl:text-xl bg-gradient-to-r from-purple-700 via-red-600 to-pink-600 bg-clip-text text-transparent font-bold mb-6 md:mb-8 lg:mb-10 text-center">
          Please enter the URL in this box below.
        </p>

        {/* URL Input Box */}
        <div className="w-full max-w-md px-4 py-4 bg-transparent rounded-lg">
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter url here..."
              className="w-full p-3 rounded-lg text-black bg-white bg-opacity-80 border-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
            />

            <button
              type="button"
              onClick={handleScraping}
              className="w-full px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition"
            >
              Find sub url
            </button>
          </form>
        </div>

        {/* Search Input Box */}

        <div className="w-full max-w-md px-4 py-4 bg-transparent rounded-lg">
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter a sub url here..."
              className="w-full p-3 rounded-lg text-black bg-white bg-opacity-80 border-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
            />

            <button
              type="button"
              onClick={handleSearch}
              className="w-full px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition"
            >
              Start Scraping
            </button>
          </form>
        </div>

        {/* Display Scraped Results */}
        <div className={`flex flex-col w-full p-5 rounded  ${scrapedData ? "block" : "hidden"} bg-black text-white grid-cols-1 overflow-y-auto scroll-smooth md:grid-cols-4 h-40`}>
        {scrapedData !== null && scrapedData.allowedEndpoints.map((element, i) => (
            <ul className="flex flex-col" key={i}>
              <button onClick={() => setSearchTerm(element)}>
              <li className="text-white">{element}</li>
              </button>
            </ul>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 rounded">
          {wait && <div>Please wait</div>}
          {data && (
            <>
              <div className="flex rounded overflow-scroll h-64 flex-col text-black">
                <div> Analysis </div>
                <p className="bg-white overflow-auto p-2">
                  {data?.analysis.choices[0].message.content}
                </p>
              </div>
            </>
          )}
          {data && (
               <>
              <div className="flex rounded overflow-scroll h-64 flex-col text-black">
              <div> Raw Data </div>
                 <p className="bg-white overflow-auto w-full p-2">
                   {data?.context.title}
                   {data?.context.paragraphs.map(k => (
                    <p key={k}>{k}</p>
                   ))}
                 </p>
               </div>
             </>
          )}
        </div>
      </div>
    </main>
  );
}
