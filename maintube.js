import { execFile } from "child_process"
import fs from 'fs';

execFile('./yt-dlp.exe', ["-x", "https://www.youtube.com/watch?v=2aSJCWtSIiw", "--audio-format", " mp3", "--audio-quality", " 320k"], async (err, stdout) => {
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


