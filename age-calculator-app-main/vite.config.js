import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Configura la ruta base pública donde se alojará el proyecto en GitHub Pages.
  // Debe empezar y terminar obligatoriamente con una barra '/'.
  base: '/frontend-mentor-challenges/age-calculator-app-main/',
  plugins: [
    tailwindcss(),
  ],
})

