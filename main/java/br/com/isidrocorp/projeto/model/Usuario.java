package br.com.isidrocorp.projeto.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="tbl_usuario")
public class Usuario {

	
	//
	 @Id
	 @GeneratedValue(strategy=GenerationType.IDENTITY)
	 @Column(name="idusuario")
	 private int id;
	 
	 @Column(name="nome",length=100,nullable=false)
	 private String nome;
	 
	 @Column(name="email",length=100,nullable=true,unique=true)
	 private String email;
	 
	 @Column(name="racf",length=7,nullable=true,unique=true)
	 private String racf;
	 
	 @Column(name="senha",length=30)
	 private String senha;
	 
	 @Column(name="linkfoto",length=200)
	 private String linkFoto;
	 
	 @JsonIgnoreProperties("listaUsuarios")
	 @ManyToOne
	 private Departamento depto;
	 
	public int getId() {
		return id;
	}

	public String getNome() {
		return nome;
	}

	public String getEmail() {
		return email;
	}

	public String getRacf() {
		return racf;
	}

	public String getSenha() {
		return senha;
	}

	public String getLinkFoto() {
		return linkFoto;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setRacf(String racf) {
		this.racf = racf;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}


	public void setLinkFoto(String linkFoto) {
		this.linkFoto = linkFoto;
	}

	public Departamento getDepto() {
		return depto;
	}

	public void setDepto(Departamento depto) {
		this.depto = depto;
	}
	 
	 
}
