import emailjs from '@emailjs/browser';
import DOMPurify from 'dompurify';
import React, { useState, useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { FaDiscord, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

import { useLanguage } from '@/context/LanguageContext.jsx';
import { contactData } from '@/data/contactData.js';
import { ResponsiveUtils } from '@/utils/responsiveUtils.js';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_API_KEY;
const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const MAX_MESSAGE_LENGTH = 5000;

function generateNonce() {
  // eslint-disable-next-line no-undef
  return crypto.randomUUID();
}

function Contact() {
  const { language } = useLanguage();
  const data = contactData[language];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [captchaScale, setCaptchaScale] = useState(1);

  const [isMobile, setIsMobile] = useState(false);
  const [scalingFactor, setScalingFactor] = useState(1);

  const formRef = useRef(null);
  const connectRef = useRef(null);
  const recaptchaRef = useRef(null);

  useEffect(() => {
    let recaptchaScript = null;

    const loadRecaptcha = () => {
      recaptchaScript = document.createElement('script');
      recaptchaScript.src = 'https://www.google.com/recaptcha/api.js';
      recaptchaScript.async = true;
      recaptchaScript.defer = true;
      const nonce = generateNonce();
      recaptchaScript.setAttribute('nonce', nonce);
      document.head.appendChild(recaptchaScript);
    };

    const updateResponsiveness = () => {
      ResponsiveUtils.updateRootFontSize();
      const { scale } = ResponsiveUtils.getScalingFactor();
      setCaptchaScale(scale);
      setScalingFactor(scale);
      setIsMobile(window.innerWidth < 768);
    };

    loadRecaptcha();
    updateResponsiveness();
    window.addEventListener('resize', updateResponsiveness);

    return () => {
      window.removeEventListener('resize', updateResponsiveness);
      if (recaptchaScript && recaptchaScript.parentNode) {
        recaptchaScript.parentNode.removeChild(recaptchaScript);
      }
    };
  }, []);

  const sanitizeInput = input => {
    return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > MAX_MESSAGE_LENGTH) {
      return;
    }
    const sanitizedValue = sanitizeInput(value);
    setFormData({ ...formData, [name]: sanitizedValue });

    if (name === 'email') {
      validateEmail(sanitizedValue);
    }
  };

  const validateEmail = email => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!re.test(email)) {
      setEmailError(data.emailError);
    } else {
      setEmailError('');
    }
  };

  const handleCaptchaChange = token => {
    setCaptchaToken(token);
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

    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      message: sanitizeInput(formData.message),
    };

    emailjs
      .send(
        serviceId,
        templateId,
        { ...sanitizedData, 'g-recaptcha-response': captchaToken },
        publicKey
      )
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
    <div
      className="relative min-h-screen flex flex-col justify-center items-center"
      style={{ fontSize: 'var(--root-font-size, 16px)', padding: `${40 * scalingFactor}px`, }}
    >
      <motion.div
        ref={formRef}
        className={`w-full ${isMobile ? 'max-w-sm' : 'max-w-6xl'} bg-black bg-opacity-40 rounded-lg backdrop-filter backdrop-blur-sm shadow-lg p-6 mb-8`}
        style={{ width: isMobile ? '100%' : `${Math.min(80, 100 * scalingFactor)}%` }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl font-bold mb-6 text-white text-center"
          style={{ fontSize: `${32 * scalingFactor}px` }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {data.title}
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-white text-xl"
              style={{ fontSize: `${20 * scalingFactor}px` }}
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
              style={{ fontSize: `${20 * scalingFactor}px`, padding: `${8 * scalingFactor}px` }}
              maxLength="100"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-white text-xl"
              style={{ fontSize: `${20 * scalingFactor}px` }}
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
              style={{ fontSize: `${20 * scalingFactor}px`, padding: `${8 * scalingFactor}px` }}
              maxLength="100"
            />
            {emailError && (
              <p
                className="text-red-500 text-base mt-1"
                style={{ fontSize: `${16 * scalingFactor}px` }}
              >
                {emailError}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-1 text-white text-xl"
              style={{ fontSize: `${20 * scalingFactor}px` }}
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
                minHeight: `${160 * scalingFactor}px`,
                maxHeight: `${320 * scalingFactor}px`,
                fontSize: `${20 * scalingFactor}px`,
                padding: `${8 * scalingFactor}px`,
              }}
              maxLength={MAX_MESSAGE_LENGTH}
            ></textarea>
            <div
              className="text-right text-base text-gray-400"
              style={{ fontSize: `${16 * scalingFactor}px` }}
            >
              {formData.message.length}/{MAX_MESSAGE_LENGTH}
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div
              className="flex justify-center"
              style={{
                transform: `scale(${captchaScale})`,
                transformOrigin: 'center',
                marginBottom: `${20 * (captchaScale - 1)}px`,
              }}
            >
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={recaptchaSiteKey}
                onChange={handleCaptchaChange}
                size="normal"
                theme="light"
                hl="en"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded text-white text-xl"
              style={{ fontSize: `${20 * scalingFactor}px`, padding: `${12 * scalingFactor}px` }}
            >
              {data.sendButton}
            </button>
          </div>
        </form>
      </motion.div>

      <motion.div
        ref={connectRef}
        className="text-center text-white mt-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4" style={{ fontSize: `${30 * scalingFactor}px` }}>
          {data.connectTitle}
        </h2>
        <div className="flex justify-center space-x-6">
          <a
            href="https://dsc.bio/ravenlorr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-5xl hover:text-blue-400"
            style={{ fontSize: `${48 * scalingFactor}px` }}
          >
            <FaDiscord />
          </a>
          <a
            href="https://www.linkedin.com/in/3tiennefortier/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-5xl hover:text-blue-600"
            style={{ fontSize: `${48 * scalingFactor}px` }}
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/RavenLorr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-5xl hover:text-gray-400"
            style={{ fontSize: `${48 * scalingFactor}px` }}
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/etiennef03/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-5xl hover:text-pink-500"
            style={{ fontSize: `${48 * scalingFactor}px` }}
          >
            <FaInstagram />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default Contact;