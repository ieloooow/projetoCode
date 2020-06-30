package br.com.isidrocorp.projeto.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import br.com.isidrocorp.projeto.dao.AgenteFinanceiroDAO;
import br.com.isidrocorp.projeto.dao.TransacaoDAO;
import br.com.isidrocorp.projeto.dto.AgenteFinanceiroDash;
import br.com.isidrocorp.projeto.dto.Contadores;
import br.com.isidrocorp.projeto.model.AgenteFinanceiro;
import br.com.isidrocorp.projeto.model.Transacao;

@RestController
@CrossOrigin("*")
public class AgenteFinanceiroController {
	
	@Autowired
	private AgenteFinanceiroDAO dao;
	
	@Autowired
	private TransacaoDAO dao2;
	
	@GetMapping("/agentesfinanceiros")
	public ArrayList<AgenteFinanceiro> recuperarTopTen(){
		ArrayList<AgenteFinanceiro> lista ;
		lista = (ArrayList<AgenteFinanceiro>)dao.findAllByOrderByVolumeDesc();
			
		return lista;
	}

	
	@GetMapping("/agentesfinanceiros/{id}")
	public ResponseEntity<AgenteFinanceiro> recuperarPeloId(@PathVariable int id){
		AgenteFinanceiro a = dao.findById(id).orElse(null);
		if (a != null) {
			return ResponseEntity.ok(a);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping("/agentesfinanceiros/{id}/dashboard")
	public ResponseEntity<AgenteFinanceiroDash> recuperaDashBoardPeloId(@PathVariable int id){
		AgenteFinanceiro a = dao.findById(id).orElse(null);
		if (a != null) {
			// agora faço a lógica da montagem do dashboard
			AgenteFinanceiroDash dash = new AgenteFinanceiroDash();
			dash.setId(a.getId());
			dash.setNome(a.getNome());
			dash.setVolume(a.getVolume());
			int totalOk = 0;
			int totalFalha = 0;
			int totalFraude = 0;
			for (Transacao tr : a.getListaTransacoes()) {
				switch(tr.getStatus()) {
				case 0: totalOk++; break;
				case 1: totalFalha++; break;
				case 2: totalFraude++; break;
				}
			}
			dash.setStatusOk(totalOk);
			dash.setStatusFalha(totalFalha);
			dash.setStatusFraude(totalFraude);
			return ResponseEntity.ok(dash);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/teste")
	public String teste() {
		
		System.out.println(dao2.getTotaisPorId(10).get(0).getClass().getName());
		
		ArrayList<Contadores> lista = dao2.getTotaisPorId(10);
		System.out.println(lista.size());
		for (Contadores i:lista) {
			System.out.println("Result = "+i.getStatus()+"/"+i.getCountStatus());
		}
	    return "xis";

	}
}
