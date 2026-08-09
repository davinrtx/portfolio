const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");

export type ProjectCategory = "Web" | "Móvil";

export type ProjectMedia =
	| {
			kind: "image";
			src: string;
			alt: string;
			filename: string;
			caption?: string;
	  }
	| {
			kind: "placeholder";
			label: string;
			alt: string;
			filename: string;
			caption?: string;
	  };

export interface ProjectTechnology {
	name: string;
	icon: string;
}

export interface ProjectLinks {
	demo?: string;
	repository?: string;
}

export interface Project {
	id: number;
	slug: string;
	title: string;
	windowTitle: string;
	summary: string;
	category: ProjectCategory;
	cover: ProjectMedia;
	gallery: ProjectMedia[];
	technologies: ProjectTechnology[];
	description: string[];
	features: string[];
	links?: ProjectLinks;
}

const gastoCover: ProjectMedia = {
	kind: "image",
	src: `${base}projects/gasto/cover.webp`,
	alt: "Pantalla de inicio de sesión de Gasto mostrada en un teléfono sobre un escritorio",
	filename: "GASTO_COVER.WEBP",
	caption: "Portada de Gasto · Inicio de sesión",
};

const gastoGallery: ProjectMedia[] = [
	{
		kind: "image",
		src: `${base}projects/gasto/gallery/01-dashboard.webp`,
		alt: "Dashboard de Gasto con balance total, ingresos, gastos, categorías y movimientos recientes",
		filename: "01_DASHBOARD.WEBP",
		caption: "Dashboard principal con balance y resumen de actividad",
	},
	{
		kind: "image",
		src: `${base}projects/gasto/gallery/02-movimientos.webp`,
		alt: "Historial de movimientos de Gasto organizado por fecha con filtros de periodo",
		filename: "02_MOVIMIENTOS.WEBP",
		caption: "Historial de ingresos y gastos con filtros temporales",
	},
	{
		kind: "image",
		src: `${base}projects/gasto/gallery/03-nuevo_movimiento.webp`,
		alt: "Formulario de Gasto para registrar un movimiento con monto, tipo, categoría, descripción y fecha",
		filename: "03_NUEVO_MOVIMIENTO.WEBP",
		caption: "Registro de un nuevo ingreso o gasto",
	},
	{
		kind: "image",
		src: `${base}projects/gasto/gallery/04-reportes.webp`,
		alt: "Pantalla de reportes de Gasto con comparativa de ingresos y gastos y gráfica mensual",
		filename: "04_REPORTES.WEBP",
		caption: "Reportes visuales y comparativa mensual de finanzas",
	},
	{
		kind: "image",
		src: `${base}projects/gasto/gallery/05-categorias.webp`,
		alt: "Pantalla de ajustes de Gasto con categorías de ingresos y gastos editables",
		filename: "05_CATEGORIAS.WEBP",
		caption: "Administración de categorías personalizadas",
	},
	{
		kind: "image",
		src: `${base}projects/gasto/gallery/06-nueva_categoria.webp`,
		alt: "Formulario de Gasto para crear una categoría seleccionando icono y color",
		filename: "06_NUEVA_CATEGORIA.WEBP",
		caption: "Creación de categorías con icono y color personalizados",
	},
];

export const projects: Project[] = [
	{
		id: 1,
		slug: "gasto",
		title: "App de Finanzas personales",
		windowTitle: "Gasto.exe",
		summary:
			"Aplicación multiplataforma de finanzas personales con funcionamiento offline y sincronización automática.",
		category: "Móvil",
		cover: gastoCover,
		gallery: gastoGallery,
		technologies: [
			{ name: "Expo", icon: `${base}stack_icons/expo.svg` },
			{ name: "React Native", icon: `${base}stack_icons/react.svg` },
			{ name: "Supabase", icon: `${base}stack_icons/supabase.svg` },
			{ name: "Expo SQLite", icon: `${base}stack_icons/sql.svg` },
			{ name: "TypeScript", icon: `${base}stack_icons/typescript.svg` },
			{ name: "EAS Build", icon: `${base}stack_icons/expo.svg` },
		],
		description: [
			"Gasto es una aplicación multiplataforma de finanzas personales diseñada para registrar ingresos y gastos, organizar los movimientos mediante categorías personalizadas y consultar el estado del dinero desde un dashboard claro.",
			"Su arquitectura offline-first mantiene la información disponible localmente con SQLite cuando no hay conexión. Al recuperar la red, la aplicación sincroniza los cambios con Supabase y resuelve los conflictos de forma determinista para ofrecer una experiencia consistente en Android, iOS y web.",
		],
		features: [
			"Registro e inicio de sesión mediante Supabase Auth.",
			"Gestión de ingresos, gastos y categorías personalizadas.",
			"Dashboard con balance, actividad reciente y resumen mensual.",
			"Reportes y gráficas para visualizar la distribución de los gastos.",
			"Persistencia local con Expo SQLite para trabajar sin conexión.",
			"Sincronización automática con resolución determinista de conflictos.",
			"Soporte para Android, iOS y web mediante Expo Router.",
		],
	},
];

export const getProjectHref = (project: Pick<Project, "slug">) =>
	`${base}proyectos/${project.slug}`;
