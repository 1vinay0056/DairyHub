import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

import api from "../../services/api";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  try {
    setLoading(true);

    await api.post("/contact", formData);

    alert("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

  } catch (error: any) {

    alert(
      error?.response?.data?.detail ||
      "Unable to send message."
    );

  } finally {
    setLoading(false);
  }
};
  return (
    <section className="min-h-screen bg-gray-50 py-10">

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mb-10 text-center">

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

            CONTACT US

          </span>

          <h1 className="mt-5 text-5xl font-bold text-gray-900">

            We'd Love To Hear From You

          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">

            Have questions about our dairy products,
            subscriptions, deliveries or partnerships?
            Our DairyHub support team is available to
            help you.

          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}

<div className="rounded-2xl bg-white p-6 shadow-lg">

  <h2 className="mb-6 text-2xl font-bold text-gray-900">
    Send us a Message
  </h2>

  <form
    onSubmit={handleSubmit}
    className="space-y-5"
  >

    {/* Full Name */}

    <div>

      <label className="mb-2 block text-sm font-semibold text-gray-700">
        Full Name
      </label>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your full name"
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600"
      />

    </div>

    {/* Email */}

    <div>

      <label className="mb-2 block text-sm font-semibold text-gray-700">
        Email Address
      </label>

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600"
      />

    </div>

    {/* Phone */}

    <div>

      <label className="mb-2 block text-sm font-semibold text-gray-700">
        Phone Number
      </label>

      <input
        type="tel"
        name="phone"
        maxLength={10}
        value={formData.phone}
        onChange={handleChange}
        placeholder="Enter your mobile number"
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600"
      />

    </div>

    {/* Subject */}

    <div>

      <label className="mb-2 block text-sm font-semibold text-gray-700">
        Subject
      </label>

      <input
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Enter subject"
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600"
      />

    </div>

    {/* Message */}

    <div>

      <label className="mb-2 block text-sm font-semibold text-gray-700">
        Message
      </label>

      <textarea
        rows={5}
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Write your message..."
        className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600"
      />

    </div>

    {/* Button */}

    <button
      type="submit"
      disabled={loading}
      className="flex w-full items-center justify-center gap-3 rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
    >

      {loading ? (

        <>
          Sending...
        </>

      ) : (

        <>
          <Send size={18} />
          Send Message
        </>

      )}

    </button>

  </form>

</div>
{/* Contact Details */}

<div className="space-y-5">

  {/* Office */}

  <div className="rounded-2xl bg-white p-6 shadow-lg">

    <div className="flex items-start gap-4">

      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">

        <MapPin
          size={22}
          className="text-green-600"
        />

      </div>

      <div>

        <h3 className="text-lg font-bold">
          Office Address
        </h3>

        <p className="mt-2 leading-7 text-gray-600">

          DairyHub Pvt. Ltd.
          <br />
          Sector 62, Noida
          <br />
          Uttar Pradesh - 201309
          <br />
          India

        </p>

      </div>

    </div>

  </div>

  {/* Phone */}

  <div className="rounded-2xl bg-white p-6 shadow-lg">

    <div className="flex items-center gap-4">

      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">

        <Phone
          size={22}
          className="text-green-600"
        />

      </div>

      <div>

        <h3 className="font-bold">
          Phone Number
        </h3>

        <a
          href="tel:+919876543210"
          className="mt-1 block text-gray-600 hover:text-green-600"
        >
          +91 98765 43210
        </a>

      </div>

    </div>

  </div>

  {/* Email */}

  <div className="rounded-2xl bg-white p-6 shadow-lg">

    <div className="flex items-center gap-4">

      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">

        <Mail
          size={22}
          className="text-green-600"
        />

      </div>

      <div>

        <h3 className="font-bold">
          Email Address
        </h3>

        <a
          href="mailto:support@dairyhub.com"
          className="mt-1 block text-gray-600 hover:text-green-600"
        >
          support@dairyhub.com
        </a>

      </div>

    </div>

  </div>

  {/* Working Hours */}

  <div className="rounded-2xl bg-white p-6 shadow-lg">

    <div className="flex items-center gap-4">

      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">

        <Clock
          size={22}
          className="text-green-600"
        />

      </div>

      <div>

        <h3 className="font-bold">
          Working Hours
        </h3>

        <p className="mt-1 text-gray-600">
          Monday - Saturday
        </p>

        <p className="text-gray-600">
          9:00 AM - 7:00 PM
        </p>

      </div>

    </div>

  </div>

  {/* WhatsApp */}

  <a
    href="https://wa.me/919876543210"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-3 rounded-2xl bg-green-600 p-4 font-semibold text-white transition hover:bg-green-700"
  >

    <FaWhatsapp size={24} />

    Chat on WhatsApp

  </a>

  {/* Social Media */}

  <div className="rounded-2xl bg-white p-6 shadow-lg">

    <h3 className="mb-5 text-lg font-bold">
      Follow Us
    </h3>

    <div className="flex flex-wrap gap-4">

      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white transition hover:scale-110"
      >
        <FaFacebookF />
      </a>

      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-600 text-white transition hover:scale-110"
      >
        <FaInstagram />
      </a>

      <a
        href="https://x.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition hover:scale-110"
      >
        <FaXTwitter />
      </a>

      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-700 text-white transition hover:scale-110"
      >
        <FaLinkedinIn />
      </a>

      <a
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white transition hover:scale-110"
      >
        <FaYoutube />
      </a>

    </div>

  </div>
    {/* Google Map */}

  <div className="rounded-2xl bg-white p-6 shadow-lg">

    <h3 className="mb-4 text-lg font-bold">
      Find Us on Map
    </h3>

    <iframe
      title="DairyHub Location"
      src="https://www.google.com/maps?q=Sector+62+Noida&output=embed"
      width="100%"
      height="250"
      loading="lazy"
      className="rounded-xl border-0"
    ></iframe>

  </div>

</div>

        </div>

      </div>

    </section>
  );
}