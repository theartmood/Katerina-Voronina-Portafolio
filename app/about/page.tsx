import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
    title: 'About',
    description: 'Learn more about Katerina Voronina - Digital designer and artist.',
};

export default function AboutPage() {
    return (
        <Container className="pt-40 md:pt-60 pb-20">
            <div className="max-w-4xl">
                <h1 className="font-serif text-5xl md:text-7xl text-platinum mb-12">About</h1>

                <div className="space-y-8 font-sans text-lg text-white/60 leading-relaxed">
                    <p>
                        I&apos;m Katerina Voronina, a digital designer focused on creating interfaces that balance
                        functionality with aesthetic restraint. My work explores the intersection of technology and
                        human experience.
                    </p>

                    <p>
                        With a background in both interface design and traditional art, I bring a unique perspective
                        to digital products. I believe in the power of whitespace, intentional typography, and
                        thoughtful interaction design.
                    </p>

                    <p>
                        When I&apos;m not designing interfaces, you&apos;ll find me sketching, exploring new mediums, or
                        studying the subtle details that make great design feel effortless.
                    </p>
                </div>

                <div className="mt-20 pt-20 border-t border-white/10">
                    <h2 className="font-serif text-3xl md:text-4xl text-platinum mb-8 italic">Experience</h2>
                    <div className="space-y-12">
                        {[
                            {
                                year: '2024',
                                role: 'Senior Product Designer',
                                company: 'Chronos Banking',
                                description: 'Leading design for next-generation fintech experiences.',
                            },
                            {
                                year: '2022-2023',
                                role: 'UI/UX Designer',
                                company: 'Aura Health',
                                description: 'Designed biometric monitoring dashboards for healthcare professionals.',
                            },
                            {
                                year: '2020-2022',
                                role: 'Digital Designer',
                                company: 'Velvet E-Comm',
                                description: 'Created luxury e-commerce experiences for high-end fashion brands.',
                            },
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-6">
                                <div className="md:w-32 flex-shrink-0">
                                    <span className="font-sans text-sm text-white/40 tracking-wider">{item.year}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-serif text-2xl text-platinum mb-2">{item.role}</h3>
                                    <p className="font-sans text-white/50 mb-3">{item.company}</p>
                                    <p className="font-sans text-white/40">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 pt-20 border-t border-white/10">
                    <h2 className="font-serif text-3xl md:text-4xl text-platinum mb-8 italic">Skills</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {[
                            'Interface Design',
                            'User Experience',
                            'Visual Design',
                            'Prototyping',
                            'Design Systems',
                            'Illustration',
                            'Typography',
                            'Motion Design',
                            'Figma',
                        ].map((skill) => (
                            <div
                                key={skill}
                                className="px-6 py-4 border border-white/10 rounded-sm text-center font-sans text-sm text-white/60 hover:border-white/30 hover:text-white transition-all"
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
}
