package br.com.isidrocorp.projeto.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import br.com.isidrocorp.projeto.model.AgenteFinanceiro;

public interface AgenteFinanceiroDAO extends CrudRepository<AgenteFinanceiro, Integer> {
	//public List<AgenteFinanceiro> findAll();
	public List<AgenteFinanceiro> findAllByOrderByVolumeDesc();
}
