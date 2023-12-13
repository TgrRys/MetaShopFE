import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState({});
  //   const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setName(user.name || "");
    setEmail(user.email || "");
    setAddress(user.addresses ? user.addresses[0] : "");
  }, [user]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:5000/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        if (data.success) {
          setUser(data.data);
          //   setSelectedAddress(data.data.addresses[0]);
        } else {
          console.log("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  //   const handleAddressChange = (e) => {
  //     setSelectedAddress(user.addresses[e.target.value]);
  //   };

  const handleEditClick = async () => {
    if (isEditing) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.put(
          "http://localhost:5000/user/profile/edit",
          {
            name,
            email,
            address,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data.success) {
          setUser(response.data.data);
          if (response.data.data.addresses) {
            // setSelectedAddress(response.data.data.addresses[0]);
          } else {
            // setSelectedAddress(null);
          }
          toast.success("Profile updated successfully!");
        }
      } catch (error) {
        console.error("Error updating user profile:", error);
      }
    }

    setIsEditing(!isEditing);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="relative bg-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 overflow-hidden rounded-lg px-2 sm:px-4 md:px-6 lg:px-8 py-8 shadow-md">
        <div className="absolute top-0 right-0 m-4">
          <button
            onClick={handleEditClick}
            className="bg-amber-300 hover:bg-amber-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            {isEditing ? (
              <>
                <FaSave className="mr-2" />
                Save
              </>
            ) : (
              <>
                <FaEdit className="mr-2" />
                Edit
              </>
            )}
          </button>
          {isEditing && (
          <button
            onClick={handleCancelClick}
            className="bg-red-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center ml-2"
          >
            <FaTimes className="mr-2" />
            Cancel
          </button>
        )}
        </div>
        <div className="flex justify-center py-10">
          <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-gray-300 shadow-sm">
            <img
              src={user.image || "https://via.placeholder.com/150"}
              alt="User profile"
            />
          </div>
        </div>
        <div className="border-t border-gray-200 py-10">
          <dl>
            <div className="bg-gray-50 px-2 sm:px-4 md:px-6 lg:px-8 py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={name === "" ? user.name : name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                ) : (
                  user.name
                )}
              </dd>
            </div>
            <div className="bg-white px-2 sm:px-4 md:px-6 lg:px-8 py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {isEditing ? (
                  <input
                    type="email"
                    value={email === "" ? user.email : email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                ) : (
                  user.email
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Profile;

{
  /* <div className="bg-gray-50 px-2 sm:px-4 md:px-6 lg:px-8 py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <select
                    onChange={handleAddressChange}
                    className="mb-2 bg-white border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                    {user.addresses &&
                        user.addresses.map((address, index) => (
                        <option key={index} value={index}>
                            {`Address ${index + 1}`}
                        </option>
                        ))}
                    </select>
                    {selectedAddress && (
                    <div className="bg-white p-4 my-2 rounded shadow">
                        <p className="font-bold">{`Address`}</p>
                        {isEditing ? (
                        <textarea
                            value={
                            address === ""
                                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.country}, ${selectedAddress.postalCode}`
                                : address
                            }
                            onChange={(e) => setAddress(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        ) : (
                        <>
                            <p>{selectedAddress.street}</p>
                            <p>{selectedAddress.city}</p>
                            <p>{selectedAddress.country}</p>
                            <p>{selectedAddress.postalCode}</p>
                        </>
                        )}
                    </div>
                    )}
                </dd>
            </div> */
}
