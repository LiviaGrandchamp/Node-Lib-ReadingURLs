function extraiLinks(arrLinks){
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join()); //object.values retorna apenas o valor do objeto
};

async function checaStatus(listaURLs){

    const arrStatus = await Promise
    .all( 
        listaURLs.map(async (url) => {
            try{
                const response = await fetch(url);
                return response.status;
            } catch (erro){
                return manejaErros(erro);
            }
               
        })
    )
    return arrStatus;
   
};

function manejaErros(erro){
    if(erro.cause.code === 'ENOTFOUND'){
        return 'link nao encontrado :('
    } else {
        return 'ocorreu um erro :('
    }
};

async function listaValidada (listaDeLinks){
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links);

    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }))
};

export default listaValidada;
