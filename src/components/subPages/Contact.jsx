import emailjs from '@emailjs/browser';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';
import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { FaDiscord, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

import { useLanguage } from '@/context/LanguageContext.jsx';
import { usePageBuilder } from '@/context/PageBuilderContext.jsx';
import { contactData } from '@/data/contactData.js';

const MAX_MESSAGE_LENGTH = 5000;
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_API_KEY;
const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

function ContactContent({ scale }) {
  const { language } = useLanguage();
  const data = contactData[language];
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [emailError, setEmailError] = useState('');
  const recaptchaRef = useRef(null);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > MAX_MESSAGE_LENGTH) return;
    const sanitizedValue = DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
    setFormData({ ...formData, [name]: sanitizedValue });
    if (name === 'email') validateEmail(sanitizedValue);
  };

  const validateEmail = email => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmailError(re.test(email) ? '' : data.emailError);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (emailError) {
      alert(data.emailAlert);
      return;
    }
    if (!captchaToken) {
      alert(data.captchaAlert);
      return;
    }
    emailjs
      .send(serviceId, templateId, { ...formData, 'g-recaptcha-response': captchaToken }, publicKey)
      .then(
        () => {
          alert(data.successMessage);
          setFormData({ name: '', email: '', message: '' });
          setCaptchaToken(null);
          recaptchaRef.current.reset();
        },
        () => {
          alert(data.errorMessage);
        }
      );
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="w-full max-w-6xl bg-black bg-opacity-40 overflow-hidden rounded-lg backdrop-filter backdrop-blur-sm shadow-lg p-6 mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-white text-xl"
              style={{ fontSize: `${20 * scale}px` }}
            >
              {data.nameLabel}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-800 rounded text-white text-xl"
              style={{ fontSize: `${20 * scale}px`, padding: `${8 * scale}px` }}
              maxLength="100"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-white text-xl"
              style={{ fontSize: `${20 * scale}px` }}
            >
              {data.emailLabel}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-800 rounded text-white text-xl"
              style={{ fontSize: `${20 * scale}px`, padding: `${8 * scale}px` }}
              maxLength="100"
            />
            {emailError && (
              <p className="text-red-500 text-base mt-1" style={{ fontSize: `${16 * scale}px` }}>
                {emailError}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-1 text-white text-xl"
              style={{ fontSize: `${20 * scale}px` }}
            >
              {data.messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-800 rounded text-white resize-y text-xl"
              style={{
                minHeight: `${160 * scale}px`,
                maxHeight: `${320 * scale}px`,
                fontSize: `${20 * scale}px`,
                padding: `${8 * scale}px`,
              }}
              maxLength={MAX_MESSAGE_LENGTH}
            ></textarea>
            <div
              className="text-right text-base text-gray-400"
              style={{ fontSize: `${16 * scale}px` }}
            >
              {formData.message.length}/{MAX_MESSAGE_LENGTH}
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div
              className="flex justify-center"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'center',
                marginBottom: `${20 * (scale - 1)}px`,
              }}
            >
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={recaptchaSiteKey}
                onChange={setCaptchaToken}
                size="normal"
                theme="light"
                hl="en"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded text-white text-xl"
              style={{ fontSize: `${20 * scale}px`, padding: `${12 * scale}px` }}
            >
              {data.sendButton}
            </button>
          </div>
        </form>
      </motion.div>
      <motion.div
        className="text-center text-white mt-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4" style={{ fontSize: `${30 * scale}px` }}>
          {data.connectTitle}
        </h2>
        <div className="flex justify-center space-x-6">
          <a
            href="https://dsc.bio/ravenlorr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-5xl hover:text-blue-400"
            style={{ fontSize: `${48 * scale}px` }}
          >
            <FaDiscord />
          </a>
          <a
            href="https://www.linkedin.com/in/3tiennefortier/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-5xl hover:text-blue-600"
            style={{ fontSize: `${48 * scale}px` }}
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/RavenLorr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-5xl hover:text-gray-400"
            style={{ fontSize: `${48 * scale}px` }}
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/etiennef03/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-5xl hover:text-pink-500"
            style={{ fontSize: `${48 * scale}px` }}
          >
            <FaInstagram />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

function Contact() {
  const pageBuilder = usePageBuilder();
  const { language } = useLanguage();
  const data = contactData[language];

  pageBuilder.setTitle(data.title);
  pageBuilder.setContent(ContactContent);
  pageBuilder.setMarginbottom(80);
  pageBuilder.setPadding(48);

  const BuilderComponent = pageBuilder.build();
  return <BuilderComponent />;
}

export default Contact;
