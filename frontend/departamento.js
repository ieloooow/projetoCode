/*var templateUser = `<div class="card">              
                        <img src="**LINKFOTO**  style="width:100%">
                           <h3>**NOME**</h3>
                           Email: **EMAIL**
                           RACF:  **RACF**
                           <hr>
                    </div>`;*/

var templateUser= `
<h3>Departamento - **DEPARTAMENTO**</h3>
<div class="row">
<div a class="col-md-2 comborda">
   <img src="**LINKFOTO**" width="100%">
</div>
<div  b class="col-md-6 comborda">
    <h3> **NOME** </h3>
    Racf: **RACF** <br>
    Email: **EMAIL** <br>
</div>
</div>`;

function carregaDadosDepto(){
    var parametro = window.location.search;
    console.log("URL = "+parametro);

    var numDepto = parametro.substr(4);

    console.log("Numero do departamento = "+numDepto);

    // a partir daqui posso fazer um fetch no endpoint de departamento e
    // preencher um conjunto de linhas com todos os usuários daquele depto
    fetch("http://localhost:8080/departamentos/"+numDepto)
      .then(res => res.json())
      .then(res => preenche(res))
}

function preenche(res){
    console.log(res);    
    var linha = "";
    for (i=0; i<res.listaUsuarios.length; i++){
        var user = res.listaUsuarios[i];
        linha = linha + templateUser.replace("**NOME**",user.nome)
                                    .replace("**EMAIL**",user.email)
                                    .replace("**RACF**", user.racf)
                                    .replace("**LINKFOTO**", user.linkFoto)
                                    .replace("**DEPARTAMENTO**",res.nome);
    }
    document.getElementById("conteudo").innerHTML = linha;
}

