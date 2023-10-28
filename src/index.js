import fs from 'fs';
import chalk from 'chalk';

function extraiLinks(texto){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)]; 
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}));
    return resultados.length !== 0 ? resultados : 'nao ha links no arquivo.';
};

function trataErro(erro){
    console.log(erro);
    throw new Error(chalk.red(erro.code, 'não foi possível encontrar o arquivo.'));
};

//--------------- Exemplo com async e await -------------------
async function pegaArquivo(caminhoDoArquivo){
    try{
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
        return extraiLinks(texto);
    } catch(erro){
        trataErro(erro);
    }
};

export default pegaArquivo;

/*------------------Exemplo com then----------------------
function pegaArquivo(caminhoDoArquivo){
    const encoding = 'utf-8';
    fs.promises
        .readFile(caminhoDoArquivo, encoding)
        .then((texto) => console.log(chalk.green(texto)))
        .catch(trataErro);
};*/