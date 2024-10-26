import emailjs from '@emailjs/browser';
import DOMPurify from 'dompurify';
import React, { useState, useEffect, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { FaDiscord, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

import { ResponsiveUtils } from '@/utils/responsiveUtils.js';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_API_KEY;
const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const MAX_MESSAGE_LENGTH = 5000;

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [captchaToken, setCaptchaToken] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [captchaScale, setCaptchaScale] = useState(1);
    const formRef = useRef(null);
    const connectRef = useRef(null);
    const recaptchaRef = useRef(null);


    useEffect(() => {
        const updateScale = () => {
            ResponsiveUtils.updateRootFontSize();
            const { scale } = ResponsiveUtils.getScalingFactor();
            setCaptchaScale(scale);
        };

        updateScale();
        window.addEventListener('resize', updateScale);

        return () => window.removeEventListener('resize', updateScale);
    }, []);


    const sanitizeInput = (input) => {
        return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
    };

    const handleChange = (e) => {
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

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!re.test(email)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (emailError) {
            alert('Please correct the email address before sending');
            return;
        }

        if (!captchaToken) {
            alert('Please complete the CAPTCHA');
            return;
        }

        const sanitizedData = {
            name: sanitizeInput(formData.name),
            email: sanitizeInput(formData.email),
            message: sanitizeInput(formData.message),
        };

        emailjs.send(serviceId, templateId, { ...sanitizedData, 'g-recaptcha-response': captchaToken }, publicKey)
            .then(() => {
                alert('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
                setCaptchaToken(null);
                recaptchaRef.current.reset();
            }, () => {
                alert('Failed to send the message. Please try again.');
            });
    };

    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center p-4"
             style={{fontSize: 'var(--root-font-size, 16px)'}}>
            <div ref={formRef}
                 className="w-full max-w-4xl bg-black bg-opacity-40 rounded-lg backdrop-filter backdrop-blur-sm shadow-lg p-6 mb-8">
                <h1 className="text-4xl font-bold mb-6 text-white text-center">Contact Me</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-1 text-white text-xl">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 bg-gray-800 rounded text-white text-xl"
                            maxLength="100"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1 text-white text-xl">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 bg-gray-800 rounded text-white text-xl"
                            maxLength="100"
                        />
                        {emailError && <p className="text-red-500 text-base mt-1">{emailError}</p>}
                    </div>
                    <div>
                        <label htmlFor="message" className="block mb-1 text-white text-xl">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full p-2 bg-gray-800 rounded text-white resize-y text-xl"
                            style={{minHeight: '10rem', maxHeight: '20rem'}}
                            maxLength={MAX_MESSAGE_LENGTH}
                        ></textarea>
                        <div className="text-right text-base text-gray-400">
                            {formData.message.length}/{MAX_MESSAGE_LENGTH}
                        </div>
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                        <div className="flex justify-center" style={{
                            transform: `scale(${captchaScale})`,
                            transformOrigin: 'center',
                            marginBottom: `${20 * (captchaScale - 1)}px`
                        }}>
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={recaptchaSiteKey}
                                onChange={handleCaptchaChange}
                                size="normal"
                            />
                        </div>
                        <button type="submit"
                                className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded text-white text-xl">
                            Send Message
                        </button>
                    </div>
                </form>
            </div>

            <div ref={connectRef} className="text-center text-white mt-4">
                <h2 className="text-3xl font-bold mb-4">Connect with me</h2>
                <div className="flex justify-center space-x-6">
                    <a href="https://discord.gg/your-discord" target="_blank" rel="noopener noreferrer"
                       className="text-5xl hover:text-blue-400"><FaDiscord/></a>
                    <a href="https://www.linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer"
                       className="text-5xl hover:text-blue-600"><FaLinkedin/></a>
                    <a href="https://github.com/RavenLorr" target="_blank" rel="noopener noreferrer"
                       className="text-5xl hover:text-gray-400"><FaGithub/></a>
                    <a href="https://www.instagram.com/your-instagram" target="_blank" rel="noopener noreferrer"
                       className="text-5xl hover:text-pink-500"><FaInstagram/></a>
                </div>
            </div>
        </div>
    );
}

export default Contact;