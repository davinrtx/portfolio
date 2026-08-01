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
	platform?: string;
	status?: string;
	year?: string;
	cover: ProjectMedia;
	gallery: ProjectMedia[];
	technologies: ProjectTechnology[];
	description: string[];
	features: string[];
	links?: ProjectLinks;
}

const gastoGallery: ProjectMedia[] = Array.from(
	{ length: 4 },
	(_, index): ProjectMedia => {
		const number = String(index + 1).padStart(2, "0");

		return {
			kind: "placeholder",
			label: `CAPTURA ${number} PENDIENTE`,
			alt: `Espacio reservado para la captura ${index + 1} de Gasto`,
			filename: `GASTO_${number}.PNG`,
			caption: `Vista ${number} · Captura pendiente de agregar`,
		};
	},
);

export const projects: Project[] = [
	{
		id: 1,
		slug: "gasto",
		title: "App de Finanzas personales",
		windowTitle: "Gasto.exe",
		summary:
			"Aplicación móvil para gestionar y visualizar gastos e ingresos de forma simple e intuitiva.",
		category: "Móvil",
		platform: "Aplicación móvil",
		cover: gastoGallery[0]!,
		gallery: gastoGallery,
		technologies: [],
		description: [
			"Aplicación móvil para gestionar y visualizar gastos e ingresos de forma simple e intuitiva.",
		],
		features: [
			"Gestión de gastos e ingresos.",
			"Visualización clara de los movimientos registrados.",
		],
	},
];

export const getProjectHref = (project: Pick<Project, "slug">) =>
	`/proyectos/${project.slug}`;
