import LoginController from "../../controller/LoginController";
import HorizontalCard from "../components/HorizontalCard";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import Footer from "../components/Footer";

//assets
import PairModel from "../../../assets/pair-model.jpg";
import Solo from "../../../assets/solo-girl-model.jpg";
import Woman from "../../../assets/woman-model.jpg";
import Man from "../../../assets/man-model.jpg";

//icons
import { MdLock, MdLockOpen } from "react-icons/md";

const LandingPage = () => {
  return (
    <div>
      <section className="pt-14">
        <LoginController />
      </section>

      <section className="mt-10 p-4">
        <h1 className=" flex flex-col items-center text-4xl text-center p-5">
          Ramble with your friends!
          <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-900 w-2/5 h-1 mt-1 rounded-xl"></div>
        </h1>
      </section>
      <section>
        <article className="  md:p-8 flex justify-center flex-col md:flex-col sm:flex-col items-center md:flex-row md:gap-3">
          <HorizontalCard
            model={Solo}
            icon={<MdLock />}
            chatType="Private Chats"
            header="Chat your friends, relatives, and loved ones Privately!"
            message="In today's interconnected world, the ability to chat with our
            friends, relatives, and loved ones privately has become more
            important than ever. With the advent of technology and messaging
            applications, we now have the means to stay connected regardless of
            geographical distances."
            firstUser={Woman}
            userNameFirst="First User"
            chatFirst="Hi First User!"
            SecondUser={Solo}
            userNameSecond="Second User"
            chatSecond="Hello First User!"
          />
          <HorizontalCard
            model={PairModel}
            icon={<MdLockOpen />}
            chatType="Public Chats"
            header="Chat Globaly!"
            message="In an age where our world is interconnected like never before, the power to Chat Globally has transformed the way we communicate and connect with people from all corners of the globe. With just a few clicks or taps, we can bridge geographical boundaries and engage in conversations that span continents and cultures. This global conversation transcends language barriers, opening doors to new friendships, diverse perspectives, and a deeper understanding of our global community."
            firstUser={PairModel}
            userNameFirst="First User"
            chatFirst="Hi First User!"
            SecondUser={Man}
            userNameSecond="Second User"
            chatSecond="Hello"
          />
        </article>
      </section>
      <section className="flex justify-center ">
        <AboutPage />
      </section>
      <section>
        <ContactPage />
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default LandingPage;
