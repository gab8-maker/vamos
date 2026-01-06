import { spawn } from "child_process";

/**
 * Executa um comando Linux com spawn e retorna uma Promise
 */
function run(cmd, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: "inherit", ...options });

    p.on("error", err => reject(err));
    p.on("close", code => {
      if (code === 0) resolve(true);
      else reject(new Error(`Comando "${cmd} ${args.join(' ')}" falhou com código ${code}`));
    });
  });
}

/**
 * 1️⃣ Verifica se WireGuard está instalado
 */
function isWireGuardInstalled() {
  return new Promise(resolve => {
    const p = spawn("wg", ["--version"]);

    p.on("error", () => resolve(false)); // comando não existe
    p.on("close", code => resolve(code === 0));
  });
}

/**
 * 2️⃣ Instala WireGuard (Debian/Ubuntu)
 */
async function installWireGuard() {
  console.log("📦 Atualizando repositórios...");
  await run("sudo", ["apt", "update"]);

  console.log("📦 Instalando WireGuard...");
  await run("sudo", ["apt", "install", "-y", "wireguard"]);

  console.log("✅ WireGuard instalado com sucesso!");
}

/**
 * 3️⃣ Execução principal
 */
(async () => {
  const installed = await isWireGuardInstalled();

  if (installed) {
    console.log("✅ WireGuard já está instalado");
    return;
  }

  console.log("❌ WireGuard NÃO está instalado");
  console.log("🔐 Verifique se você tem permissão sudo...");

  try {
    await installWireGuard();
  } catch (err) {
    console.error("❌ Falha ao instalar WireGuard:", err.message);
    console.log("💡 Tente rodar o script com sudo:");
    console.log("   sudo node install-wireguard.js");
  }
})();
