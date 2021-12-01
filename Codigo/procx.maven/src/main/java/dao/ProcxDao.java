package dao;

import java.sql.*;

import model.*;

/**
 * @author thico
 *
 */
public class ProcxDao {
	private Connection conexao;
	
	public ProcxDao() {
		conexao = null;
	}
	
    // CONNECTION //
	public boolean conectar() {
		String driverName = "org.postgresql.Driver";
		String serverName = "procxdb.postgres.database.azure.com";
		String mydatabase = "procxdb";
		int porta = 5432;
		String url = "jdbc:postgresql://" + serverName + ":" + porta + "/" + mydatabase;
		String username = "admprocx@procxdb";
		String password = "@Procxpw";
		boolean status = false;
		
		try {
			Class.forName(driverName);
			conexao = DriverManager.getConnection(url, username, password);
			status = (conexao == null);
			System.out.println("Conexão efetuada com o postgres!");
		} catch(ClassNotFoundException e) {
			System.err.println("Conexão NÃO efetuada com o postgres -- Driver não encontrado --" + e.getMessage());
		} catch (SQLException e) {
			System.err.println("Conexão NÃO efetuada com o postgres -- " + e.getMessage());						
		}
		
		return status;
	}
	
	public boolean close() {
		boolean status = false;
		
		try {
			conexao.close();
			status = true;
		} catch (SQLException e) {
			System.err.println(e.getMessage());
		}
		
		return status;
	}

    // =============================================================================================================================================================== //

    // "USUARIO" CRUD: //
	public boolean inserirUsuario(Usuario usuario) {
		boolean status = false;
		try {
			Statement st = conexao.createStatement();
			st.executeUpdate("INSERT INTO usuario (dataLogin, email, idUsuario, nome, senha)"
					       + "VALUES ('"+ usuario.getDataLogin() + "', '" + usuario.getEmail() + "', " 
					       + usuario.getId() + ", '" + usuario.getNome() + "', '" + usuario.getSenha() + "');");
			//st.execute("INSERT INTO usuario (id, email, nome, senha, dataLogin) VALUES (1, 'teste', 'joao', 'coxinha123', '2020-12-03T10:15:30'");
			st.close();
			status = true;
		} catch (SQLException u) {
			throw new RuntimeException(u);
		}
		return status;
	}
	
	public boolean atualizarUsuario(Usuario usuario) {
		boolean status = false;
		try {
			Statement st = conexao.createStatement();
			String sql = "UPDATE usuario SET idUSUARIO = '" + usuario.getId() + "', email = '"
					    + usuario.getEmail() + "', nome = '" + usuario.getNome() + "', senha = '"
					    + usuario.getSenha() + "', dataLogin = '" + usuario.getDataLogin() + "' WHERE idUSUARIO = " 
					    + usuario.getId();
			st.execute(sql);
			st.close();
			status = true;
		} catch (SQLException u) {
			throw new RuntimeException(u);
		}
		
		return status;
	}
	
	public boolean excluirUsuario(int id) {
		boolean status = false;
		try {  
			Statement st = conexao.createStatement();
			st.executeUpdate("DELETE FROM usuario WHERE idUSUARIO = " + id);
			st.close();
			status = true;
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		
		return status;
	}
	
	public Usuario[] getUsuarios() {
		Usuario[] usuarios = null;
		
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM usuario");
	        if(rs.next()){
				rs.last();
	            usuarios = new Usuario[rs.getRow()];
	            rs.beforeFirst();
	             
	            for(int i = 0; rs.next(); i++) {
					usuarios[i] = new Usuario(rs.getInt("idUsuario"), rs.getString("Email"), 
		                                  rs.getString("Nome"), rs.getString("Senha"), 
		                                  rs.getTimestamp("DataLogin").toLocalDateTime());// rs.getDate("dataVal").toLocalDate());

	             }
	          }
	          st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return usuarios;
	}
	
	public Usuario getUsuario(String email) {
		Usuario user1 = null;

		
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM usuario WHERE email = '"+ email +"'");

			if(rs.next()) {
				rs.last();
				user1 = new Usuario(rs.getInt("idUSUARIO"), rs.getString("email"), 
                        rs.getString("nome"), rs.getString("senha"), 
                        rs.getTimestamp("dataLogin").toLocalDateTime());// rs.getDate("dataVal").toLocalDate());
			}
		}catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return user1;
	}
	
