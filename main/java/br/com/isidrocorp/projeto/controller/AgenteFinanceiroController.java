package br.com.isidrocorp.projeto.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import br.com.isidrocorp.projeto.dao.AgenteFinanceiroDAO;
import br.com.isidrocorp.projeto.dao.DepartamentoDAO;
import br.com.isidrocorp.projeto.model.AgenteFinanceiro;
import br.com.isidrocorp.projeto.model.Departamento;

@RestController
@CrossOrigin("*")
public class AgenteFinanceiroController {

	@Autowired
	AgenteFinanceiroDAO dao;
	
	@GetMapping("/agentefinanceiro")
	public ArrayList<AgenteFinanceiro> listarTodos(){
		ArrayList<AgenteFinanceiro> lista = (ArrayList<AgenteFinanceiro>)dao.findAllByOrderByVolumeDesc();
		return lista;
	}
	
}
