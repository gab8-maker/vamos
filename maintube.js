import { spawn } from "child_process";

function isWireGuardInstalled() {
  return new Promise(resolve => {
    const p = spawn("node", ["--version"]);

    p.on("close", code => {
      resolve(code === 0);
    });
  });
}

// Exemplo de uso
(async () => {
  const installed = await isWireGuardInstalled();
  console.log(installed ? "WireGuard instalado" : "WireGuard NÃO instalado");
})();




