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
                         
                                 **NOME**
                       
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

function logout(){
    window.localStorage.clear();
    window.location="index.html";
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
                                                    
        carregarDashboard();                                            
         
    }
}
