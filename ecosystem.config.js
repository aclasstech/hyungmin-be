import { cpus } from 'node:os'

const cpuLen = cpus().length

module.exports = {
  apps: [
    {
      name: 'a1-math-club',
      script: './dist/main.js',
      autorestart: true,
      exec_mode: 'cluster',
      watch: false,
      instances: cpuLen,
      max_memory_restart: '1G',
      args: '',
      env: {
        NODE_ENV: 'development',
        PORT: process.env.APP_PORT,
      },
    },
  ],
}
