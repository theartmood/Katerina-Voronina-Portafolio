export type Language = 'en' | 'es' | 'ru';

export interface Translations {
    // Header
    portfolioYear: string;
    
    // Home Page
    heroSubtitle: string;
    heroTitle1: string;
    heroTitle2: string;
    heroTitle3: string;
    section1Title: string;
    section2Title: string;
    seeProjects: string;
    
    // Designing Page
    designingSubtitle: string;
    designingTitle: string;
    designingDescription: string;
    
    // Drawings Page
    drawingsSubtitle: string;
    drawingsTitle: string;
    drawingsDescription: string;
    
    // Contact CTA
    ctaBadge: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButton: string;
    
    // Contact Page
    contactBadge: string;
    contactTitle: string;
    contactDescription: string;
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    messageLabel: string;
    sendButton: string;
    sending: string;
    successTitle: string;
    successMessage: string;
    orReachOut: string;
    
    // Footer
    footerCopyright: string;
    footerCredit: string;
    
    // Projects
    caseStudy: string;
    viewProject: string;
    noProjects: string;
    gallery: string;
}

export const translations: Record<Language, Translations> = {
    en: {
        portfolioYear: "Portfolio '25",
        
        heroSubtitle: 'Digital Artisan',
        heroTitle1: 'Crafting digital',
        heroTitle2: 'silence',
        heroTitle3: '& substance.',
        section1Title: 'Designing Human Interfaces',
        section2Title: 'Drawings',
        seeProjects: 'See Projects',
        
        designingSubtitle: 'Interface Design',
        designingTitle: 'Designing Human Interfaces',
        designingDescription: 'Creating digital experiences that balance functionality with aesthetic restraint. Each interface is crafted with intention, focusing on clarity, elegance, and human connection.',
        
        drawingsSubtitle: 'Artistic Exploration',
        drawingsTitle: 'Drawings',
        drawingsDescription: 'A collection of artistic explorations across various mediums. Each piece represents a moment of creative expression, capturing emotion, texture, and form.',
        
        ctaBadge: "Let's Collaborate",
        ctaTitle: "Let's Create Excellence",
        ctaDescription: 'Transform your vision into reality with premium design solutions.',
        ctaButton: 'Get in Touch',
        
        contactBadge: "Let's Connect",
        contactTitle: 'Start a Conversation',
        contactDescription: "Have a project in mind? Let's discuss how we can create something extraordinary together.",
        nameLabel: 'Name',
        emailLabel: 'Email',
        subjectLabel: 'Subject',
        messageLabel: 'Message',
        sendButton: 'Send Message',
        sending: 'Sending...',
        successTitle: 'Message Sent!',
        successMessage: "I'll get back to you shortly",
        orReachOut: 'Or reach out directly',
        
        footerCopyright: '© 2025 Katerina Voronina',
        footerCredit: 'BY ALIA STUDIO',
        
        caseStudy: 'Case Study',
        viewProject: 'View Project',
        noProjects: 'No projects yet. Add some from the admin panel!',
        gallery: 'Gallery',
    },
    es: {
        portfolioYear: "Portafolio '25",
        
        heroSubtitle: 'Artesana Digital',
        heroTitle1: 'Creando',
        heroTitle2: 'silencio',
        heroTitle3: 'y sustancia digital.',
        section1Title: 'Diseñando Interfaces Humanas',
        section2Title: 'Dibujos',
        seeProjects: 'Ver Proyectos',
        
        designingSubtitle: 'Diseño de Interfaces',
        designingTitle: 'Diseñando Interfaces Humanas',
        designingDescription: 'Creando experiencias digitales que equilibran funcionalidad con restricción estética. Cada interfaz se elabora con intención, enfocándose en claridad, elegancia y conexión humana.',
        
        drawingsSubtitle: 'Exploración Artística',
        drawingsTitle: 'Dibujos',
        drawingsDescription: 'Una colección de exploraciones artísticas a través de varios medios. Cada pieza representa un momento de expresión creativa, capturando emoción, textura y forma.',
        
        ctaBadge: 'Colaboremos',
        ctaTitle: 'Creemos Excelencia',
        ctaDescription: 'Transforma tu visión en realidad con soluciones de diseño premium.',
        ctaButton: 'Contactar',
        
        contactBadge: 'Conectemos',
        contactTitle: 'Iniciemos una Conversación',
        contactDescription: '¿Tienes un proyecto en mente? Discutamos cómo podemos crear algo extraordinario juntos.',
        nameLabel: 'Nombre',
        emailLabel: 'Correo',
        subjectLabel: 'Asunto',
        messageLabel: 'Mensaje',
        sendButton: 'Enviar Mensaje',
        sending: 'Enviando...',
        successTitle: '¡Mensaje Enviado!',
        successMessage: 'Te responderé pronto',
        orReachOut: 'O contáctame directamente',
        
        footerCopyright: '© 2025 Katerina Voronina',
        footerCredit: 'POR ALIA STUDIO',
        
        caseStudy: 'Caso de Estudio',
        viewProject: 'Ver Proyecto',
        noProjects: '¡Aún no hay proyectos. Agrega algunos desde el panel de administración!',
        gallery: 'Galería',
    },
    ru: {
        portfolioYear: "Портфолио '25",
        
        heroSubtitle: 'Цифровой Мастер',
        heroTitle1: 'Создавая цифровую',
        heroTitle2: 'тишину',
        heroTitle3: 'и сущность.',
        section1Title: 'Дизайн Человеческих Интерфейсов',
        section2Title: 'Рисунки',
        seeProjects: 'Смотреть Проекты',
        
        designingSubtitle: 'Дизайн Интерфейсов',
        designingTitle: 'Дизайн Человеческих Интерфейсов',
        designingDescription: 'Создание цифровых впечатлений, балансирующих функциональность с эстетической сдержанностью. Каждый интерфейс создан с намерением, фокусируясь на ясности, элегантности и человеческой связи.',
        
        drawingsSubtitle: 'Художественное Исследование',
        drawingsTitle: 'Рисунки',
        drawingsDescription: 'Коллекция художественных исследований в различных техниках. Каждая работа представляет момент творческого самовыражения, захватывая эмоции, текстуру и форму.',
        
        ctaBadge: 'Давайте Сотрудничать',
        ctaTitle: 'Создадим Совершенство',
        ctaDescription: 'Превратите ваше видение в реальность с премиальными дизайн-решениями.',
        ctaButton: 'Связаться',
        
        contactBadge: 'Давайте Свяжемся',
        contactTitle: 'Начнем Разговор',
        contactDescription: 'Есть проект в голове? Давайте обсудим, как мы можем создать что-то экстраординарное вместе.',
        nameLabel: 'Имя',
        emailLabel: 'Email',
        subjectLabel: 'Тема',
        messageLabel: 'Сообщение',
        sendButton: 'Отправить',
        sending: 'Отправка...',
        successTitle: 'Сообщение Отправлено!',
        successMessage: 'Я свяжусь с вами в ближайшее время',
        orReachOut: 'Или свяжитесь напрямую',
        
        footerCopyright: '© 2025 Катерина Воронина',
        footerCredit: 'ОТ ALIA STUDIO',
        
        caseStudy: 'Кейс',
        viewProject: 'Посмотреть Проект',
        noProjects: 'Пока нет проектов. Добавьте их из панели администратора!',
        gallery: 'Галерея',
    },
};

