export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex flex-col h-dvh w-full items-center justify-center">
      <div className="flex flex-col items-center mb-4">
        <h1 className="font-medium text-6xl m-2">Elysium</h1>
        <h3 className="text-neutral-300">Search Engine</h3>
      </div>
      <form
        action="/search"
        method="get"
        className=" justify-center max-w-xl w-full mx-2 flex relative"
      >
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
          className="bg-neutral-700 rounded-full p-2 pl-8 px-4 m-1 w-full"
          placeholder="Search"
          type="text"
          required
          name="q"
        ></input>
      </form>
    </div>
  );
}
