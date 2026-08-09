// @ts-check
import { defineConfig } from 'astro/config';
import compress from '@playform/compress';

const base = '/portfolio';

// En dev y preview, redirige la raiz / hacia {base}/ para no caer en el 404
// de Astro al abrir http://localhost:4321/. No afecta al build estatico:
// solo agrega middlewares a los servidores de Vite.
function redirectRootToBase() {
	const target = `${base}/`;

	const redirect = (server) => {
		server.middlewares.use((req, res, next) => {
			const pathname = req.url?.split('?')[0] ?? '';
			if (pathname === '/') {
				res.writeHead(302, { Location: target });
				res.end();
				return;
			}
			next();
		});
	};

	return {
		name: 'redirect-root-to-base',
		configureServer: redirect,
		configurePreviewServer: redirect,
	};
}

// https://astro.build/config
export default defineConfig({
	site: 'https://davinrtx.github.io/portfolio',
	base,
	integrations: [compress()],
	vite: {
		plugins: [redirectRootToBase()],
	},
});
