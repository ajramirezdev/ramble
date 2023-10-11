const UploadImage = ({ user, upload, handleChange, profilePicURL }) => {
  return (
    <>
      {profilePicURL ? (
        <img
          src={profilePicURL}
          alt="Profile Pic"
          width={200}
          style={{
            height: "200px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      ) : (
        <div className="flex justify-center">
          <img
            src={user.img}
            alt="default-img"
            width={200}
            style={{
              height: "200px",
              objectFit: "cover",
              borderRadius: "50%",
              border: "2px solid black",
              marginTop: "50px",
              marginBottom: "50px",
            }}
          />
        </div>
      )}
      <div>
        <input type="file" onChange={handleChange} />
        <button
          className="bg-emerald-500 shadow-lg w-20 h-8 rounded text-white  hover:bg-emerald-600"
          onClick={upload}
        >
          Upload
        </button>
      </div>
    </>
  );
};

export default UploadImage;
