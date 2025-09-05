export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100 text-gray-800">
      {/* Big 404 text */}
      <h1 className="text-9xl font-extrabold text-orange-500 drop-shadow-lg">
        404
      </h1>

      {/* Funny food illustration */}
      <div className="mt-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
          alt="Burger Not Found"
          className="w-40 h-40 animate-bounce"
        />
      </div>

      {/* Text */}
      <h2 className="mt-6 text-3xl font-bold text-orange-600">
        Oops! Hungry but page not found
      </h2>
      <p className="mt-2 text-lg text-gray-600 text-center max-w-md">
        It looks like this page is missing from the menu 🍔🍕. Don’t worry,
        let’s get you back to delicious food.
      </p>

      {/* Button */}
      <a
        href="/"
        className="mt-8 px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg transition-all duration-300"
      >
        Back to Home
      </a>
    </div>
  );
}
