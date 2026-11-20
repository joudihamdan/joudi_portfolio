import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imageSize } from 'image-size'

// Scans public/projects/<slug>/ and exposes what it finds as
// `virtual:project-media`, so adding a folder of screenshots is all it takes
// to give a project its phone preview and gallery. Screens are the numbered
// files (01-…, 02-…) in name order, `logo.*` is the card logo, and real pixel
// sizes are read so images can carry width/height (no layout shift) and are
// never upscaled.
function projectMedia() {
  const virtualId = 'virtual:project-media'
  const resolvedId = '\0' + virtualId
  const root = fileURLToPath(new URL('./public/projects', import.meta.url))
  const IMAGE = /\.(png|jpe?g|webp|avif|gif|svg)$/i
  const LOGO = /^logo\./i
  const SCREEN = /^\d+[-_.]/

  const describe = (slug, file) => {
    const { width, height } = imageSize(fs.readFileSync(path.join(root, slug, file)))
    return { src: `/projects/${slug}/${file}`, name: file.replace(/\.[^.]+$/, ''), width, height }
  }

  const scan = () => {
    const media = {}
    if (!fs.existsSync(root)) return media
    for (const slug of fs.readdirSync(root)) {
      const dir = path.join(root, slug)
      if (!fs.statSync(dir).isDirectory()) continue
      const files = fs.readdirSync(dir).filter((f) => IMAGE.test(f)).sort()
      const logo = files.find((f) => LOGO.test(f))
      media[slug] = {
        logo: logo ? describe(slug, logo) : null,
        // Only numbered files (01-…, 02-…) are screenshots, so spare images
        // kept in the folder (e.g. logo-wide-original.png) are ignored.
        screens: files.filter((f) => SCREEN.test(f)).map((f) => describe(slug, f)),
      }
    }
    return media
  }

  return {
    name: 'project-media',
    resolveId(id) {
      if (id === virtualId) return resolvedId
    },
    load(id) {
      if (id === resolvedId) return `export default ${JSON.stringify(scan())}`
    },
    configureServer(server) {
      // Pick up added/removed screenshots without restarting the dev server.
      const refresh = (file) => {
        if (!file.startsWith(root)) return
        const mod = server.moduleGraph.getModuleById(resolvedId)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.add(root)
      server.watcher.on('add', refresh)
      server.watcher.on('unlink', refresh)
      server.watcher.on('addDir', refresh)
      server.watcher.on('unlinkDir', refresh)
    },
  }
}

export default defineConfig({
  plugins: [react(), projectMedia()],
  build: {
    rollupOptions: {
      // Ensure no modules are accidentally externalized
      external: [],
      output: {
        // Properly bundle all dependencies
        globals: {}
      }
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    include: ['framer-motion', 'react', 'react-dom']
  }
})
