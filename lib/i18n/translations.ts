export type Language = 'en' | 'es' | 'ru';

export interface Translations {
    // Header
    portfolioYear: string;

    // Home Page
    heroSubtitle: string;
    heroTitle1: string;
    heroTitle2: string;
    heroTitle3: string;
    heroDescription: string;
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

    // Navigation
    navDesigning: string;
    navDrawings: string;
    navContact: string;
    navExplore: string;
    navConnect: string;
    navArtPortfolio: string;
    backToProjects: string;
    interfaceDesign: string;
    drawing: string;

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

    // Admin - Project List (New)
    adminDesigningProjects: string;
    adminDrawingsProjects: string;
    adminDesigningDescription: string;
    adminDrawingsDescription: string;
    adminDragToReorder: string;
    adminOrderSaved: string;
    adminNoProjectsCategory: string;
    adminOrderLabel: string;
    adminOrderValue: string;
    adminProjectsCount: string;

    // Admin - Project Form (New)
    adminExistingImages: string;
    adminAddNewImages: string;
    adminDeleteImageConfirm: string;
    adminSetCoverImage: string;
    adminCoverImage: string;
    adminDeleteImageError: string;
    adminSetCoverError: string;
    adminReorderImagesError: string;
    adminImagesPending: string;
    adminImagesAutoUpload: string;
    adminAddImagesLater: string;
    adminInvalidImages: string;
    adminNoImages: string;
    adminDragHint: string;

        // Admin - Image Uploader
        adminDragImagesHere: string;
        adminClickToSelect: string;
        adminMaxImages: string;
        adminMaxSizeEach: string;
        adminImagesUploadedSuccess: string;
        adminUploadingImages: string;
        adminUploadImages: string;
        adminUploadProgress: string;
        adminOptimizingImages: string;
}

// Helper function to get current year suffix (e.g., '25 for 2025)
const getYearSuffix = (): string => {
    if (typeof window !== 'undefined' || typeof global !== 'undefined') {
        const year = new Date().getFullYear();
        return year.toString().slice(-2);
    }
    // Fallback for SSR
    return new Date().getFullYear().toString().slice(-2);
};

