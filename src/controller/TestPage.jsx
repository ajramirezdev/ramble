import { useEffect, useState } from "react";
import UploadImage from "../view/components/UploadImage";
import jwt_decode from "jwt-decode";
import { storage } from "../config/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import UserModel from "../model/UserModel";

const TestPage = () => {
  const [user, setUser] = useState({});
  //states for upload profile pic
  const [imgUpload, setImgUpload] = useState();
  const [profilePicURL, setProfilePicURL] = useState();
  const [previousImageRef, setPreviousImageRef] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const decodedUser = jwt_decode(localStorage.getItem("token"));
      const userData = await UserModel.getOneUser(decodedUser._id);
      setUser(userData);
    };

    fetchData();
  }, []);

  //functions for uploading profile pics
  const handleUpload = (e) => {
    setImgUpload(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (imgUpload == null) return;

    const newImageRef = ref(storage, `user-images/${uuidv4()}`);

    try {
      await uploadBytes(newImageRef, imgUpload);
      const imgURL = await getDownloadURL(newImageRef);

      if (previousImageRef) {
        await deleteObject(previousImageRef);
      }
      await UserModel.editeUser(user._id, { img: imgURL });
      setUser({ ...user, img: imgURL });
      setProfilePicURL(imgURL);
      setPreviousImageRef(newImageRef);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <>
      <div>
        <img src={user.img} width={100} />
        <UploadImage
          upload={uploadImage}
          user={user}
          handleChange={handleUpload}
          profilePicURL={profilePicURL}
        />
      </div>
    </>
  );
};

export default TestPage;
