import { useState } from "react";
import styles from "./ToolsCabinet.module.css";

interface Tool {
	name: string;
	icon?: string;
}

const genericToolIcon = "</>";

const tools: Tool[] = [
	{ name: "Git", icon: "/stack_icons/git.svg" },
	{ name: "GitHub", icon: "/stack_icons/github.svg" },
	{ name: "VS Code", icon: "/stack_icons/vscode.svg" },
	{ name: "Codex", icon: "/stack_icons/codex.svg" },
	{ name: "NPM", icon: "/stack_icons/npm.svg" },
	{ name: "Vercel", icon: "/stack_icons/vercel.svg" },
	{ name: "Netlify", icon: "/stack_icons/netlify.svg" },
	{ name: "Supabase", icon: "/stack_icons/supabase.svg" },
];

export default function ToolsCabinet() {
	const [swingingTools, setSwingingTools] = useState<Set<string>>(() => new Set());

	const startToolSwing = (toolName: string) => {
		setSwingingTools((currentTools) => {
			if (currentTools.has(toolName)) {
				return currentTools;
			}

			const nextTools = new Set(currentTools);
			nextTools.add(toolName);
			return nextTools;
		});
	};

	const finishToolSwing = (toolName: string) => {
		setSwingingTools((currentTools) => {
			const nextTools = new Set(currentTools);
			nextTools.delete(toolName);
			return nextTools;
		});
	};

	return (
		<article className={styles.cabinet} aria-labelledby="tools-title">
			<header className={styles.cabinetCrown}>
				<div className={styles.crownCap} aria-hidden="true" />

				<div className={styles.crownFace}>
					<span className={styles.crownScrew} aria-hidden="true" />
					<span className={styles.crownOrnament} aria-hidden="true">
						◆
					</span>

					<div className={styles.crownTitle}>
						<span className={styles.crownIcon} aria-hidden="true">
							⌘
						</span>
						<p>03 /</p>
						<h3 id="tools-title">Herramientas</h3>
					</div>

					<span
						className={`${styles.crownOrnament} ${styles.crownOrnamentRight}`}
						aria-hidden="true"
					>
						◆
					</span>
					<span className={styles.crownScrew} aria-hidden="true" />
				</div>
			</header>

			<div className={styles.pegboard}>
				<ul className={styles.toolGrid} aria-label="Herramientas de desarrollo">
					{tools.map((tool) => {
						const isSwinging = swingingTools.has(tool.name);

						return (
							<li
								className={`${styles.toolCard} ${isSwinging ? styles.swinging : ""}`}
								onPointerEnter={() => startToolSwing(tool.name)}
								onAnimationEnd={() => finishToolSwing(tool.name)}
								key={tool.name}
							>
								<span className={styles.pegHook} aria-hidden="true" />
								<div className={styles.toolLabel}>
									<span className={styles.toolIcon} aria-hidden="true">
										{tool.icon ? (
											<img src={tool.icon} alt="" loading="lazy" />
										) : (
											genericToolIcon
										)}
									</span>
									<span className={styles.toolName}>{tool.name}</span>
								</div>
							</li>
						);
					})}
				</ul>
			</div>

			<footer className={styles.cabinetShelf} aria-hidden="true">
				<div className={styles.shelfLip}>
					<span />
					<span />
					<span />
				</div>

				<div className={styles.drawer}>
					<span className={styles.drawerHandle} />
					<p>Mis aliadas del día a día</p>
					<span className={styles.drawerMark}>■</span>
				</div>
			</footer>
		</article>
	);
}
