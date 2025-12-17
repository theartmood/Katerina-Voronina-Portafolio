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
    
    // Admin - Login
    adminLoginTitle: string;
    adminLoginSubtitle: string;
    adminUsername: string;
    adminPassword: string;
    adminLoginButton: string;
    adminLoggingIn: string;
    adminLoginError: string;
    
    // Admin - Dashboard
    adminTitle: string;
    adminSubtitle: string;
    adminNewProject: string;
    adminProjects: string;
    adminTotalProjects: string;
    adminTotalImages: string;
    adminFeatured: string;
    adminDesigning: string;
    adminViewSite: string;
    adminDevNotice: string;
    adminLogout: string;
    
    // Admin - Project List
    adminTitleColumn: string;
    adminCategoryColumn: string;
    adminYearColumn: string;
    adminImagesColumn: string;
    adminStatusColumn: string;
    adminActionsColumn: string;
    adminFeaturedBadge: string;
    adminViewAction: string;
    adminEditAction: string;
    adminDeleteAction: string;
    adminNoProjects: string;
    adminCreateFirst: string;
    adminDeleteConfirm: string;
    adminDeleteError: string;
    
    // Admin - Project Form
    adminBackToPanel: string;
    adminEditProject: string;
    adminNewProjectTitle: string;
    adminCreateProject: string;
    adminFormTitle: string;
    adminFormSlug: string;
    adminFormDescription: string;
    adminFormCategory: string;
    adminFormCategoryDesigning: string;
    adminFormCategoryDrawings: string;
    adminFormClient: string;
    adminFormYear: string;
    adminFormFeatured: string;
    adminFormOrder: string;
    adminFormImages: string;
    adminFormImageCount: string;
    adminFormUploadImages: string;
    adminFormSetCover: string;
    adminFormCoverSet: string;
    adminFormPending: string;
    adminFormSave: string;
    adminFormSaving: string;
    adminFormUpdate: string;
    adminFormCreate: string;
    adminFormCancel: string;
    adminFormError: string;
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
        
        adminLoginTitle: 'Admin Access',
        adminLoginSubtitle: 'Enter your credentials to continue',
        adminUsername: 'Username',
        adminPassword: 'Password',
        adminLoginButton: 'Sign In',
        adminLoggingIn: 'Signing in...',
        adminLoginError: 'Invalid credentials',
        
        adminTitle: 'Admin Panel',
        adminSubtitle: 'Manage your portfolio',
        adminNewProject: 'New Project',
        adminProjects: 'Projects',
        adminTotalProjects: 'Total Projects',
        adminTotalImages: 'Total Images',
        adminFeatured: 'Featured',
        adminDesigning: 'Designing',
        adminViewSite: 'View Site →',
        adminDevNotice: 'This panel is only available in development. For production, implement proper authentication.',
        adminLogout: 'Sign Out',
        
        adminTitleColumn: 'Title',
        adminCategoryColumn: 'Category',
        adminYearColumn: 'Year',
        adminImagesColumn: 'Images',
        adminStatusColumn: 'Status',
        adminActionsColumn: 'Actions',
        adminFeaturedBadge: 'Featured',
        adminViewAction: 'View',
        adminEditAction: 'Edit',
        adminDeleteAction: 'Delete',
        adminNoProjects: 'No projects yet',
        adminCreateFirst: 'Create first project',
        adminDeleteConfirm: 'Delete "{title}"? This action cannot be undone.',
        adminDeleteError: 'Error deleting project',
        
        adminBackToPanel: '← Back to panel',
        adminEditProject: 'Edit Project',
        adminNewProjectTitle: 'New Project',
        adminCreateProject: 'Create new project for your portfolio',
        adminFormTitle: 'Title *',
        adminFormSlug: 'Slug *',
        adminFormDescription: 'Description',
        adminFormCategory: 'Category *',
        adminFormCategoryDesigning: 'Designing',
        adminFormCategoryDrawings: 'Drawings',
        adminFormClient: 'Client',
        adminFormYear: 'Year *',
        adminFormFeatured: 'Featured Project',
        adminFormOrder: 'Order',
        adminFormImages: 'Images',
        adminFormImageCount: 'total',
        adminFormUploadImages: 'Upload images',
        adminFormSetCover: 'Set as cover',
        adminFormCoverSet: 'Cover',
        adminFormPending: 'Pending',
        adminFormSave: 'Save',
        adminFormSaving: 'Saving...',
        adminFormUpdate: 'Update',
        adminFormCreate: 'Create',
        adminFormCancel: 'Cancel',
        adminFormError: 'Error saving project',
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
        
        adminLoginTitle: 'Acceso Admin',
        adminLoginSubtitle: 'Ingresa tus credenciales para continuar',
        adminUsername: 'Usuario',
        adminPassword: 'Contraseña',
        adminLoginButton: 'Iniciar Sesión',
        adminLoggingIn: 'Iniciando sesión...',
        adminLoginError: 'Credenciales inválidas',
        
        adminTitle: 'Panel de Administración',
        adminSubtitle: 'Gestiona tu portafolio',
        adminNewProject: 'Nuevo Proyecto',
        adminProjects: 'Proyectos',
        adminTotalProjects: 'Total Proyectos',
        adminTotalImages: 'Total Imágenes',
        adminFeatured: 'Destacados',
        adminDesigning: 'Designing',
        adminViewSite: 'Ver Sitio →',
        adminDevNotice: 'Este panel solo está disponible en desarrollo. Para producción, implementa autenticación adecuada.',
        adminLogout: 'Cerrar Sesión',
        
        adminTitleColumn: 'Título',
        adminCategoryColumn: 'Categoría',
        adminYearColumn: 'Año',
        adminImagesColumn: 'Imágenes',
        adminStatusColumn: 'Estado',
        adminActionsColumn: 'Acciones',
        adminFeaturedBadge: 'Destacado',
        adminViewAction: 'Ver',
        adminEditAction: 'Editar',
        adminDeleteAction: 'Eliminar',
        adminNoProjects: 'Aún no hay proyectos',
        adminCreateFirst: 'Crear primer proyecto',
        adminDeleteConfirm: '¿Eliminar "{title}"? Esta acción no se puede deshacer.',
        adminDeleteError: 'Error al eliminar proyecto',
        
        adminBackToPanel: '← Volver al panel',
        adminEditProject: 'Editar Proyecto',
        adminNewProjectTitle: 'Nuevo Proyecto',
        adminCreateProject: 'Crea un nuevo proyecto para tu portafolio',
        adminFormTitle: 'Título *',
        adminFormSlug: 'Slug *',
        adminFormDescription: 'Descripción',
        adminFormCategory: 'Categoría *',
        adminFormCategoryDesigning: 'Diseño',
        adminFormCategoryDrawings: 'Dibujos',
        adminFormClient: 'Cliente',
        adminFormYear: 'Año *',
        adminFormFeatured: 'Proyecto Destacado',
        adminFormOrder: 'Orden',
        adminFormImages: 'Imágenes',
        adminFormImageCount: 'total',
        adminFormUploadImages: 'Subir imágenes',
        adminFormSetCover: 'Establecer como portada',
        adminFormCoverSet: 'Portada',
        adminFormPending: 'Pendiente',
        adminFormSave: 'Guardar',
        adminFormSaving: 'Guardando...',
        adminFormUpdate: 'Actualizar',
        adminFormCreate: 'Crear',
        adminFormCancel: 'Cancelar',
        adminFormError: 'Error al guardar proyecto',
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
        
        adminLoginTitle: 'Доступ Администратора',
        adminLoginSubtitle: 'Введите учетные данные для продолжения',
        adminUsername: 'Имя пользователя',
        adminPassword: 'Пароль',
        adminLoginButton: 'Войти',
        adminLoggingIn: 'Вход...',
        adminLoginError: 'Неверные учетные данные',
        
        adminTitle: 'Панель Администратора',
        adminSubtitle: 'Управление портфолио',
        adminNewProject: 'Новый Проект',
        adminProjects: 'Проекты',
        adminTotalProjects: 'Всего Проектов',
        adminTotalImages: 'Всего Изображений',
        adminFeatured: 'Избранные',
        adminDesigning: 'Дизайн',
        adminViewSite: 'Смотреть Сайт →',
        adminDevNotice: 'Эта панель доступна только в разработке. Для продакшена реализуйте надлежащую аутентификацию.',
        adminLogout: 'Выйти',
        
        adminTitleColumn: 'Название',
        adminCategoryColumn: 'Категория',
        adminYearColumn: 'Год',
        adminImagesColumn: 'Изображения',
        adminStatusColumn: 'Статус',
        adminActionsColumn: 'Действия',
        adminFeaturedBadge: 'Избранное',
        adminViewAction: 'Посмотреть',
        adminEditAction: 'Редактировать',
        adminDeleteAction: 'Удалить',
        adminNoProjects: 'Пока нет проектов',
        adminCreateFirst: 'Создать первый проект',
        adminDeleteConfirm: 'Удалить "{title}"? Это действие нельзя отменить.',
        adminDeleteError: 'Ошибка удаления проекта',
        
        adminBackToPanel: '← Назад к панели',
        adminEditProject: 'Редактировать Проект',
        adminNewProjectTitle: 'Новый Проект',
        adminCreateProject: 'Создайте новый проект для вашего портфолио',
        adminFormTitle: 'Название *',
        adminFormSlug: 'Slug *',
        adminFormDescription: 'Описание',
        adminFormCategory: 'Категория *',
        adminFormCategoryDesigning: 'Дизайн',
        adminFormCategoryDrawings: 'Рисунки',
        adminFormClient: 'Клиент',
        adminFormYear: 'Год *',
        adminFormFeatured: 'Избранный Проект',
        adminFormOrder: 'Порядок',
        adminFormImages: 'Изображения',
        adminFormImageCount: 'всего',
        adminFormUploadImages: 'Загрузить изображения',
        adminFormSetCover: 'Установить обложкой',
        adminFormCoverSet: 'Обложка',
        adminFormPending: 'Ожидание',
        adminFormSave: 'Сохранить',
        adminFormSaving: 'Сохранение...',
        adminFormUpdate: 'Обновить',
        adminFormCreate: 'Создать',
        adminFormCancel: 'Отмена',
        adminFormError: 'Ошибка сохранения проекта',
    },
};

