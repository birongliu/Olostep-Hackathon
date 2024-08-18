"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ResultPage() {
  const router = useRouter();
  const [data, setData] = useState<{ allowedEndpoints: string[], disallowedEndpoints: string[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const type = query.get('type');
    const dataParam = query.get('data');

    if (dataParam) {
      try {
        const parsedData = JSON.parse(dataParam);
        setData(parsedData);
      } catch (e) {
        setError('Failed to parse data');
      }
    } else {
      setError('No data found');
    }
    setLoading(false);
  }, [router]);

  const handleScrapAnother = () => {
    router.push('/urlPage'); // Navigate to /urlPage
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="relative flex w-full h-screen bg-[url('/img/background.png')] bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-15"></div>

      <div className="relative flex flex-col justify-center items-center w-full z-10 px-4 md:px-8 lg:px-16">
        {/* Display Scraped Results */}
        <section className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Scraped Results</h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Allowed Endpoints</h3>
            <ul>
              {data?.allowedEndpoints.map((endpoint, index) => (
                <li key={index} className="text-green-600">
                  {endpoint}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Disallowed Endpoints</h3>
            <ul>
              {data?.disallowedEndpoints.map((endpoint, index) => (
                <li key={index} className="text-red-600">
                  {endpoint}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Scrap Another Link Button */}
        <div className="px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition mt-8">
          <button
            onClick={handleScrapAnother}
            className="w-full h-full"
          >
            Scrap Another Link
          </button>
        </div>
      </div>
    </main>
  );
}
