package br.com.isidrocorp.projeto.dto;

public class Contadores {
	public int status;
	public long countStatus;
	
	
	public Contadores(int status, long countStatus) {
		super();
		this.status = status;
		this.countStatus = countStatus;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public long getCountStatus() {
		return countStatus;
	}
	public void setCountStatus(long countStatus) {
		this.countStatus = countStatus;
	}
	
	
}
