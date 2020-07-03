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
var templateBarra = `
                        <br>
                        <br>  
                         <img src="**FOTO**" width="50px" height="50px"> 
                         <br>
                         
                         &nbsp   **NOME**  &nbsp
                       
                       <br>
                       <br>
                      
                       `;
                       /*(<a href="departamento.html?id=**IDDEP**">**DEPARTAMENTO**</a>)--*/



function carregarDashboard(){
    var  id = window.location.search.substring(1);
    fetch("http://localhost:8080/agentesfinanceiros/"+id+"/dashboard")
            .then(res => res.json())
            .then(res => preencheTabela(res))
}


function preencheTabela(resJson, tipo){
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

function logout(){
    window.localStorage.clear();
    window.location="indexNova.html";
}


function verificaUsuario(){
    // existe alguma info de "userDash" no armazenamento local?
    var userLogado = localStorage.getItem("userDash");
    if (!userLogado){
        // se não tiver, redireciona pra o INDEX  (ou seja, não tá logado)
        window.location="indexNova.html";
    }
    else{
        // se tiver, mostra na barrinha
        var user = JSON.parse(userLogado);
        document.getElementById("barraUser").innerHTML = templateBarra
                                                    .replace("**FOTO**",user.linkFoto)
                                                    .replace("**NOME**", user.nome)
                                                    .replace("**IDDEP**",user.depto.id)
                                                    .replace("**DEPARTAMENTO**",user.depto.nome);    
                                                    
        carregarDashboard();   
        carregaDash();                                         
         
    }
}


function preencheTudao(res){
    document.getElementById("statusOk").innerHTML = "<h3>SUCESSO "+res.statusOk+"</h3>";
    document.getElementById("statusFalha").innerHTML = "<h3>FALHA  "+res.statusFalha+"</h3>";
    document.getElementById("statusFraude").innerHTML = "<h3>FRAUDE  "+res.statusFraude+"</h3>";
    document.getElementById("nomeAgente").innerHTML="<h2>"+res.nome+"</h2>";
    document.getElementById("volumeAgente").innerHTML="<h2>Volume: "+res.volume+"</h2>";

    var ctx = document.getElementById("meuGrafico").getContext("2d");
    ctx.clearRect(0, 0, meuGrafico.width, meuGrafico.height);

    var grafico='';
    

    // criando a variavel do tipo grafico
    var grafico =  new Chart(ctx,
        {
            type: 'doughnut',
            data: {
                labels: ['Sucesso', 'Falhas', 'Fraude'],
                datasets: [{
                    label: 'Transacoes nas ultimas 24h',
                    backgroundColor: [ 
                        '#208000',
                        '#ebe134',
                        '#ff0000',
                    ],
                    data:[res.statusOk, res.statusFalha, res.statusFraude]
                }]
            }
        });

}


function carregaDash(tipo){
    var idDash = window.location.search.substr(1);
    console.log("ID"+idDash);

    fetch(("http://localhost:8080/agentesfinanceiros/"+idDash+"/dashboard"))
       .then(res => res.json())
       .then(res => preencheTudao(res,tipo));
}


