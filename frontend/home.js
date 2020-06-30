var templateBarra = `<img src="**FOTO**" width="35px"> 
                       Bem vindo **NOME**
                       (<a href="departamento.html?id=**IDDEP**">**DEPARTAMENTO**</a>)`;

                       

function verificaUsuario(){
    // existe alguma info de "userDash" no armazenamento local?
    var userLogado = localStorage.getItem("userDash");
    if (!userLogado){
        // se não tiver, redireciona pra o INDEX  (ou seja, não tá logado)
        window.location="index.html";
    }
    else{
        // se tiver, mostra na barrinha
        var user = JSON.parse(userLogado);
        document.getElementById("barraUser").innerHTML = templateBarra
                                                    .replace("**FOTO**",user.linkFoto)
                                                    .replace("**NOME**", user.nome)
                                                    .replace("**IDDEP**",user.depto.id)
                                                    .replace("**DEPARTAMENTO**",user.depto.nome);    
                                                    
        buscaAgentes();                                                    
    }
}


/*
var templateAgentes = `<div class="row">
                        <div class="col-md-6">                        
                            NOME: **NOME** <br>
                        </div>
                        <div class="col-md-6">    
                            Numero Transcaoes: **TRANSCACOES** <br>
                        </div>
                   </div>`;
*/




function buscaAgentes(){
    fetch("http://localhost:8080/agentesfinanceiros")
            .then(res => res.json())
            .then(res => preencheAgente(res))
}


function preencheAgente(resJson) {
    console.log(resJson);
    var contSTR = "";

    // se existir mais e um agente
    if(resJson.length > 10){
        for (i = 0; i < 9; i++) {
            var agente = resJson[i];
                var novaLinha = templateAgentes.replace("**NOME**", agente.nome)
                        .replace("**TRANSCACOES**", agente.volume)
                contSTR = contSTR + novaLinha;
            }  
    }

    // numero de agentes menor que 10
    else{
        contSTR = contSTR + iniciotabela 
        for (i = 0; i < resJson.length; i++) {
            var agente = resJson[i];
                var novaLinha = templateAgentes.replace("**NOME**", agente.nome)
                        .replace("**TRANSCACOES**", agente.volume)
                contSTR = contSTR + novaLinha;
            }
            contSTR = contSTR + fimTabela   
    }

    document.getElementById("conteudo").innerHTML = contSTR;
}

var templateAgentes = `
                    <tr>                                            
                            <td>**NOME** </td>
                            <td>**TRANSCACOES** </td>
                    </tr>
                   `;

var iniciotabela=`<table>
<tr>
    <th scope="col"> Parceiro<th>
    <th scope="col"> Transacoes<th>
</tr>
`;


var fimTabela=`</table>`;