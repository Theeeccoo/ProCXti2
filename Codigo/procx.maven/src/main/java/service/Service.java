/**
 * 
 */
package service;


import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;

import java.time.format.DateTimeFormatter;
import java.util.Date;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

// Imports:
//import java.io.IOException;
import dao.ProcxDao;
import spark.Request;
import spark.Response;
import model.*;

/**
 * @author thico
 * 
 */
public class Service {
	private ProcxDao procxDao;
	
	public Service() {
		procxDao = new ProcxDao();
		procxDao.conectar();
	}

	// ======================================================================================================================= //
	
	// CRUD USUARIO //
	public Object addUsuario(Request request, Response response) {
		response.header("Content-Type", "application/json");
		response.header("Access-Control-Allow-Origin", "*");
		response.header("Access-Control-Allow-Methods", "POST, GET");
		response.header("Access-Control-Allow-Headers", "*");
		response.header("Access-Control-Max-Age", "86400");
		//response.header("Content-Encoding", "UTF-8");
		
		// Requesting the values
		String nome = request.queryParams("nome");
		String email = request.queryParams("email");
		String senha = request.queryParams("senha");

		
		int id = procxDao.getMaxIDUser() + 1;

		LocalDateTime lt = LocalDateTime.now();
		
		Usuario usuario = new Usuario(id, email, nome, senha, lt);
		procxDao.inserirUsuario(usuario);
		
		response.status(201); // Created

		return id;
	}
	
	public Object getUsuarioByEmail(Request request, Response response) {
		String email = request.params(":email");

		
		Usuario user = (Usuario) procxDao.getUsuario(email);
	
		if(user != null) {
			response.header("Content-Type", "application/json");
			response.header("Access-Control-Allow-Origin", "*");
			response.header("Access-Control-Allow-Methods", "POST, GET");
			response.header("Access-Control-Allow-Headers", "*");
			response.header("Access-Control-Max-Age", "86400");
			response.header("Content-Encoding", "UTF-8");
			
			JSONObject obj = new JSONObject();
			obj.put("senha", user.getSenha());
			obj.put("id", user.getId());

			
			return obj;
		}else {
			response.status(404); // Not found
			return null;
		}
	}
	
	public Object getUsuarioById(Request request, Response response) {
		int id = Integer.parseInt(request.params(":id"));
		
		Usuario user = (Usuario) procxDao.getUsuarioById(id);
	
		if(user != null) {
			response.header("Content-Type", "application/json");
			response.header("Access-Control-Allow-Origin", "*");
			response.header("Access-Control-Allow-Methods", "POST, GET");
			response.header("Access-Control-Allow-Headers", "*");
			response.header("Access-Control-Max-Age", "86400");
			response.header("Content-Encoding", "UTF-8");
			
			JSONObject obj = new JSONObject();
			obj.put("senha", user.getSenha());
			obj.put("id", user.getId());
			obj.put("nome", user.getNome());
			obj.put("email", user.getEmail());
			//java.sql.Timestamp.valueOf(user.getDataLogin())
			Date in = java.sql.Timestamp.valueOf(user.getDataLogin());
			SimpleDateFormat format = new SimpleDateFormat("DDmmYYYY");
			
			obj.put("dataLogin", "/Date(" + in + ")/");
			
			
			return obj;
		}else {
			response.status(404); // Not found
			return null;
		}
	}
	
	public Object updateUsuarioLogin(Request request, Response response) {
		int id = Integer.parseInt(request.params(":id"));

		Usuario usuario = (Usuario) procxDao.getUsuarioById(id);
		
		if(usuario != null) {
			response.header("Content-Type", "application/json");
			response.header("Access-Control-Allow-Origin", "*");
			response.header("Access-Control-Allow-Methods", "POST, GET");
			response.header("Access-Control-Allow-Headers", "*");
			response.header("Access-Control-Max-Age", "86400");
			response.header("Content-Encoding", "UTF-8");			
			usuario.setDataLogin(LocalDateTime.now());
			        	
        	procxDao.atualizarUsuario(usuario);
        	return id;
		}else {
			response.status(404); // 404 Not found
			return null;
		}
	}
	
	public Object updateUsuario(Request request, Response response) {
		int id = Integer.parseInt(request.params(":id"));
		
		Usuario usuario = (Usuario) procxDao.getUsuarioById(id);
		
		if(usuario != null) {
			response.header("Content-Type", "application/json");
			response.header("Access-Control-Allow-Origin", "*");
			response.header("Access-Control-Allow-Methods", "POST, GET");
			response.header("Access-Control-Allow-Headers", "*");
			response.header("Access-Control-Max-Age", "86400");
			response.header("Content-Encoding", "UTF-8");
			usuario.setDataLogin(LocalDateTime.now());
			usuario.setEmail(request.queryParams("email"));
	       	usuario.setNome(request.queryParams("nome"));
        	usuario.setSenha(request.queryParams("senha"));
			        	
        	procxDao.atualizarUsuario(usuario);
        	return id;
		}else {
			response.status(404); // 404 Not found
			return null;
		}
	}
	
