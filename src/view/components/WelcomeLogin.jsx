import { Link } from "react-router-dom";
import PhoneModel from "../../../assets/phone-model.jpg";
import Logo from "../../../assets/groupchat.png";
import CustomButton from "./CustomButton";

const WelcomeLogin = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <img src={PhoneModel} className="md:h-80 md:w-80" alt="Logo" />
      <section className="flex justify-center flex-col m-3">
        <article className="p-1 text-green-900 text-center">
          <p className="text-3xl md:text-3xl lg:md:text-3xl">
            Connect with your <b>Friends</b>
          </p>
          <p className="text-3xl md:text-3xl lg:md:text-3xl">
            Create a <b>Meeting</b>
          </p>
          <p className="text-3xl md:text-3xl lg:md:text-3xl">
            Build <b>Chatrooms</b>
          </p>
          <Link to="/about">
            <CustomButton
              styleSize="w-28 py-2"
              styleColor="text-green-400 bg-slate-800"
              name="Get Started"
            />
          </Link>
        </article>
      </section>
    </div>
  );
};

export default WelcomeLogin;
