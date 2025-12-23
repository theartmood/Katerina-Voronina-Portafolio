'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PremiumInput } from '@/components/ui/PremiumInput';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { SPRING_TRANSITION } from '@/lib/data/projects';

export default function ContactPage() {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');
        setErrorMessage('');

        try {
            // URL hardcodeada de SheetDB
            const sheetDbUrl = 'https://sheetdb.io/api/v1/ezqlumxug5dnn';
            
            // SheetDB requiere que los nombres de las propiedades coincidan EXACTAMENTE con los nombres de las columnas en Google Sheets
            // IMPORTANTE: Los nombres deben coincidir exactamente: "Name", "Email", "Subject", "Message" (con mayúsculas)
            const payload = {
                Name: formData.name,
                Email: formData.email,
                Subject: formData.subject,
                Message: formData.message
            };

            console.log('📤 Enviando a SheetDB:', {
                url: sheetDbUrl,
                payload: payload,
                '⚠️ IMPORTANTE': 'Verifica que los nombres de las columnas en Google Sheets sean exactamente: Name, Email, Subject, Message'
            });

            const response = await fetch(sheetDbUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            // Intentar leer la respuesta como texto primero para mejor debugging
            const responseText = await response.text();
            let responseData;
            
            try {
                responseData = JSON.parse(responseText);
            } catch (e) {
                responseData = { raw: responseText, parseError: e.message };
            }
            
            console.log('📥 Respuesta de SheetDB:', {
                status: response.status,
                statusText: response.statusText,
                ok: response.ok,
                data: responseData
            });
            
            if (!response.ok) {
                console.error('❌ SheetDB error response:', {
                    status: response.status,
                    statusText: response.statusText,
                    data: responseData,
                    payload: payload,
                    '💡 SOLUCIÓN': 'Verifica que los nombres de las columnas en Google Sheets coincidan exactamente con: Name, Email, Subject, Message (con mayúsculas)'
                });
                throw new Error(`SheetDB request failed: ${response.status} ${response.statusText}. Response: ${JSON.stringify(responseData)}`);
            }

            console.log('✅ SheetDB success:', responseData);

            // Éxito con SheetDB
            setFormState('success');
            
            // Reset form after success
            setTimeout(() => {
                setFormState('idle');
                setFormData({ name: '', email: '', subject: '', message: '' });
            }, 3000);
        } catch (error) {
            console.error('Error sending message:', error);
            setFormState('error');
            setErrorMessage('Failed to send message. Please try again or contact directly via email: ekater.voronina@gmail.com');
            
            // Reset error state after 5 seconds
            setTimeout(() => {
                setFormState('idle');
            }, 5000);
        }
    };

    return (
        <>
            <Container className="pt-40 md:pt-60 pb-20">
                <section className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={SPRING_TRANSITION}
                        className="text-center mb-20"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amethyst-dark/20 to-indigo-600/20 border border-amethyst-dark/30 mb-8"
                        >
                            <Sparkles size={16} className="text-amethyst-dark" />
                            <span className="font-sans text-xs tracking-[0.3em] uppercase text-amethyst-dark">
                                Let&apos;s Connect
                            </span>
                        </motion.div>

                        <h1 className="font-serif text-5xl md:text-7xl text-platinum italic mb-6">
                            Start a Conversation
                        </h1>
                        <p className="font-sans text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
                            Have a project in mind? Let&apos;s discuss how we can create something extraordinary together.
                        </p>
                    </motion.div>

                    {/* Premium Form Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, ...SPRING_TRANSITION }}
                        className="relative"
                    >
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-amethyst-dark to-indigo-600 rounded-2xl blur-2xl opacity-20" />

                        {/* Form container */}
                        <div className="relative bg-void/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Name & Email Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <PremiumInput
                                        label="Name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(value) => setFormData({ ...formData, name: value })}
                                    />
                                    <PremiumInput
                                        label="Email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(value) => setFormData({ ...formData, email: value })}
                                    />
                                </div>

                                {/* Subject */}
                                <PremiumInput
                                    label="Subject"
                                    type="text"
                                    required
                                    value={formData.subject}
                                    onChange={(value) => setFormData({ ...formData, subject: value })}
                                />

                                {/* Message */}
                                <PremiumInput
                                    label="Message"
                                    type="textarea"
                                    required
                                    value={formData.message}
                                    onChange={(value) => setFormData({ ...formData, message: value })}
                                />

                                {/* Error Message */}
                                {formState === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                                    >
                                        <p className="text-red-400 text-sm text-center">{errorMessage}</p>
                                    </motion.div>
                                )}

                                {/* Submit Button */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="pt-4 flex justify-center"
                                >
                                    <PremiumButton type="submit" disabled={formState === 'submitting'}>
                                        {formState === 'submitting' ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                >
                                                    <Sparkles size={16} />
                                                </motion.div>
                                                Sending...
                                            </>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </PremiumButton>
                                </motion.div>
                            </form>

                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-amethyst-dark/10 rounded-full blur-3xl -z-10" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -z-10" />
                        </div>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-20 text-center"
                    >
                        <p className="font-sans text-sm text-white/40 mb-4">Or reach out directly</p>
                        <a
                            href="mailto:ekater.voronina@gmail.com"
                            className="font-serif text-xl text-platinum hover:text-white transition-colors"
                        >
                            ekater.voronina@gmail.com
                        </a>
                    </motion.div>
                </section>
            </Container>

            {/* Success Animation */}
            <AnimatePresence>
                {formState === 'success' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-[100] bg-void/95 backdrop-blur-xl flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            className="text-center relative"
                        >
                            {/* Success Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-amethyst-dark to-indigo-600 flex items-center justify-center"
                            >
                                <motion.div
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                >
                                    <svg
                                        width="48"
                                        height="48"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <motion.path
                                            d="M20 6L9 17l-5-5"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ delay: 0.5, duration: 0.5 }}
                                        />
                                    </svg>
                                </motion.div>
                            </motion.div>

                            <h2 className="font-serif text-5xl md:text-6xl text-platinum italic mb-4">
                                Message Sent!
                            </h2>
                            <p className="font-sans text-white/50 tracking-[0.2em] uppercase text-sm">
                                I&apos;ll get back to you shortly
                            </p>

                            {/* Sparkles */}
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{
                                        scale: [0, 1, 0],
                                        opacity: [0, 1, 0],
                                        x: Math.cos((i * Math.PI * 2) / 6) * 100,
                                        y: Math.sin((i * Math.PI * 2) / 6) * 100,
                                    }}
                                    transition={{ delay: 0.6 + i * 0.1, duration: 1 }}
                                    className="absolute top-1/2 left-1/2 w-2 h-2 bg-amethyst-dark rounded-full"
                                />
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
