package br.com.isidrocorp.projeto.dto;

public class AgenteFinanceiroDash {
	private int id;
	private String nome;
	private float volume;
	private int   statusOk;
	private int   statusFalha;
	private int   statusFraude;
	
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
	public int getStatusOk() {
		return statusOk;
	}
	public void setStatusOk(int statusOk) {
		this.statusOk = statusOk;
	}
	public int getStatusFalha() {
		return statusFalha;
	}
	public void setStatusFalha(int statusFalha) {
		this.statusFalha = statusFalha;
	}
	public int getStatusFraude() {
		return statusFraude;
	}
	public void setStatusFraude(int statusFraude) {
		this.statusFraude = statusFraude;
	}
	

}
