import React from "react";
import Card from "../components/Card";

//imgaes
import WomanModel from "../../../assets/woman-model.jpg";
import ManModel from "../../../assets/man-model.jpg";
import Logo from "../../../assets/ramble-black.png";

import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div>
      <section className="   text-slate-900 rounded-xl">
        <h1 className=" flex flex-col items-center text-4xl text-center p-5 ">
          ABOUT US!
          <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-900 w-1/4 h-1 mt-1 rounded-xl"></div>
        </h1>
        <article className="flex sm:flex-col md:flex-col lg:md:flex-row flex-col justify-around">
          <Card
            model={WomanModel}
            title="What is Ramble Chat App?"
            message="Discover Ramble Chat, the premier messaging platform for seamless and secure text-based conversations. Stay connected with friends, family, and colleagues without the need for voice calls. With Ramble Chat, you can communicate effortlessly and privately, sharing messages, images, and more with ease. Join the conversation today and experience the future of global messaging. "
            hash1="#Chat"
            hash2="#Friends"
            hash3="#Connect"
          />
          <Card
            model={ManModel}
            title="Founders ?"
            message="Ramble Chat, founded by visionary tech experts, brings together a diverse team of innovators dedicated to revolutionizing communication. Their passion for creating a secure and user-centric messaging platform has driven Ramble Chat to new heights. With a shared commitment to privacy and connectivity, these founders have crafted an app that's reshaping the way we connect with others worldwide."
            hash1="#Chat"
            hash2="#Friends"
            hash3="#Connect"
          />
          <Card
            model={Logo}
            title="Goal ?"
            message="Mission:
            Ramble Chat's mission is to connect people worldwide through secure and free messaging, breaking down barriers and fostering meaningful connections."
            messag2="Vision:
           Our vision is to be the global leader in secure messaging, enabling seamless communication without boundaries or privacy concerns."
            hash1="#Chat"
            hash2="#Friends"
            hash3="#Connect"
          />
        </article>
      </section>
    </div>
  );
}

export default AboutPage;
