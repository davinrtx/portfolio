import { useMemo, useState } from "react";
import styles from "./FrameworkCassette.module.css";

type FrameworkCategory = "Frontend" | "Backend" | "Mobile";

interface Framework {
	name: string;
	category: FrameworkCategory;
}

const filters: FrameworkCategory[] = ["Frontend", "Backend", "Mobile"];
const genericFrameworkIcon = "</>";

const frameworks: Framework[] = [
	{ name: "React", category: "Frontend" },
	{ name: "Next.js", category: "Frontend" },
	{ name: "Astro", category: "Frontend" },
	{ name: "Tailwind", category: "Frontend" },
	{ name: "Node.js", category: "Backend" },
	{ name: "Express", category: "Backend" },
	{ name: "React Native", category: "Mobile" },
	{ name: "Expo", category: "Mobile" },
];

export default function FrameworkCassette() {
	const [activeFilter, setActiveFilter] = useState<FrameworkCategory>("Frontend");

	const visibleFrameworks = useMemo(
		() => frameworks.filter((framework) => framework.category === activeFilter),
		[activeFilter],
	);

	return (
		<article className={styles.cassette} aria-labelledby="frameworks-title">
			<div className={styles.cornerScrew} aria-hidden="true" />
			<div className={styles.cornerScrew} aria-hidden="true" />
			<div className={styles.cornerScrew} aria-hidden="true" />
			<div className={styles.cornerScrew} aria-hidden="true" />

			<div className={styles.label}>
				<div className={styles.labelHeading}>
					<div className={styles.terminalIcon} aria-hidden="true">
						<span>&gt;_</span>
					</div>

					<div className={styles.labelCopy}>
						<div className={styles.titleLine}>
							<p>02 /</p>
							<h3 id="frameworks-title">Frameworks</h3>
						</div>
						<p>Aceleradores para crear software moderno y adaptable.</p>
					</div>

					<div className={styles.mixStamp} aria-hidden="true">
						<span>DEV MIX</span>
						<small>v1.0</small>
					</div>
				</div>

				<div className={styles.tapeDeck} aria-hidden="true">
					<div className={styles.sideLabel}>
						<small>SIDE</small>
						<strong>A</strong>
						<span>NOSTALGIA</span>
					</div>

					<div className={styles.reel}>
						<div className={styles.reelCore}>
							<span />
							<span />
							<span />
							<span />
							<span />
							<span />
						</div>
					</div>

					<div className={styles.tapeWindow}>
						<div className={styles.tapeRoll} />
						<div className={styles.tapeGap} />
						<div className={styles.tapeRoll} />
						<div className={styles.tapeScale}>
							<span>100</span>
							<span>50</span>
							<span>0</span>
						</div>
					</div>

					<div className={styles.reel}>
						<div className={styles.reelCore}>
							<span />
							<span />
							<span />
							<span />
							<span />
							<span />
						</div>
					</div>

					<div className={styles.durationLabel}>
						<strong>120</strong>
						<small>MIN</small>
					</div>
				</div>

				<div className={styles.frameworkTray} aria-live="polite">
					<ul key={activeFilter} aria-label={`Frameworks de ${activeFilter}`}>
						{visibleFrameworks.map((framework) => (
							<li className={styles.frameworkChip} key={framework.name}>
								<span className={styles.frameworkIcon} aria-hidden="true">
									{genericFrameworkIcon}
								</span>
								<span>{framework.name}</span>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className={styles.controlDeck}>
				<span className={styles.deckMark} aria-hidden="true">
					▶
				</span>

				<div className={styles.filterPanel} role="group" aria-label="Filtrar frameworks">
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
								<span className={styles.buttonLight} aria-hidden="true" />
								<span>{filter}</span>
							</button>
						);
					})}
				</div>

				<div className={styles.deckPort} aria-hidden="true" />
			</div>
		</article>
	);
}
