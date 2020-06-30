package br.com.isidrocorp.projeto.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.isidrocorp.projeto.dao.UsuarioDAO;
import br.com.isidrocorp.projeto.model.Usuario;

@RestController
@CrossOrigin("*")
public class UsuarioController {

	@Autowired               // injecao da dependência
	private UsuarioDAO dao;
	
	@GetMapping("/usuarios")
	public ArrayList<Usuario> listarTudo(){
		ArrayList<Usuario> lista = (ArrayList<Usuario>)dao.findAll();
		return lista;
	}
	
	@PostMapping("/login")
	public ResponseEntity<Usuario> login(@RequestBody Usuario incompleto) {
		
		Usuario resultado = dao.findByRacfOrEmail(incompleto.getRacf(), incompleto.getEmail());
		if (resultado != null) {  // achei um usuario no banco!
			if (incompleto.getSenha().equals(resultado.getSenha())) { // as senhas coincidem??
				resultado.setSenha("*******");
				return ResponseEntity.ok(resultado); // o correto é transformar isso num token
			}
			else {
				return ResponseEntity.status(403).build(); // retorno "Forbidden"
			}
		}
		else {
			return ResponseEntity.status(404).build();   // retorno um status de "Não encontrado"
		}
		/*if (incompleto.getEmail() != null) {  // meu usuario do parametro vei com o email
			System.out.println("Recuperando pelo email!!!!! ");
			Usuario resultado = dao.findByEmailAndSenha(incompleto.getEmail(), incompleto.getSenha());
			
			return resultado;
		}
		else {  // nao veio com email, vou usar o RACF
			System.out.println("Recuperando pelo RACF!!!!");
			Usuario resultado = dao.findByRacfAndSenha(incompleto.getRacf(),  incompleto.getSenha());
			return resultado;
		}*/
	}
}
