import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path');


export default defineConfig({
    resolve: {
      alias: {
        '../../injectionKeys': path.resolve(__dirname, './injectionKeys'),
        '../injectionKeys': path.resolve(__dirname, './injectionKeys'),
        '../streamsyncTypes': path.resolve(__dirname, './streamsyncTypes'),
      },
    },
    plugins: [vue()]
  })
  