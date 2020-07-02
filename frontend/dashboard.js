
/*var templateAgentes=` Parceiro: **PARCEIRO** <br>
                      Transacoes: **TRANSACOES** <br>
                      Sucesso: **SUCESSO** <br>
                      Falhas: **FALHA** <br>
                      Fraudes: **FRAUDES**`;

function preencheAgente(resJson){
    console.log(resJson);
    var contSTR = "";

     var novaLinha = templateAgentes.replace("**PARCEIRO**", resJson.nome)
                                    .replace("**TRANSCACOES**", resJson.volume)
                                    .replace("**SUCESSO**", resJson.statusOk)
                                    .replace("**FALHA**", resJson.statusFalha)
                                    .replace("**FRAUDES**", resJson.statusFraude);
                
                    contSTR = contSTR + novaLinha;

                    document.getElementById("conteudoDashboard").innerHTML= contSTR
}  
    */


function carregarDashboard(){
    var  id = window.location.search.substring(1);
    fetch("http://localhost:8080/agentesfinanceiros/"+id+"/dashboard")
            .then(res => res.json())
            .then(res => preencheTabela(res))
}

function preencheTabela(resJson){
    console.log(resJson);
    var contSTR = "";
    
   var novaLinha = template.replace("**PARCEIRO**", resJson.nome)
                        .replace("**TRANSCACOES**", resJson.volume)
                         .replace("**SUCESSO**", resJson.statusOk)
                        .replace("**FALHA**", resJson.statusFalha)
                    .replace("**FRAUDES**", resJson.statusFraude);
                    contSTR = contSTR + novaLinha;
                    document.getElementById("conteudoDashboardTable").innerHTML= contSTR
}


var template= 
`     <table class="center">
    <tr>
        <th scope="col">**PARCEIRO**</th>
        <th scope="col">Transacoes</th>
    </tr>
    <tr>                                            
        <td>VOLUME </td>
        <td>**TRANSCACOES**</td>
    </tr
    <tr>                                            
        <td>SUCESSO</td>
        <td>**SUCESSO**</td>
    </tr>
    <tr>                                            
        <td>FALHA</td>
        <td>**FALHA**</td>
    </tr>  
    <tr>                                            
        <td>FRAUDES</td>
        <td>**FRAUDES**</td>
    </tr>
</table>
`

function logout(){
    localStorage.clear();
    window.location="index.html";
}           