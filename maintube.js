import { execFile } from "child_process"
import fs from 'fs';

import { spawn } from "child_process";

function run(cmd, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, options);

    let stderr = "";

    p.stderr?.on("data", d => stderr += d.toString());

    p.on("close", code => {
      if (code === 0) resolve(true);
      else reject(stderr || false);
    });
  });
}

/**
 * 1️⃣ Verifica se o WireGuard já está instalado
 */
async function isWireGuardInstalled() {
  try {
    await run("wg", ["--version"]);
    return true;
  } catch {
    return false;
  }
}

/**
 * 2️⃣ Testa se o sudo pede senha
 */
async function sudoNeedsPassword() {
  try {
    // -n = não perguntar senha
    await run("sudo", ["-n", "true"]);
    return false; // não pediu senha
  } catch {
    return true; // pediu senha
  }
}

/**
 * 3️⃣ Instala WireGuard
 */
async function installWireGuard() {
  console.log("📦 Instalando WireGuard...");
  await run("sudo", ["apt", "update"], { stdio: "inherit" });
  await run("sudo", ["apt", "install", "-y", "wireguard"], { stdio: "inherit" });
}

/**
 * Execução principal
 */
(async () => {
  console.log("🔍 Verificando WireGuard...");

  if (await isWireGuardInstalled()) {
    console.log("✅ WireGuard já está instalado");
    return;
  }

  console.log("❌ WireGuard NÃO está instalado");

  const needsPassword = await sudoNeedsPassword();

  if (needsPassword) {
    console.log("🔐 Sudo VAI pedir senha");
    console.log("👉 Execute este script com:");
    console.log("   sudo node wireguard-setup.js");
    return;
  }

  console.log("🔓 Sudo NÃO pede senha, continuando instalação...");
  await installWireGuard();

  console.log("✅ Instalação finalizada");
})();


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