	public Object removeUsuario(Request request, Response response) {
		int id = Integer.parseInt(request.params(":id"));

		Usuario usuario = (Usuario) procxDao.getUsuario("A");

		if(usuario != null) {
			procxDao.excluirUsuario(usuario.getId());
			
			response.status(200); // Success
			return id;			
		} else {
			response.status(404); // Not found
			return "Usuario não encontrado";
		}
	}
	
	public Object getAllUsuarios(Request request, Response response) {
		StringBuffer returnValue = new StringBuffer("<usuario type=\"array\">");
		if(procxDao.getUsuarios() != null) {
			for(Usuario usuario : procxDao.getUsuarios()) {
				returnValue.append(
					"<usuario>\n" + 
		    		"\t<id>" + usuario.getId() + "</id>\n" +
		    		"\t<email>" + usuario.getEmail() + "</email>\n" +
		    		"\t<nome>" + usuario.getNome() + "</nome>\n" +
		    		"\t<senha>" + usuario.getSenha() + "</senha>\n" +
		    		"\t<dataLogin>" + usuario.getDataLogin() + "</dataLogin>\n" +
		    		"</usuario>\n");
			}
		}else {
			returnValue.append("\nNão há usuarios cadastrados");
		}
		returnValue.append("</usuario>");
		response.header("Content-Type", "application/xml");
		response.header("Content-Encoding", "UTF-8");
		return returnValue.toString();
	}

	// ======================================================================================================================= //
	
	// CRUD ATIVIDADE //
	
	public Object addAtividade(Request request, Response response) {
		response.header("Content-Type", "application/json");
		response.header("Access-Control-Allow-Origin", "*");
		response.header("Access-Control-Allow-Methods", "POST, GET");
		response.header("Access-Control-Allow-Headers", "*");
		response.header("Access-Control-Max-Age", "86400");
		int idUsuario = Integer.parseInt(request.params(":id"));

		// Requesting the values
		String descricao = request.queryParams("descricao");
		String horario = request.queryParams("horario");
		String nome = request.queryParams("nome");
		
		int id = procxDao.getMaxIDAtiv(idUsuario) + 1;


		boolean estado_Atividade = false;
		
		Atividade atividade = new Atividade(descricao, estado_Atividade, horario, id, idUsuario, nome);
		
		procxDao.inserirAtividade(atividade);
		
		response.status(201); // Created
		return id;
	}
	
	public Object getAtividade(Request request, Response response) {
		int idUSUARIO = Integer.parseInt(request.params(":id"));
		int id = Integer.parseInt(request.queryParams("id"));
		
		
		Atividade atividade = (Atividade) procxDao.getAtividade(idUSUARIO, id);
		
		if(atividade != null) {
			response.header("Content-Type", "application/json");
			response.header("Access-Control-Allow-Origin", "*");
			response.header("Access-Control-Allow-Methods", "POST, GET");
			response.header("Access-Control-Allow-Headers", "*");
			response.header("Access-Control-Max-Age", "86400");
			response.header("Content-Encoding", "UTF-8");
			
			JSONObject obj = new JSONObject();
			obj.put("descricao", atividade.getDescricao());
			obj.put("id", atividade.getId());
			obj.put("nome", atividade.getNome());
			obj.put("Estado_Atividade", atividade.isEstado_Atividade());
			obj.put("idUsuario", atividade.getIdUsuario());
			obj.put("horario", atividade.getHorario());
			
			return obj;			
		}else {
			response.status(404); // Not found
			return null;
		}
	}
	
	public Object updateAtividade(Request request, Response response) {
		int idUSUARIO = Integer.parseInt(request.params(":id"));
		int id = Integer.parseInt(request.queryParams("id"));

		Atividade atividade = (Atividade) procxDao.getAtividade(idUSUARIO,id);
		
		if(atividade != null) {
			response.header("Content-Type", "application/json");
			response.header("Access-Control-Allow-Origin", "*");
			response.header("Access-Control-Allow-Methods", "POST, GET");
			response.header("Access-Control-Allow-Headers", "*");
			response.header("Access-Control-Max-Age", "86400");
			response.header("Content-Encoding", "UTF-8");
			atividade.setDescricao(request.queryParams("descricao"));
			atividade.setEstado_Atividade(Boolean.parseBoolean(request.queryParams("Estado_Atividade")));
	       	atividade.setHorario(request.queryParams("horario"));
			atividade.setIdUsuario(Integer.parseInt(request.queryParams("idUsuario")));
			atividade.setNome(request.queryParams("nome"));

        	procxDao.atualizarAtividade(atividade);
        	return id;
		}else {
			response.status(404); // 404 Not found
			return null;
		}
	}
	
