import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { FaGithub, FaGlobe } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Profile() {
  const [fullName, setFullName] = useState("user123");
  const [photoURL, setPhotoURL] = useState(
    "https://img.freepik.com/premium-photo/memoji-emoji-handsome-smiling-man-white-background_826801-6987.jpg?semt=ais_hybrid&w=740&q=80"
  );
  const [editFullName, setEditFullName] = useState(fullName);
  const [editPhotoURL, setEditPhotoURL] = useState(photoURL);
  const [edit, setEdit] = useState(false);

  const { token, email } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchuserDetails = async () => {
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD72j2lhmkCkQtYdbqXIWSCcdNa7jHfBIs",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: token }),
          }
        );
        const data = await res.json();
        setFullName(data.users[0].displayName);
        setEditFullName(data.users[0].displayName);
        setPhotoURL(data.users[0].photoUrl);
        setEditPhotoURL(data.users[0].photoUrl);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchuserDetails();
  }, [token, edit]);

  const handleUpdate = async () => {
    if (editFullName === "" || editPhotoURL === "") {
      alert("Please add all the details.");
      return;
    }

    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD72j2lhmkCkQtYdbqXIWSCcdNa7jHfBIs`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken: token,
          displayName: editFullName,
          photoUrl: editPhotoURL,
          returnSecureToken: true,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      console.log("Profile updated:", data.displayName, data.photoUrl);
      setEdit(false);
    }
  };

  return (
    <div className="min-h-screen py-12 flex flex-col items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100 text-gray-900">
      {/* Background Decorations */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-red-200 to-orange-200 rounded-full opacity-30 blur-3xl"></div>

      {/* Profile Card */}
      <div className="w-full max-w-3xl backdrop-blur-sm bg-white/80 border border-white/20 shadow-2xl rounded-3xl p-8 relative z-10">
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <img
            src={photoURL}
            alt="avatar"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {fullName}
            </h2>
            <p className="text-gray-600">Email: {email}</p>
          </div>
          <button
            onClick={() => setEdit(!edit)}
            className="ml-auto flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <Pencil size={16} /> Edit
          </button>
        </div>

        {/* Edit Form */}
        {edit && (
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Update Profile
            </h2>

            <div className="space-y-4">
              {/* Full Name */}
              <div className="flex items-center gap-3">
                <FaGithub className="text-xl text-gray-500" />
                <input
                  type="text"
                  value={editFullName}
                  onChange={(e) => setEditFullName(e.target.value)}
                  placeholder="Full Name"
                  className="flex-1 rounded-xl px-4 py-3 border bg-gray-50/50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 hover:bg-white"
                />
              </div>

              {/* Profile Photo URL */}
              <div className="flex items-center gap-3">
                <FaGlobe className="text-xl text-gray-500" />
                <input
                  type="text"
                  value={editPhotoURL}
                  onChange={(e) => setEditPhotoURL(e.target.value)}
                  placeholder="Profile Photo URL"
                  className="flex-1 rounded-xl px-4 py-3 border bg-gray-50/50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 hover:bg-white"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEdit(!edit)}
                className="px-4 py-2 rounded-xl border border-red-300 text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