	public Usuario getUsuarioById(int id) {
		Usuario user1 = null;
		
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM usuario WHERE idUSUARIO= "+ id);

			if(rs.next()) {
				rs.last();
				user1 = new Usuario(rs.getInt("idUSUARIO"), rs.getString("email"), 
                        rs.getString("nome"), rs.getString("senha"), 
                        rs.getTimestamp("dataLogin").toLocalDateTime());// rs.getDate("dataVal").toLocalDate());
			}
		}catch (Exception e) {
			System.err.println(e.getMessage());
		}
		
		return user1;
	}
	
	public int getMaxIDUser() {
		Usuario[] usuarios = getUsuarios();
		int id = 0;
		if(usuarios != null) {
			if(usuarios != null) {
				for(int i = 0; i < usuarios.length; i++) {
					if(usuarios[i].getId() > id) {
						id = usuarios[i].getId();
					}
				}			
			}
		}
		return id;
	}

    // =============================================================================================================================================================== //
    
	// "ATIVIDADE" CRUD: //
	public boolean inserirAtividade(Atividade atividade) {

		boolean status = false;
		try {
			Statement st = conexao.createStatement();
			st.executeUpdate("INSERT INTO atividade (descricao, estado_atividade, horario, idAtividade, idUsuario, nome)"
					       + "VALUES ('"+atividade.getDescricao() + "', " + atividade.isEstado_Atividade() + ", '" 
					       + atividade.getHorario() + "', " + atividade.getId() + ", " + atividade.getIdUsuario() + ", '" + atividade.getNome() + "');");
			//st.execute("INSERT INTO atividade (descricao, estado_atividade, horario, id, idUsuario, nome) VALUES ('matematica', true, '08:07', 1, 1, 'joao'");
			st.close();
			status = true;
		} catch (SQLException u) {
			throw new RuntimeException(u);
		}
		return status;
	}

    public boolean atualizarAtividade(Atividade atividade) {
		boolean status = false;
		try {
			Statement st = conexao.createStatement();
			String sql = "UPDATE atividade SET idAtividade = '" + atividade.getId() + "', descricao = '"
					    + atividade.getDescricao() + "', estado_atividade = " + atividade.isEstado_Atividade() + ", horario = '"
					    + atividade.getHorario() + "', idUsuario = '" + atividade.getIdUsuario() + "', nome = '" + atividade.getNome() + "' WHERE idAtividade = " 
					    + atividade.getId();
			st.execute(sql);
			st.close();
			status = true;
		} catch (SQLException u) {
			throw new RuntimeException(u);
		}
		
		return status;
	}
	
	public boolean excluirAtividade(int idUSUARIO, int id) {
		boolean status = false;
		try {  
			Statement st = conexao.createStatement();
			st.executeUpdate("DELETE FROM atividade WHERE idUsuario = " + idUSUARIO + "and idAtividade = " + id);
			st.close();
			status = true;
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		
		return status;
	}
	
	public Atividade[] getAtividades(int id) {
		Atividade[] atividade = null;
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM atividade where idUsuario = " + id);
	         if(rs.next()){
	             rs.last();
	             atividade = new Atividade[rs.getRow()];
	             rs.beforeFirst();
	             
	             for(int i = 0; rs.next(); i++) {
	                atividade[i] = new Atividade(rs.getString("descricao"), rs.getBoolean("estado_Atividade"), 
		                                  rs.getString("horario"), rs.getInt("idAtividade"), 
		                                  rs.getInt("idUsuario"), rs.getString("nome"));// rs.getDate("dataVal").toLocalDate());

	             }
	          }
	          st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return atividade;
	}
	
	public Atividade getAtividade(int idUSUARIO, int id ) {
		Atividade ativ1 = null;
		
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM atividade WHERE idUsuario = " + idUSUARIO + "and idAtividade = " + id);

			if(rs.next()) {
				rs.last();
				ativ1 = new Atividade(rs.getString("descricao"), rs.getBoolean("estado_Atividade"), 
		                                  rs.getString("horario"), rs.getInt("idAtividade"), 
		                                  rs.getInt("idUsuario"), rs.getString("nome"));// rs.getDate("dataVal").toLocalDate());
			}
		}catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return ativ1;
	}	
	
	public int getMaxIDAtiv(int idUSUARIO) {
		Atividade[] atividades = getAtividades(idUSUARIO);
		
		int id = 0;
		if(atividades != null) {
			for(int i = 0; i < atividades.length; i++) {
				if(atividades[i].getId() > id) {
					id = atividades[i].getId();
				}
			}
		}
		return id;
	}

    // =============================================================================================================================================================== //

    // "RECOMPENSA" CRUD: //
    public boolean inserirRecompensa(Recompensa recompensa) {
		boolean status = false;
		try {
			Statement st = conexao.createStatement();
			st.executeUpdate("INSERT INTO recompensa (descricao, idRecompensa, idUsuario)"
					       + "VALUES ('"+ recompensa.getDescricao() + "', '" + recompensa.getId() + "', '" + recompensa.getIdUsuario() + "');");
			st.close();
			status = true;
		} catch (SQLException u) {
			throw new RuntimeException(u);
		}
		return status;
	}

    public boolean atualizarRecompensa(Recompensa recompensa) {
		boolean status = false;
		try {
			Statement st = conexao.createStatement();
			String sql = "UPDATE recompensa SET descricao = " + recompensa.getDescricao() + ", idRecompensa = " + recompensa.getId() + ", idUsuario = '"
					    + recompensa.getIdUsuario() + "' WHERE id = " + recompensa.getId();
			st.execute(sql);
			st.close();
			status = true;
		} catch (SQLException u) {
			throw new RuntimeException(u);
		}
		
		return status;
	}
	
	public boolean excluirRecompensa(int id) {
		boolean status = false;
		try {  
			Statement st = conexao.createStatement();
			st.executeUpdate("DELETE FROM recompensa WHERE id = " + id);
			st.close();
			status = true;
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		
		return status;
	}
	
	
	public Recompensa[] getRecompensas(int idUsuario) {
		Recompensa[] recompensas = null;
		
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM recompensa WHERE idUsuario = " + idUsuario);
			if(rs.next()) {
				rs.last();
				recompensas = new Recompensa[rs.getRow()];
				rs.beforeFirst();
				for(int i = 0; rs.next(); i++) {
					recompensas[i] = new Recompensa(rs.getString("descricao"), rs.getInt("idRecompensa"), rs.getInt("idUsuario"));
					
				}
			}
			st.close();
		} catch(Exception e) {
			System.err.println(e.getMessage());
		}
		
		return recompensas;
	}
	
	
	public Recompensa getRecompensa(int id) {
		Recompensa recomp1 = null;
		
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM recompensa WHERE idUsuario = " + id);

			if(rs.next()) {
				rs.last();
				recomp1 = new Recompensa(rs.getString("descricao"), rs.getInt("idRecompensa"), 
		                                 rs.getInt("idUsuario"));
			}
		}catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return recomp1;
	}
	
	public int getMaxIDRecomp(int idUsuario) {
		Recompensa[] recompensa = getRecompensas(idUsuario);
		int id = 0;
		if(recompensa != null) {
			for(int i = 0; i < recompensa.length; i++) {
				if(recompensa[i].getId() > id) {
					id = recompensa[i].getId();
				}
			}		
		}
		
		return id;
	}
}

