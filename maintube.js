import { execFile } from "child_process"
import fs from 'fs';

const { spawn } = require("child_process");

/**
 * Executa um comando Linux genérico
 */
function runCommand(cmd, args = []) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args);

    let output = "";
    let error = "";

    proc.stdout.on("data", data => {
      output += data.toString();
    });

    proc.stderr.on("data", data => {
      error += data.toString();
    });

    proc.on("close", code => {
      if (code === 0) {
        resolve(output.trim());
      } else {
        reject(error || `Erro ao executar ${cmd}`);
      }
    });
  });
}

/**
 * Retorna o IP público atual
 */
async function getPublicIP() {
  try {
    const ip = await runCommand("curl", ["-s", "ifconfig.me"]);
    return ip;
  } catch (err) {
    return "Erro ao obter IP";
  }
}

/**
 * Exemplo de uso
 */
(async () => {
  const ip = await getPublicIP();
  console.log("🌍 IP atual:", ip);
})();


execFile('./yt-dlp', ["-x", "https://www.youtube.com/watch?v=2aSJCWtSIiw", "--audio-format", " mp3", "--audio-quality", " 320k"], async (err, stdout) => {
    if (err) {
        console.error("Erro", err.message);
        return;
    }
    console.log(stdout)
    findFile()
})

const findFile = () => {
    const pasta = './';
    // Regex para procurar arquivos que começam com "teste" e terminam com ".txt"
    const regex = /2aSJCWtSIiw/;

    fs.readdir(pasta, (err, arquivos) => {
        if (err) {
            console.error('Erro ao ler a pasta:', err);
            return;
        }

        // Filtra arquivos pelo regex
        const arquivosEncontrados = arquivos.filter(arquivo => regex.test(arquivo));

        console.log('Arquivos encontrados:', arquivosEncontrados);
    });
}




