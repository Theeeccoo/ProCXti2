/**
 * This code represents the table "Atividade" of our PROCX's DATABASE.
 * Important attributes are being saved at our DATABASE
 */
package model;

/**
 * @author thico
 * > ProCX's Atividade Class
 */
public class Atividade {
	// Data declaration
	private String descricao;
	private boolean estado_Atividade;
	private String horario;
	private int id;
	private int idUsuario;
	private String nome;
	
	
	// 							Class constructor
	/* Creates a new instance of User based on the information sent by parameters
	* @param Given information on registration
	*/
	public Atividade(String descricao, boolean estado_Atividade, String horario, int id, int idUsuario, String nome){  
			setDescricao(descricao);
			setEstado_Atividade(estado_Atividade);
			setHorario(horario);
			setId(id);
			setIdUsuario(idUsuario);
			setNome(nome);
	}

	
	// 							Setters

	/**
	 * @param descricao the descricao to set
	 */
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}


	/**
	 * @param estado_Atividade the estado_Atividade to set
	 */
	public void setEstado_Atividade(boolean estado_Atividade) {
		this.estado_Atividade = estado_Atividade;
	}


	/**
	 * @param horario the horario to set
	 */
	public void setHorario(String horario) {
		this.horario = horario;
	}


	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}


	/**
	 * @param idUsuario the idUsuario to set
	 */
	public void setIdUsuario(int idUsuario) {
		this.idUsuario = idUsuario;
	}


	/**
	 * @param nome the nome to set
	 */
	public void setNome(String nome) {
		this.nome = nome;
	}	
	
	
	// 							Getters

	/**
	 * @return the descricao
	 */
	public String getDescricao() {
		return descricao;
	}


	/**
	 * @return the estado_Atividade
	 */
	public boolean isEstado_Atividade() {
		return estado_Atividade;
	}


	/**
	 * @return the horario
	 */
	public String getHorario() {
		return horario;
	}


	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}


	/**
	 * @return the idUsuario
	 */
	public int getIdUsuario() {
		return idUsuario;
	}


	/**
	 * @return the nome
	 */
	public String getNome() {
		return nome;
	}		
	
}
