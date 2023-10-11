import React from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import Logo from "../../../assets/ramble-black.png";

//icons
import { ImLocation2 } from "react-icons/im";
import { MdOutlineMailOutline } from "react-icons/md";

function ContactPage() {
  return (
    <div className="p-8">
      <h1 className=" flex flex-col items-center text-4xl text-center pb-4 ">
        CONTACT US!
        <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-900 w-1/4 h-1 mt-1 rounded-xl"></div>
      </h1>
      <div className="flex md:flex-row md:gap-1 justify-center items-center flex-col">
        <section className="border border-emerald-800 w-full  md:w-3/4 lg:w-3/4 p-4 rounded-xl m-4">
          <form
            action="mailto:ramble@email.com"
            method="get"
            encType="text/plain"
          >
            <div className="flex flex-col justify-center">
              <h2 className="text-slate-800 text-xl font-semibold w-full pb-2">
                Message us here
              </h2>

              <div className="flex flex-col">
                <div className="flex justify-between flex-col md:flex-row lg:flex-row">
                  <CustomInput
                    type="email"
                    placeholder="Email"
                    styleSize="w-full h-5"
                    styleColor="text-slate-800"
                    styleTextColor="text-slate-800"
                  />
                  <CustomInput
                    id="name"
                    type="name"
                    placeholder="Name"
                    styleSize="w-full h-5"
                    styleColor="text-slate-800"
                    styleTextColor="text-slate-800"
                  />
                </div>
                <CustomInput
                  id="subject"
                  type="subject"
                  placeholder="Subject"
                  styleSize="w-full h-5"
                  styleColor="text-slate-800"
                  styleTextColor="text-slate-800"
                />

                <textarea
                  className="w-full rounded-md p-2 h-36 outline-none border mt-1 ml-1 border-slate-800"
                  rows="6"
                  id="message"
                  placeholder="Message"
                  required
                ></textarea>
              </div>
              <CustomButton
                styleSize="w-72"
                styleColor="bg-emerald-700"
                styleTextColor="text-white"
                // handleClick={handleSubmit}
                name="Submit"
              />
            </div>
          </form>
        </section>

        {/* Second */}
        <section className="p-4">
          <h2 className="text-2xl">Let's connect! </h2>
          <p>
            Thank you for visting Ramble Chat Website. If you want to connect
            with us, feel free to send a message. Let's get to know each other!
          </p>
          <br />
          <div>
            <div className="mb-2">
              <img src={Logo} alt="This is an image" className="h-10" />
            </div>
            <div className="flex items-center">
              <ImLocation2 />
              <h4 className="ml-2">Manila, Philippines</h4>
            </div>
            <div className="flex items-center">
              <MdOutlineMailOutline />
              <h4 className="ml-2">ramble@email.com</h4>
            </div>
          </div>
          <br />
        </section>
      </div>
    </div>
  );
}

export default ContactPage;
