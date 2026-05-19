export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mb-4">
        Library Management System
      </h1>

      <p className="text-gray-400 text-lg">
        Next.js Frontend + NestJS Backend
      </p>

      <div className="mt-8 flex gap-4">
        <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700">
          Login
        </button>

        <button className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700">
          Register
        </button>
      </div>
    </div>
  );
}