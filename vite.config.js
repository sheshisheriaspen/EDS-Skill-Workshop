import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mkdirSync, copyFileSync } from 'fs'
import { join } from 'path'

// Custom plugin to copy Aspentech sprite files
function copyAspentechSpritesPlugin() {
  return {
    name: "copy-aspentech-sprites",
    buildStart() {
      // Copy sprite files from the package to public folder
      const spriteFiles = [
        "material-icons-filled.svg",
        "material-icons-outlined.svg",
        "material-icons-round.svg",
        "material-icons-sharp.svg",
        "material-icons-two-tone.svg",
      ];

      const srcDir = join(
        __dirname,
        "node_modules/@aspentech/pf-ui-core/dist/sprites",
      );
      const destDir = join(__dirname, "public/assets/sprites");

      try {
        mkdirSync(destDir, { recursive: true });
        spriteFiles.forEach((file) => {
          copyFileSync(join(srcDir, file), join(destDir, file));
        });
        console.log("✓ Copied Aspentech sprite files to public/assets/sprites");
      } catch (error) {
        console.warn("Warning: Could not copy sprite files:", error);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/EDS-Skill-Workshop/',
  plugins: [react(), copyAspentechSpritesPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (id.includes('/react/') || id.includes('/react-dom/')) {
            return 'react-vendor'
          }

          if (id.includes('/@aspentech/pf-ui-core/') || id.includes('/@aspentech/pf-ui-compound/')) {
            return 'eds-vendor'
          }

          if (id.includes('/@shoelace-style/shoelace/')) {
            return 'shoelace-vendor'
          }

          if (id.includes('/ag-grid-community/') || id.includes('/ag-grid-react/')) {
            return 'ag-grid-vendor'
          }

          return 'vendor'
        },
      },
    },
  },
})