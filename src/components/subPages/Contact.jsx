import React, { useState, useEffect, useRef } from 'react';
import { FaDiscord, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_API_KEY;

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const formRef = useRef(null);
    const connectRef = useRef(null);

    useEffect(() => {
        const adjustFormHeight = () => {
            if (formRef.current && connectRef.current) {
                const formBottom = formRef.current.getBoundingClientRect().bottom;
                const connectTop = connectRef.current.getBoundingClientRect().top;
                if (formBottom > connectTop) {
                    formRef.current.style.maxHeight = `${connectTop - formRef.current.offsetTop - 20}px`;
                }
            }
        };

        adjustFormHeight();
        window.addEventListener('resize', adjustFormHeight);
        return () => window.removeEventListener('resize', adjustFormHeight);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.send(serviceId, templateId, formData, publicKey)
            .then(() => {
                alert('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            }, () => {
                alert('Failed to send message. Please try again.');
            });
    };

    return (
        <div className="relative min-h-screen flex flex-col">
            <div className="flex-grow flex items-center justify-center">
                <div ref={formRef} className="w-30p max-w-full flex flex-col justify-center items-center overflow-auto mx-auto">
                    <div className="w-full p-8 bg-black bg-opacity-40 rounded-lg backdrop-filter backdrop-blur-sm shadow-lg">
                        <h1 className="text-4xl font-bold mb-6 text-white">Contact Me</h1>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block mb-1 text-white">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 bg-gray-800 rounded text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-1 text-white">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 bg-gray-800 rounded text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block mb-1 text-white">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 bg-gray-800 rounded text-white resize-y"
                                    style={{minHeight: '8rem', maxHeight: '16rem'}}
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded text-white">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div ref={connectRef} className="text-center text-white mt-8 pb-8">
                <h2 className="text-2xl font-bold mb-4">Connect with me</h2>
                <div className="flex justify-center space-x-6">
                    <a href="https://discord.gg/your-discord" target="_blank" rel="noopener noreferrer"
                       className="text-4xl hover:text-blue-400"><FaDiscord/></a>
                    <a href="https://www.linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer"
                       className="text-4xl hover:text-blue-600"><FaLinkedin/></a>
                    <a href="https://github.com/RavenLorr" target="_blank" rel="noopener noreferrer"
                       className="text-4xl hover:text-gray-400"><FaGithub/></a>
                    <a href="https://www.instagram.com/your-instagram" target="_blank" rel="noopener noreferrer"
                       className="text-4xl hover:text-pink-500"><FaInstagram/></a>
                </div>
            </div>
        </div>
    );
}

export default Contact;