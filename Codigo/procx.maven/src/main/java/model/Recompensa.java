/**
 * This code represents the table "Recompensa" of our PROCX's DATABASE.
 * Important attributes are being saved at our DATABASE
 */
package model;

/**
 * @author thico
 * > ProCX's Recompensa Class
 */
public class Recompensa {
	// Data declaration
	private String descricao;
	private int id;
	private int idUsuario;
	
	// 							Class constructor
	/* Creates a new instance of User based on the information sent by parameters
	* @param Given information on registration
	*/	
	public Recompensa(String descricao, int id, int idUsuario){
			setDescricao(descricao);
			setId(id);
			setIdUsuario(idUsuario);		
	}
	
	// 							Setters
	
	/**
	 * @param descricao the descricao to set
	 */
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * @param idAtividade the idAtividade to set
	 */
	public void setIdUsuario(int idUsuario) {
		this.idUsuario = idUsuario;
	}

	// 							Getters
	
	/**
	 * @return the descricao
	 */
	public String getDescricao() {
		return descricao;
	}

	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}

	/**
	 * @return the idAtividade
	 */
	public int getIdUsuario() {
		return idUsuario;
	}

}
