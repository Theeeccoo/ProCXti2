/**
 * This code represents the table "User" of our PROCX's DATABASE.
 * Important attributes are being saved at our DATABASE
 */
package model;

import java.time.LocalDateTime;

/**
 * @author thico
 * > ProCX's User Class
 */
public class Usuario {
	// Data declaration
	private LocalDateTime dataLogin;
	private String email;
	private int id;
	private String nome;
	private String senha;
	
	// 							Class constructor
	/* Creates a new instance of User based on the information sent by parameters
	* @param Given information on registration
	*/
	public Usuario(int id, String email, String nome, String senha, LocalDateTime dataLogin){  
			setId(id);
			setEmail(email);
			setNome(nome);
			setSenha(senha);
			setDataLogin(dataLogin);
	}
	
	
	// 							Setters
	
	
	/**
	 * @param dataLogin the dataLogin to set
	 */
	public void setDataLogin(LocalDateTime dataLogin) {
		this.dataLogin = dataLogin;
	}
	
	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}
	
	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}
	
	/**
	 * @param nome the nome to set
	 */
	public void setNome(String nome) {
		this.nome = nome;
	}

	/**
	 * @param senha the senha to set
	 */
	public void setSenha(String senha) {
		this.senha = senha;
	}

	// 							Getters
	
	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * @return the dataLogin
	 */
	public LocalDateTime getDataLogin() {
		return dataLogin;
	}

	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}
	
	/**
	 * @return the nome
	 */
	public String getNome() {
		return nome;
	}
	
	/**
	 * @return the senha
	 */
	public String getSenha() {
		return senha;
	}
	
	
}
