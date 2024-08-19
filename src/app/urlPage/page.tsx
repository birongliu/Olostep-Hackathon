"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
interface LoadingStates {
  links: boolean;
  scrap: boolean;
}
export default function UrlPages() {
  const [url, setUrl] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [links, setLinks] = useState<{
    allowedEndpoints: string[];
    disallowedEndpoints: string[];
  } | null>(null);
  const [data, setData] = useState<DeepScrap | null>(null);
  const [loading, setLoading] = useState<LoadingStates>({
    links: false,
    scrap: false,
  });
  const router = useRouter();

  //api request
  const handleScraping = async () => {
    setLoading((prev) => ({ ...prev, links: true }));
    try {
      const response = await fetch("/api/scrap", {
        body: JSON.stringify({ url }),
        method: "POST",
      });
      const responseData = await response.json();
      if (responseData.status === 200) {
        setLinks(responseData.data);
      }
      setLoading((prev) => ({ ...prev, links: false }));
    } catch (error) {
      console.error("Error during scraping:", error);
      setLinks({ allowedEndpoints: [], disallowedEndpoints: [] });
    }
  };

  const handleSearch = async () => {
    setLoading((prev) => ({ ...prev, scrap: true }));
    try {
      const response = await fetch(`/api/scrap?url=${searchTerm}`);
      const responseData = await response.json();
      setData(responseData.data);
      setLoading((prev) => ({ ...prev, scrap: false }));
    } catch (error) {
      console.error("Error during deep scraping:", error);
      setData(null);
    }
  };

  return (
    <main
      className={`relative flex w-full h-screen bg-[url('/img/background.png')] bg-cover bg-center`}
    >
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
              disabled={loading.links}
              onClick={handleScraping}
              className="w-full px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition"
            >
              {!loading.links ? "Find Links" : "Loading"}
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
              disabled={loading.scrap}
              onClick={handleSearch}
              className="w-full px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition"
            >
              {!loading.scrap ? "Start Scraping" : "Loading"}
            </button>
          </form>
        </div>

        {/* Display Scraped Results */}
        {links && !links.allowedEndpoints && <div>No endpoint found</div>}
        {links && links.allowedEndpoints && (
          <div className="scrollbar grid-cols-2 w-full gap-10 rounded-md h-64 mb-2 overflow-y-auto text-black border-black border p-4">
            <div
              className={` ${
                links.allowedEndpoints ? "flex flex-col" : "hidden"
              } justify-center items-center`}
            >
              <h1 className="text-2xl">Search Endpoint</h1>
              <div
                className={`flex flex-col ${
                  links.allowedEndpoints ? "block" : "hidden"
                }`}
              >
                {links.allowedEndpoints.map((element) => (
                  <button onClick={() => setSearchTerm(element)} key={element}>
                    {element}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {data && (
          <div className="scrollbar grid-cols-2 w-full gap-10 rounded-md h-64 mb-2 overflow-y-auto text-black border-black border p-4">
            <div
              className={` ${
                data.analysis.choices.length > 0 ? "flex flex-col" : "hidden"
              } justify-center`}
            >
              <div
                className={`flex flex-col ${
                  data ? "block" : "hidden"
                }`}
              >
                <h1 className="text-2xl font-bold">Insights</h1>
                <div>{data.analysis.choices.map(k => (
                  <p key={k.message.content}>{k.message.content}</p>
                ))}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

/**
 *           {data && (
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
 */
