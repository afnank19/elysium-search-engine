type SearchPageProps = {
  searchParams: {
    q?: string;
  };
};

async function getSearchResult(searchTerm: string) {
  try {
    const res = await fetch(`http://localhost:5173/search?q=${searchTerm}`);
    const result = await res.json();

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}

function relevancyClassBuilder(relevancy: number, maxRelevanceScore: number) {
  const percentage = (relevancy / maxRelevanceScore) * 100;

  console.log(percentage);
  if (percentage > 80) {
    return "bg-green-900 border border-green-500";
  }

  if (percentage > 20) {
    return "bg-yellow-900 border border-yellow-500";
  }

  return "bg-red-900 border border-red-500";
}

const Search = async ({ searchParams }: SearchPageProps) => {
  const params = await searchParams;
  const rawQ = params.q;
  const q = Array.isArray(rawQ) ? rawQ[0] : rawQ ?? "";

  const data = await getSearchResult(q);
  let maxRelevanceScore = data[0].relevancy; // assumes the result returns the highest relevant item
  if (maxRelevanceScore == 0) {
    maxRelevanceScore = 1;
  }

  return (
    <>
      <div className="flex gap-2 items-center px-6 py-1 border-b mb-6 border-neutral-700">
        <h1 className="font-bold text-xl">
          <a href="/">Elysium</a>
        </h1>
        <form action="/search" method="GET" className="w-full relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pr-1 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            className="bg-neutral-700 rounded-full p-2 pl-8 px-4 m-1 max-w-lg w-full"
            placeholder="Search"
            type="text"
            required
            name="q"
            defaultValue={q}
          ></input>
        </form>
      </div>
      <div className="flex lg:ml-16 pl-2 md:pl-8">
        <div className="flex flex-col gap-2 ">
          {data.map((data: any, index: number) => {
            return (
              <div
                key={index}
                className="flex gap-2 items-center justify-between"
              >
                <div className="max-w-2xl truncate text-[#8ab4f8]">
                  <a
                    className=" text-lg w-fit hover:underline"
                    href={data.link}
                    target="_blank"
                  >
                    {data.title}
                  </a>
                  <p className="text-xs truncate text-neutral-200">
                    {data.link}
                  </p>
                </div>
                <div className="flex gap-2">
                  <div
                    className={`rounded-sm px-2 text-xs ${relevancyClassBuilder(
                      data.relevancy,
                      maxRelevanceScore
                    )}`}
                  >
                    Relevant: {(data.relevancy / maxRelevanceScore).toFixed(2)}
                  </div>
                  <div
                    className={`rounded-sm px-2 text-xs ${relevancyClassBuilder(
                      data.relevancy,
                      maxRelevanceScore
                    )}`}
                  >
                    Actual: {data.relevancy.toFixed(4)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Search;