export const translations: Record<Language, Translations> = {
    en: {
        portfolioYear: `Portfolio '${getYearSuffix()}`,

        // UPDATED: Changed from "Digital Artisan" to "UX/UI Designer & Product Strategist"
        heroSubtitle: 'UX/UI Designer & Product Strategist',
        // UPDATED: Changed from "Crafting digital silence & substance" to "Clarity in Digital Design"
        heroTitle1: 'Clarity in',
        heroTitle2: 'Digital',
        heroTitle3: 'Design.',
        heroDescription: 'Bridging the gap between complex business goals and effortless user experiences. I build clean, high-performing interfaces that prioritize clarity and functional value.',
        section1Title: 'Designing Human Interfaces',
        section2Title: 'Drawings',
        seeProjects: 'See Projects',

        designingSubtitle: 'Interface Design',
        designingTitle: 'Designing Human Interfaces',
        designingDescription: 'Creating digital experiences that balance functionality with aesthetic restraint. Each interface is crafted with intention, focusing on clarity, elegance, and human connection.',

        drawingsSubtitle: 'Artistic Exploration',
        drawingsTitle: 'Drawings',
        drawingsDescription: 'A collection of artistic explorations across various mediums. Each piece represents a moment of creative expression, capturing emotion, texture, and form.',

        ctaBadge: "Let's Collaborate", // Badge removed from UI but kept for reference
        ctaTitle: "Let's Collaborate",
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

        navDesigning: 'Designing',
        navDrawings: 'Drawings',
        navContact: 'Contact',
        navExplore: 'Explore',
        navConnect: 'Connect',
        navArtPortfolio: 'Art Portfolio',
        backToProjects: 'Back to Projects',
        interfaceDesign: 'Interface Design',
        drawing: 'Drawing',

        footerCopyright: `© ${new Date().getFullYear()} Katerina Voronina`,
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

        // Admin - Project List (New)
        adminDesigningProjects: 'Design Projects (Designing)',
        adminDrawingsProjects: 'Drawing Projects (Drawings)',
        adminDesigningDescription: 'Reorder these projects to control how they appear on the main page. The first project will be displayed first.',
        adminDrawingsDescription: 'Reorder these projects to control how they appear on the Art Portfolio page. The first project will be displayed first.',
        adminDragToReorder: 'Drag',
        adminOrderSaved: 'The order is saved automatically and reflected on the main page.',
        adminNoProjectsCategory: 'No {category} projects yet',
        adminOrderLabel: 'Order',
        adminOrderValue: 'order',
        adminProjectsCount: 'project',

        // Admin - Project Form (New)
        adminExistingImages: 'Existing Images',
        adminAddNewImages: 'Add New Images',
        adminDeleteImageConfirm: 'Delete this image? This action cannot be undone.',
        adminSetCoverImage: 'Set as cover',
        adminCoverImage: 'Cover',
        adminDeleteImageError: 'Error deleting image',
        adminSetCoverError: 'Error setting cover image',
        adminReorderImagesError: 'Error reordering images',
        adminInvalidImages: 'image(s) have invalid URLs and will not display correctly.',
        adminNoImages: 'No images yet. Upload images below.',
        adminDragHint: 'Drag images to reorder them. The order will be saved automatically.',
        adminImagesPending: 'image(s) ready',
        adminImagesAutoUpload: 'Will be uploaded automatically when creating the project.',
        adminAddImagesLater: '💡 You can add images now or after creating the project',

        // Admin - Image Uploader
        adminDragImagesHere: 'Drag images here or click to select',
        adminClickToSelect: 'click to select',
        adminMaxImages: 'Maximum',
        adminMaxSizeEach: 'each',
        adminImagesUploadedSuccess: 'Images uploaded successfully with automatic optimization!',
        adminUploadingImages: 'Uploading',
        adminUploadImages: 'Upload',
        adminUploadProgress: 'Uploading',
        adminOptimizingImages: 'Optimizing and generating blur placeholders...',
    },
    es: {
        portfolioYear: `Portafolio '${getYearSuffix()}`,

        // UPDATED: Changed from "Artesana Digital" to "Diseñadora UX/UI & Estratega de Producto"
        heroSubtitle: 'Diseñadora UX/UI & Estratega de Producto',
        // UPDATED: Changed to "Claridad en el Diseño Digital"
        heroTitle1: 'Claridad en el',
        heroTitle2: 'Diseño',
        heroTitle3: 'Digital.',
        heroDescription: 'Conectando objetivos empresariales complejos con experiencias de usuario fluidas. Construyo interfaces limpias y de alto rendimiento que priorizan la claridad y el valor funcional.',
        section1Title: 'Diseñando Interfaces Humanas',
        section2Title: 'Dibujos',
        seeProjects: 'Ver Proyectos',

        designingSubtitle: 'Diseño de Interfaces',
        designingTitle: 'Diseñando Interfaces Humanas',
        designingDescription: 'Creando experiencias digitales que equilibran funcionalidad con restricción estética. Cada interfaz se elabora con intención, enfocándose en claridad, elegancia y conexión humana.',

        drawingsSubtitle: 'Exploración Artística',
        drawingsTitle: 'Dibujos',
        drawingsDescription: 'Una colección de exploraciones artísticas a través de varios medios. Cada pieza representa un momento de expresión creativa, capturando emoción, textura y forma.',

        ctaBadge: 'Colaboremos', // Badge removed from UI but kept for reference
        ctaTitle: 'Colaboremos',
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

        navDesigning: 'Diseño',
        navDrawings: 'Dibujos',
        navContact: 'Contacto',
        navExplore: 'Explorar',
        navConnect: 'Conectar',
        navArtPortfolio: 'Portafolio Artístico',
        backToProjects: 'Volver a Proyectos',
        interfaceDesign: 'Diseño de Interfaces',
        drawing: 'Dibujo',

        footerCopyright: `© ${new Date().getFullYear()} Katerina Voronina`,
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

        // Admin - Project List (New)
        adminDesigningProjects: 'Proyectos de Diseño (Designing)',
        adminDrawingsProjects: 'Proyectos de Dibujos (Drawings)',
        adminDesigningDescription: 'Ordena estos proyectos para controlar cómo aparecen en la página principal. El primer proyecto será el que se muestre primero.',
        adminDrawingsDescription: 'Ordena estos proyectos para controlar cómo aparecen en la página de Art Portfolio. El primer proyecto será el que se muestre primero.',
        adminDragToReorder: 'Arrastra',
        adminOrderSaved: 'El orden se guarda automáticamente y se refleja en la página principal.',
        adminNoProjectsCategory: 'No hay proyectos de {category} aún',
        adminOrderLabel: 'Orden',
        adminOrderValue: 'orden',
        adminProjectsCount: 'proyecto',

        // Admin - Project Form (New)
        adminExistingImages: 'Imágenes Existentes',
        adminAddNewImages: 'Agregar Nuevas Imágenes',
        adminDeleteImageConfirm: '¿Eliminar esta imagen? Esta acción no se puede deshacer.',
        adminSetCoverImage: 'Establecer como portada',
        adminCoverImage: 'Portada',
        adminDeleteImageError: 'Error al eliminar imagen',
        adminSetCoverError: 'Error al establecer portada',
        adminReorderImagesError: 'Error al reordenar imágenes',
        adminInvalidImages: 'imagen(es) tienen URLs inválidas y no se mostrarán correctamente.',
        adminNoImages: 'Aún no hay imágenes. Sube imágenes a continuación.',
        adminDragHint: 'Arrastra las imágenes para reordenarlas. El orden se guardará automáticamente.',
        adminImagesPending: 'imagen(es) lista(s)',
        adminImagesAutoUpload: 'Se subirá(n) automáticamente al crear el proyecto.',
        adminAddImagesLater: '💡 Puedes agregar imágenes ahora o después de crear el proyecto',

        // Admin - Image Uploader
        adminDragImagesHere: 'Arrastra imágenes aquí o haz clic para seleccionar',
        adminClickToSelect: 'haz clic para seleccionar',
        adminMaxImages: 'Máximo',
        adminMaxSizeEach: 'cada una',
        adminImagesUploadedSuccess: '¡Imágenes subidas exitosamente con optimización automática!',
        adminUploadingImages: 'Subiendo',
        adminUploadImages: 'Subir',
        adminUploadProgress: 'Subiendo',
        adminOptimizingImages: 'Optimizando y generando blur placeholders...',
    },
    ru: {
        portfolioYear: `Портфолио '${getYearSuffix()}`,

        // UPDATED: Changed from "Цифровой Мастер" to "UX/UI Дизайнер & Продуктовый Стратег"
        heroSubtitle: 'UX/UI Дизайнер & Продуктовый Стратег',
        // UPDATED: Changed to "Ясность в Цифровом Дизайне"
        heroTitle1: 'Ясность в',
        heroTitle2: 'Цифровом',
        heroTitle3: 'Дизайне.',
        heroDescription: 'Соединяю сложные бизнес-цели с безупречным пользовательским опытом. Создаю чистые, высокопроизводительные интерфейсы, в которых приоритет — ясность и функциональная ценность.',
        section1Title: 'Дизайн Человеческих Интерфейсов',
        section2Title: 'Рисунки',
        seeProjects: 'Смотреть Проекты',

        designingSubtitle: 'Дизайн Интерфейсов',
        designingTitle: 'Дизайн Человеческих Интерфейсов',
        designingDescription: 'Создание цифровых впечатлений, балансирующих функциональность с эстетической сдержанностью. Каждый интерфейс создан с намерением, фокусируясь на ясности, элегантности и человеческой связи.',

        drawingsSubtitle: 'Художественное Исследование',
        drawingsTitle: 'Рисунки',
        drawingsDescription: 'Коллекция художественных исследований в различных техниках. Каждая работа представляет момент творческого самовыражения, захватывая эмоции, текстуру и форму.',

        ctaBadge: 'Давайте Сотрудничать', // Badge removed from UI but kept for reference
        ctaTitle: 'Давайте Сотрудничать',
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

        navDesigning: 'Дизайн',
        navDrawings: 'Рисунки',
        navContact: 'Контакт',
        navExplore: 'Навигация',
        navConnect: 'Связаться',
        navArtPortfolio: 'Арт Портфолио',
        backToProjects: 'Назад к Проектам',
        interfaceDesign: 'Дизайн Интерфейса',
        drawing: 'Рисунок',

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

        // Admin - Project List (New)
        adminDesigningProjects: 'Проекты Дизайна (Designing)',
        adminDrawingsProjects: 'Проекты Рисунков (Drawings)',
        adminDesigningDescription: 'Переупорядочьте эти проекты, чтобы контролировать, как они появляются на главной странице. Первый проект будет отображаться первым.',
        adminDrawingsDescription: 'Переупорядочьте эти проекты, чтобы контролировать, как они появляются на странице Art Portfolio. Первый проект будет отображаться первым.',
        adminDragToReorder: 'Перетащите',
        adminOrderSaved: 'Порядок сохраняется автоматически и отражается на главной странице.',
        adminNoProjectsCategory: 'Пока нет проектов {category}',
        adminOrderLabel: 'Порядок',
        adminOrderValue: 'порядок',
        adminProjectsCount: 'проект',

        // Admin - Project Form (New)
        adminExistingImages: 'Существующие Изображения',
        adminAddNewImages: 'Добавить Новые Изображения',
        adminDeleteImageConfirm: 'Удалить это изображение? Это действие нельзя отменить.',
        adminSetCoverImage: 'Установить обложкой',
        adminCoverImage: 'Обложка',
        adminDeleteImageError: 'Ошибка удаления изображения',
        adminSetCoverError: 'Ошибка установки обложки',
        adminReorderImagesError: 'Ошибка переупорядочивания изображений',
        adminInvalidImages: 'изображение(я) имеют недействительные URL и не будут отображаться правильно.',
        adminNoImages: 'Пока нет изображений. Загрузите изображения ниже.',
        adminDragHint: 'Перетащите изображения, чтобы изменить их порядок. Порядок будет сохранен автоматически.',
        adminImagesPending: 'изображение(я) готово(ы)',
        adminImagesAutoUpload: 'Будет загружено автоматически при создании проекта.',
        adminAddImagesLater: '💡 Вы можете добавить изображения сейчас или после создания проекта',

        // Admin - Image Uploader
        adminDragImagesHere: 'Перетащите изображения сюда или нажмите, чтобы выбрать',
        adminClickToSelect: 'нажмите, чтобы выбрать',
        adminMaxImages: 'Максимум',
        adminMaxSizeEach: 'каждое',
        adminImagesUploadedSuccess: 'Изображения успешно загружены с автоматической оптимизацией!',
        adminUploadingImages: 'Загрузка',
        adminUploadImages: 'Загрузить',
        adminUploadProgress: 'Загрузка',
        adminOptimizingImages: 'Оптимизация и создание blur placeholders...',
    },
};
