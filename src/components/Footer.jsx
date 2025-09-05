export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 text-center py-4 mt-10">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} MyStore. All rights reserved.
      </p>
    </footer>
  );
}
