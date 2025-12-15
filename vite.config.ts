import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { fileURLToPath } from 'url';
import remarkToc from "remark-toc"


// https://vite.dev/config/
export default defineConfig({
  plugins: [mdx({
      remarkPlugins: [
        remarkGfm,
        [remarkToc, { heading: "목차", maxDepth: 3 }],
      ],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    }),
    react(), 
    tsconfigPaths()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy : {
      "/api" : {
        target : "http://localhost:8080",
        changeOrigin : true,
        secure: false,
        ws: true,
      }
    }
  }
});
