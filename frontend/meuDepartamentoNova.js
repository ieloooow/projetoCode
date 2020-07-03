/*var templateUser = `<div class="card">              
                        <img src="**LINKFOTO**  style="width:100%">
                           <h3>**NOME**</h3>
                           Email: **EMAIL**
                           RACF:  **RACF**
                           <hr>
                    </div>`;*/

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
                    var templateDepartamento='<h3>Departamento - **DEPARTAMENTO**</h3>'

                    var templateUser= `
                    <div class="row">
                    <div a class="col-md-2 comborda">
                       <img src="**LINKFOTO**" width="100px" height="100px">
                    </div>
                    <div  b class="col-md-6 comborda">
                        <h3> **NOME** </h3>
                        Racf: **RACF** <br>
                        Email: **EMAIL** <br>
                    </div>
                    </div>`;
                    
                    function carregaDadosDepto(){
                        var userLogado = localStorage.getItem("userDash");
                        var user = JSON.parse(userLogado);
                        console.log("Numero do departamento = "+user.depto.id);
                        // a partir daqui posso fazer um fetch no endpoint de departamento e
                        // preencher um conjunto de linhas com todos os usuários daquele depto
                        fetch(("http://localhost:8080/departamentos/" +user.depto.id))
                          .then(res => res.json())
                          .then(res => preenche(res))
                    }
                    
                    function preenche(res){
                        console.log(res);    
                        var linha = "";

                        linha = linha + templateDepartamento.replace("**DEPARTAMENTO**",res.nome);
                        for (i=0; i<res.listaUsuarios.length; i++){
                            var user = res.listaUsuarios[i];
                            linha = linha + templateUser.replace("**NOME**",user.nome)
                                                        .replace("**EMAIL**",user.email)
                                                        .replace("**RACF**", user.racf)
                                                        .replace("**LINKFOTO**", user.linkFoto)
                                                        
                        }
                        document.getElementById("conteudo").innerHTML = linha;
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
                                                                        
                                                                        carregaDadosDepto();                                            
                             
                        }
                    }
                    
                    function logout(){
                        window.localStorage.clear();
                        window.location="indexNova.html";
                    }
                                        