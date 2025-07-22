import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Start the server
const server = spawn('tsx', ['server/index.ts'], {
  cwd: __dirname,
  stdio: 'inherit'
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

process.on('SIGINT', () => {
  console.log('Shutting down...');
  server.kill();
  process.exit();
});