import Link from "next/link";

function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-6xl">404</h1>
      <p className="mb-8 text-lg 2xl:text-2xl">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">
        <button className="cursor-pointer rounded-lg border-none bg-gray-900 px-4 py-2 text-base text-white 2xl:px-8 2xl:py-3">
          Go to Homepage
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
