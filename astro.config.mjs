// @ts-check
import { defineConfig } from 'astro/config';
import compress from '@playform/compress';

const base = '/portfolio';

// En dev, redirige la raiz / hacia {base}/ para no caer en el 404 de Astro
// al abrir http://localhost:4321/. No afecta al build estatico: Astro arma
// las rutas con base y GitHub Pages sirve el sitio bajo /portfolio/.
//
// Ojo: no usar server.middlewares.use() a secas. Astro antepone su propio
// baseMiddleware (que hace 404 en /) y, al ver la URL ya sin base, nuestro
// middleware redirigiria /portfolio/ -> /portfolio/ en un bucle infinito.
// Por eso el redirect se mete con unshift al frente del stack, en el post
// hook de configureServer (que corre despues de los unshift de Astro).
function redirectRootToBase() {
	const target = `${base}/`;

	const redirect = (req, res, next) => {
		const pathname = req.url?.split('?')[0] ?? '';
		if (pathname === '/') {
			res.writeHead(302, { Location: target });
			res.end();
			return;
		}
		next();
	};

	return {
		name: 'redirect-root-to-base',
		configureServer(server) {
			return () => {
				server.middlewares.stack.unshift({ route: '', handle: redirect });
			};
		},
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
