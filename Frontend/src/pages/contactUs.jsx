import { useState } from "react";
import Footer from "../Components/footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Your message has been submitted successfully!");

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="h-full w-full">
      <div className="relative bg-teal-700 w-full h-[400px] mb-110">
        <h1 className="font-bold text-5xl pl-8 text-white text-center pt-15 ">
          Get in Touch
        </h1>
        <p className="pl-8 text-white text-center italic mb-20">
          Building Connections, One Message at a Time
        </p>

        {/* main Box */}
        <div
          className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-[70%]
                  bg-white w-[900px] h-[650px] grid grid-cols-2 p-6 shadow-xl rounded-xl mb-10 mt-10" 
        >
          {/* Left - Form */}
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-white p-8 mb-30 rounded-xl shadow space-y-6 "
          >
            {/* Heading */}
            <h3 className="text-2xl font-bold text-gray-800 text-center">
              Send Us a Message
            </h3>
            <p className="text-gray-600 text-center text-sm italic">
              We’d love to hear from you! Fill out the form below and we’ll get
              back to you soon.
            </p>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border p-3 rounded-md focus:ring focus:ring-green-500 outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full border p-3 rounded-md focus:ring focus:ring-green-500 outline-none"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows="4"
                className="w-full border p-3 rounded-md focus:ring focus:ring-green-500 outline-none"
                required
              ></textarea>
            </div>

            {/* Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-teal-600 text-white px-4 py-3 rounded-lg shadow hover:bg-teal-800 transition"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Right - Contact Info */}
          <div className="text-white rounded-xl p-6 space-y-3">
            
           <div className="h-100vh w-full  rounded-lg border-2 border-black shadow-xl">
            <p className="p-3 text-2xl text-center text-black font-bold">police Emergency hotline</p>
            <p className="text-center pb-3 text-black text-2xl">100/101</p>
           </div>

          <div className="h-100vh w-full  rounded-lg border-2 border-black shadow-xl">
            <p className="p-3 text-2xl text-center text-black font-bold">Ambulance</p>
            <p className="text-center pb-3 text-black text-2xl">9873637221</p>
           </div>


           <div className="h-100vh w-full   rounded-lg border-2 border-black shadow-xl">
            <p className="p-3 text-2xl text-center text-black font-bold">Fire Brigade</p>
            <p className="text-center pb-3 text-black text-2xl">9836243541</p>
           </div>
           

           <div className="h-100vh w-full  rounded-lg border-2 border-black shadow-xl">
            <p className="p-3 text-2xl text-center text-black font-bold">Rescue Teams</p>
            <p className="text-center pb-3 text-black text-2xl">9812876543</p>
           </div>
           
            <div className="text-black">
              <p>If you have any queries, feel free to contact us via email or phone.</p>
              <p>Email: Thedisasterrrelief@gmail.com</p>
              <p>Phone: +977 9813456782</p>
            </div>
            
          </div>


        </div>
      </div>
      
  <Footer />
    </div>
  );
};

export default Contact;