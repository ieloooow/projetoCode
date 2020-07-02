
var templateAgentes=` Parceiro: **PARCEIRO** <br>
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
    


function carregarDashboard(){
    var  id = window.location.search.substring(1);
    fetch("http://localhost:8080/agentesfinanceiros/"+id+"/dashboard")
            .then(res => res.json())
            .then(res => preencheAgente(res))
}

