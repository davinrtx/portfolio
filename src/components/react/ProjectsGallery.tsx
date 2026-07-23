import { useMemo, useState } from "react";
import styles from "./ProjectsGallery.module.css";

type ProjectCategory = "Web" | "Móvil";
type ProjectFilter = "Todos" | ProjectCategory;

interface Project {
	id: number;
	title: string;
	windowTitle: string;
	description: string;
	category: ProjectCategory;
	imageSrc: string | null;
	imageAlt: string;
	url: string | null;
}

const filters: ProjectFilter[] = ["Todos", "Web", "Móvil"];

const projects: Project[] = [
	{
		id: 1,
		title: "App de Finanzas",
		windowTitle: "finanzas_app.exe",
		description:
			"Aplicación móvil para registrar y visualizar gastos e ingresos de forma simple e intuitiva.",
		category: "Móvil",
		// Reemplaza null con la ruta pública cuando la imagen esté disponible.
		imageSrc: null,
		imageAlt: "Vista previa de la aplicación móvil de finanzas",
		url: null,
	},
];

export default function ProjectsGallery() {
	const [activeFilter, setActiveFilter] = useState<ProjectFilter>("Todos");

	const visibleProjects = useMemo(
		() =>
			activeFilter === "Todos"
				? projects
				: projects.filter((project) => project.category === activeFilter),
		[activeFilter],
	);

	return (
		<div className={styles.gallery}>
			<div className={styles.filters} role="group" aria-label="Filtrar proyectos por tipo">
				{filters.map((filter) => {
					const isActive = filter === activeFilter;

					return (
						<button
							className={`${styles.filterButton} ${isActive ? styles.activeFilter : ""}`}
							type="button"
							aria-pressed={isActive}
							onClick={() => setActiveFilter(filter)}
							key={filter}
						>
							<span className={styles.filterCursor} aria-hidden="true">
								▶
							</span>
							{filter}
						</button>
					);
				})}
			</div>

			<div className={styles.projectsGrid} aria-live="polite">
				{visibleProjects.length > 0 ? (
					visibleProjects.map((project) => (
						<article className={styles.projectCard} key={`${activeFilter}-${project.id}`}>
							<div className={styles.windowBar}>
								<div className={styles.windowName}>
									<span className={styles.windowIcon} aria-hidden="true">
										▧
									</span>
									<span>{project.windowTitle}</span>
								</div>

								<div className={styles.windowControls} aria-hidden="true">
									<span className={`${styles.windowControl} ${styles.minimize}`} />
									<span className={`${styles.windowControl} ${styles.maximize}`} />
									<span className={`${styles.windowControl} ${styles.close}`} />
								</div>
							</div>

							<div className={styles.projectMedia}>
								{project.imageSrc ? (
									<img src={project.imageSrc} alt={project.imageAlt} loading="lazy" />
								) : (
									<div
										className={styles.emptyProjectMedia}
										role="img"
										aria-label="Espacio reservado para la imagen de la App de Finanzas"
									/>
								)}
							</div>

							<div className={styles.cardContent}>
								<div className={styles.cardHeading}>
									<h3>{project.title}</h3>
									<span className={styles.statusLight} aria-hidden="true" />
									<span className={styles.category}>{project.category}</span>
								</div>

								<p>{project.description}</p>

								{project.url ? (
									<a className={styles.projectButton} href={project.url}>
										<span>Ver proyecto</span>
										<span aria-hidden="true">▶</span>
									</a>
								) : (
									<button
										className={styles.projectButton}
										type="button"
										disabled
										title="Enlace del proyecto próximamente"
									>
										<span>Ver proyecto</span>
										<span aria-hidden="true">▶</span>
									</button>
								)}
							</div>
						</article>
					))
				) : (
					<p className={styles.emptyState}>No hay proyectos en esta categoría todavía.</p>
				)}
			</div>
		</div>
	);
}
