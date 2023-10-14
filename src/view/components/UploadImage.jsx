const UploadImage = ({ user, upload, handleChange, profilePicURL }) => {
  return (
    <>
      {profilePicURL ? (
        <img
          src={profilePicURL}
          alt="Profile Pic"
          className="h-40 w-40 object-cover border mb-2 border-emerald-800 rounded-full"
        />
      ) : (
        <div className="flex justify-center">
          <img
            src={user.img}
            alt="default-img"
            className="h-40 w-40 object-cover border mb-2 border-emerald-800 rounded-full"
          />
        </div>
      )}
      <div>
        <input type="file" onChange={handleChange} className="text-xs 2xl:text-base"/>
        <button
          className="2xl:text-base text-sm bg-emerald-800 shadow-lg w-20 h-6 rounded text-white  hover:bg-emerald-600"
          onClick={upload}
        >
          Upload
        </button>
      </div>
    </>
  );
};

export default UploadImage;