	public Object removeAtividade(Request request, Response response) {
		int idUSUARIO = Integer.parseInt(request.params(":id"));
		int id = Integer.parseInt(request.queryParams("id"));

		Atividade atividade = (Atividade) procxDao.getAtividade(idUSUARIO, id);

		if(atividade != null) {
			response.header("Content-Type", "application/json");
			response.header("Access-Control-Allow-Origin", "*");
			response.header("Access-Control-Allow-Methods", "POST, GET");
			response.header("Access-Control-Allow-Headers", "*");
			response.header("Access-Control-Max-Age", "86400");
			response.header("Content-Encoding", "UTF-8");
			procxDao.excluirAtividade(atividade.getIdUsuario(),atividade.getId());
			
			response.status(200); // Success
			return id;			
		} else {
			response.status(404); // Not found
			return null;
		}
	}
	
	public Object getAllAtividades(Request request, Response response) {
		int id = Integer.parseInt(request.params(":id"));

		JSONArray arr = new JSONArray();

		response.header("Content-Type", "application/json");
		response.header("Access-Control-Allow-Origin", "*");
		response.header("Access-Control-Allow-Methods", "POST, GET");
		response.header("Access-Control-Allow-Headers", "*");
		response.header("Access-Control-Max-Age", "86400");
		response.header("Content-Encoding", "UTF-8");

		if(procxDao.getAtividades(id) != null) {
			for(Atividade atividade : procxDao.getAtividades(id)) {
				JSONObject obj = new JSONObject();
				obj.put("id", atividade.getId());
				obj.put("nome", atividade.getNome());
				obj.put("descricao", atividade.getDescricao());
				obj.put("horario", atividade.getHorario());
				obj.put("estado_Atividade", atividade.isEstado_Atividade());
				obj.put("idUSUARIO", atividade.getIdUsuario());
				
				arr.add(obj);
			}
		}else {
			
			arr = null;
		}
		return arr;
	}




	// ======================================================================================================================= //
	
	// CRUD RECOMPENSA //
	public Object addRecompensa(Request request, Response response) {
		response.header("Content-Type", "application/json");
		response.header("Access-Control-Allow-Origin", "*");
		response.header("Access-Control-Allow-Methods", "POST, GET");
		response.header("Access-Control-Allow-Headers", "*");
		response.header("Access-Control-Max-Age", "86400");
		response.header("Content-Encoding", "UTF-8");
		int idUsuario = Integer.parseInt(request.params(":id"));
		// Requesting the values
		String info = request.queryParams("recompensa");
		int id = procxDao.getMaxIDRecomp(idUsuario) + 1;
		
		
		Recompensa recompensa = new Recompensa(info, id, idUsuario);
		
		procxDao.inserirRecompensa(recompensa);
		
		response.status(201); // Created
		return id;
	}

	public Object getRecompensa(Request request, Response response) {
		int id = Integer.parseInt(request.params(":id"));
		
		Recompensa reward = (Recompensa) procxDao.getRecompensa(id);
		
		if(reward != null) {
			response.header("Content-Type", "application/xml");
			response.header("Content-Encoding", "UTF-8");
			
			return "<recompensa>\n" + 
		    		"\t<descricao>" + reward.getDescricao() + "</descricao>\n" +
		    		"\t<id>" + reward.getId() + "</id>\n" +
					"\t<idAtividade>" + reward.getIdUsuario() + "</idRecompensa>\n" +
		    		"</recompensa>\n";
		}else {
			response.status(404); // Not found
			return "Recompensa " + id + " não encontrado.";
		}
	}
	
	public Object updateRecompensa(Request request, Response response) {
		int id = Integer.parseInt(request.params(":id"));
		
		Recompensa reward = (Recompensa) procxDao.getRecompensa(id);
		
		if(reward != null) {
			reward.setDescricao(request.queryParams("descricao"));
			        	
        	procxDao.atualizarRecompensa(reward);
        	return id;
		}else {
			response.status(404); // 404 Not found
			return "Recompensa não encontrado";
		}
	}
	
	public Object removeRecompensa(Request request, Response response) {
        int id = Integer.parseInt(request.params(":id"));

        Recompensa reward = (Recompensa) procxDao.getRecompensa(id);

        if(reward != null) {
			procxDao.excluirRecompensa(reward.getId());
			
			response.status(200); // Success
			return id;			
		} else {
			response.status(404); // Not found
			return "Recompensa não encontrado";
		}
	}

	public Object getAllRecompensas(Request request, Response response) {
		StringBuffer returnValue = new StringBuffer("<recompensa type=\"array\">");

		if(procxDao.getRecompensas(0) != null) {
			for(Recompensa reward : procxDao.getRecompensas(0)) {
				returnValue.append(
					"<recompensa>\n" + 
		    		"\t<descricao>" + reward.getDescricao() + "</descricao>\n" +
		    		"\t<id>" + reward.getId() + "</id>\n" +
					"\t<idRecompensa>" + reward.getIdUsuario() + "</idRecompensa>\n" +
		    		"</recompensa>\n");
			}
		}else {
			returnValue.append("\nNão há recompensas cadastradas");
		}
		returnValue.append("</recompensa>");
		response.header("Content-Type", "application/xml");
		response.header("Content-Encoding", "UTF-8");
		return returnValue.toString();
	}
}