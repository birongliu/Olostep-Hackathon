"use client"
import { useRouter } from "next/navigation";

export default function ResultPage(props) {
  const router = useRouter();

  console.log(props)

  const handleScrapAnother = () => {
    router.push('/urlPage'); // Navigate to /urlPage
  };

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
              {/* {data?.allowedEndpoints.map((endpoint, index) => (
                <li key={index} className="text-green-600">
                  {endpoint}
                </li>
              ))} */}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Disallowed Endpoints</h3>
            <ul>
              {/* {data?.disallowedEndpoints.map((endpoint, index) => (
                <li key={index} className="text-red-600">
                  {endpoint}
                </li>
              ))} */}
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
