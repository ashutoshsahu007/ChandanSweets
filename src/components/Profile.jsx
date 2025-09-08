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
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=
AIzaSyD72j2lhmkCkQtYdbqXIWSCcdNa7jHfBIs`,
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

    if (res.ok) {
      setEdit(false);
    }
  };

  return (
    <div className="mb-10 bg-gray-50">
      {/* Banner + Card */}
      <div className="flex flex-col  items-center text-gray-900 p-6">
        {/* Banner */}
        <div className="w-full max-w-3xl rounded-t-2xl h-40 bg-blue-600"></div>

        {/* Card */}
        <div className="w-full max-w-3xl rounded-b-2xl p-6 -mt-16 shadow-lg relative bg-white border border-gray-200">
          {/* Avatar */}
          <div className="absolute -top-12 left-6">
            <img
              src={photoURL}
              alt="avatar"
              className="w-24 h-24 rounded-full border-4 shadow-lg border-white"
            />
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setEdit(!edit)}
            className="absolute top-6 right-6 flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            <Pencil size={16} /> Edit
          </button>

          {/* User Info */}
          <div className="mt-16 space-y-1">
            <h2 className="text-2xl font-bold">{fullName}</h2>

            <div className="mt-2 space-y-2">
              <p className="text-sm opacity-70">Email: {email} </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {edit && (
        <div className="text-gray-900">
          <div className="flex justify-center mt-8">
            <div className="w-3/4 border p-6 rounded-md border-gray-300 bg-white">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Contact Details</h2>
                <button
                  onClick={() => setEdit(!edit)}
                  className="cursor-pointer font-semibold border rounded px-3 py-1 text-red-500 border-red-300 hover:bg-red-50"
                >
                  Cancel
                </button>
              </div>

              {/* Input Fields */}
              <div className="flex items-center space-x-6">
                {/* Full Name */}
                <div className="flex items-center space-x-2 w-1/2">
                  <FaGithub className="text-xl" />
                  <label className="font-medium">Full Name:</label>
                  <input
                    type="text"
                    value={editFullName}
                    onChange={(e) => setEditFullName(e.target.value)}
                    className="rounded px-2 py-1 flex-1 border bg-white border-gray-400 text-black"
                  />
                </div>

                {/* Profile Photo URL */}
                <div className="flex items-center space-x-2 w-1/2">
                  <FaGlobe className="text-xl" />
                  <label className="font-medium">Profile Photo URL</label>
                  <input
                    type="text"
                    value={editPhotoURL}
                    onChange={(e) => setEditPhotoURL(e.target.value)}
                    className="rounded px-2 py-1 flex-1 border bg-white border-gray-400 text-black"
                  />
                </div>
              </div>

              {/* Update Button */}
              <div className="mt-6">
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 rounded cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Update
                </button>
              </div>

              <hr className="mt-6 border-gray-300" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
