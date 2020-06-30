package br.com.isidrocorp.projeto.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="mtb310_ag_financeiro")
public class AgenteFinanceiro {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_agente")
	private int id;
	
	@Column(name="nome_agente")
	private String nome;
	
	@Column(name="volume_transacional")
	private float volume;
	
	@JsonIgnoreProperties("agente")
	@OneToMany(mappedBy="agente", cascade=CascadeType.ALL)
	private List<Transacao> listaTransacoes;

	
	public List<Transacao> getListaTransacoes() {
		return listaTransacoes;
	}

	public void setListaTransacoes(List<Transacao> listaTransacoes) {
		this.listaTransacoes = listaTransacoes;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public float getVolume() {
		return volume;
	}

	public void setVolume(float volume) {
		this.volume = volume;
	}
	
	
	
	

}
