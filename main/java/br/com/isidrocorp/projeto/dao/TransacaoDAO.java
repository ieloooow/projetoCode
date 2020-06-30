package br.com.isidrocorp.projeto.dao;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import br.com.isidrocorp.projeto.dto.Contadores;
import br.com.isidrocorp.projeto.model.Transacao;

public interface TransacaoDAO extends CrudRepository<Transacao, Integer>{
	@Query("SELECT new br.com.isidrocorp.projeto.dto.Contadores(t.status, count(t.status)) FROM Transacao t WHERE agente.id=:id GROUP BY status")
	public ArrayList<Contadores> getTotaisPorId(@Param("id") int id);
	
}
