var templateBarra = `
                        <br>
                        <br>  
                         <img src="**FOTO**" width="50px" height="50px"> 
                         <br>
                         
                                 **NOME**
                       
                       <br>
                       <br>
                      
                       `;
                       /*(<a href="departamento.html?id=**IDDEP**">**DEPARTAMENTO**</a>)--*/
var templateSelect=`
      <option value="**PARCEIROID**">**PARCEIRONOME**</option>`;

var selectInicio=`<label for="lparceiros">Parceiros:</label>
                 <select id="parceiro" onChange="update()">`;

var selectFim=`</select>`;

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
                     


function preencheParceiros(resJson){
    console.log(resJson);
    var contSTR = "";
    contSTR = contSTR + `<option value="default">Selecione Parceiro</option>`
    for(i=0;i < resJson.length;i++){
        var parceiro = resJson[i];
        var  novaLinha= templateSelect.replace("**PARCEIRONOME**", parceiro.nome)
                                    .replace("**PARCEIROID**", parceiro.id);
                        
        contSTR = contSTR + novaLinha
    }


    document.getElementById("parceiros").innerHTML = selectInicio+contSTR+selectFim
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

function update() {
            var select = document.getElementById('parceiro');
            var option = select.options[select.selectedIndex];

            document.getElementById("conteudoParceiro").innerHTML = "/agentesfinanceiros/"+option.value+"/dashboard"
            window.location = "dashboardNova.html?"+option.value
        }

function logout(){
            localStorage.clear();
            window.location="index.html";
        }  
