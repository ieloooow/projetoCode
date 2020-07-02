var templateBarra = `<img src="**FOTO**" width="35px"> 
                       Bem vindo **NOME**
                       (<a href="departamento.html?id=**IDDEP**">**DEPARTAMENTO**</a>)
                       <button type="button" class="logoff"  onclick="logout()" >Logoff</button>                      
                       `;

                       

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
        buscaParceiros();                                               
         
    }
}


var templateSelect=`
      <option value="**PARCEIROID**">**PARCEIRONOME**</option>`;

var selectInicio=`<label for="lparceiros">Parceiros:</label>
<select id="parceiro" onChange="update()">`;

var selectFim=`</select>`;

function preencheParceiros(resJson){
    console.log(resJson);
    var contSTR = "";

    for(i=0;i < resJson.length;i++){
        var parceiro = resJson[i];
        var  novaLinha= templateSelect.replace("**PARCEIRONOME**", parceiro.nome)
                                    .replace("**PARCEIROID**", parceiro.id);
                        
        contSTR = contSTR + novaLinha
    }


    document.getElementById("parceiros").innerHTML = selectInicio+contSTR+selectFim
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

function buscaParceiros(){
    fetch("http://localhost:8080/agentesfinanceiros")
            .then(res => res.json())
            .then(res => preencheParceiros(res))
}


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

var iniciotabela=`<table class="center">
<tr>
    <th scope="col"> Parceiro</th>
    <th scope="col"> Transacoes</th>
</tr>
`;


var fimTabela=`</table>`;


function update() {
            var select = document.getElementById('parceiro');
            var option = select.options[select.selectedIndex];

            document.getElementById("conteudoParceiro").innerHTML = "/agentesfinanceiros/"+option.value+"/dashboard"
            window.location.href = "dashboard.html?"+option.value
        }


