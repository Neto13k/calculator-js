document.addEventListener("DOMContentLoaded", () =>{
    const geral = document.getElementById ('geral');
    const visor = document.getElementById ('visor');
    const botoes = document.getElementById('botoes');
    const cliques = document.querySelectorAll('td'); //td pois é os botoes criados na tabela
    let historicocalculo = [] //array para armazenar os 5 ultimos calculos


    cliques.forEach(td =>{
        td.addEventListener("click",() => {
            const valor = td.textContent; // eventos de cliques

            if(valor === "C"){
                visor.textContent = ""
            } // se clicado C limpa a tela
            else if(valor === "="){
                let expressao = visor.textContent;
                let resultado
                try{
                    resultado= eval(expressao); //Calcula expressão
                    visor.textContent = resultado;
                }catch (erro){
                    visor.textContent= "Erro";
                    return
                }
                let horario = new Date().toLocaleTimeString("pt-br", {hour:"2-digit",minute:"2-digit"});
                historicocalculo.unshift({
                    expressao:expressao,
                    resultado:resultado,
                    horario:horario
                });
                if(historicocalculo.length > 5 ){ // mantem 5 registros no array
                    historicocalculo.pop(); 
                } 
                atualizarhistorico() //Atualiza a tabela no HTML

            }else{
                visor.textContent +=valor; // adiciona o valor ao visor
             }
        });
    });

    
    function atualizarhistorico(){ 
        const corpo = document.getElementById("Atualizarhistorico")
        corpo.innerHTML = ""

        //Cria linha e células da tabela
        historicocalculo.forEach(item =>{
            const linha = document.createElement("tr")

            const colunahora = document.createElement("td")
            colunahora.textContent = item.horario;

            const colunaexpressao = document.createElement("td")
            colunaexpressao.textContent = item.expressao

            const colunaresultado = document.createElement("td")
            colunaresultado.textContent = item.resultado

            //Adiciona células na linha
            linha.appendChild(colunahora);
            linha.appendChild(colunaexpressao);
            linha.appendChild(colunaresultado);

            //Torna as colunas clicáveis
            colunaexpressao.style.cursor = "pointer";
            colunaresultado.style.cursor = "pointer";

            colunaexpressao.addEventListener("click", ()=>{
                visor.textContent = item.expressao
            }); //Clique para repetir o cálculo


            colunaresultado.addEventListener("click", ()=>{
                visor.textContent = item.resultado;
            }); //Clique para repetir o resultado

            corpo.appendChild(linha) //Adiciona a linha na tabela do histórico
        });

    }
});