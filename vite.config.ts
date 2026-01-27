import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { fileURLToPath } from 'url';
import remarkToc from "remark-toc";
import { dirname, join, resolve } from 'path';
import fs from 'fs';
import type { IncomingMessage, ServerResponse } from 'http';
import tailwindcss from '@tailwindcss/vite'

// /files 경로를 형제 디렉터리로 서빙하는 플러그인
function serveImageFiles(): Plugin {
  return {
    name: 'serve-image-files',
    configureServer(server) {
      server.middlewares.use('/files', (req: IncomingMessage, res: ServerResponse) => {
        // 프로젝트 루트의 형제 디렉터리 경로 구성
        // vite.config.ts 파일의 위치에서 프로젝트 루트로 이동
        const configDir = dirname(fileURLToPath(import.meta.url));
        const projectRoot = resolve(configDir); // vite.config.ts가 루트에 있으므로 이미 프로젝트 루트
        const imageDir = resolve(projectRoot, '../archive-project-image');
        const filePath = join(imageDir, req.url || '');
        
        // 파일 존재 여부 확인
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          // MIME 타입 설정
          const ext = filePath.split('.').pop()?.toLowerCase();
          const mimeTypes: Record<string, string> = {
            'png': 'image/png',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'gif': 'image/gif',
            'webp': 'image/webp',
            'svg': 'image/svg+xml'
          };
          res.setHeader('Content-Type', mimeTypes[ext || ''] || 'application/octet-stream');
          res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1년 캐시
          
          // 파일 스트리밍
          const fileStream = fs.createReadStream(filePath);
          fileStream.pipe(res);
        } else {
          res.statusCode = 404;
          res.end('File not found');
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [
        remarkGfm,
        [remarkToc, { heading: "목차", maxDepth: 3 }],
      ],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    }),
    react(), 
    tsconfigPaths(),
    serveImageFiles(),
    tailwindcss()
  ],
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
      },
      "/files" : {
        target : "http://localhost:8080",
        changeOrigin : true,
        secure: false,
        ws: true,
      }
    },
    fs: {
      // 형제 디렉터리 접근 허용
      allow: ['..']
    }
  }
});
