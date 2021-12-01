package app;

import static spark.Spark.*;
import service.Service;

public class Application {
	private static Service procxService = new Service();

	public static void main(String[] args) {
		// TODO Start APP >
		port(5432);
		post("/usuario", (request, response) -> procxService.addUsuario(request, response));
		get("/usuario/:email", (request, response) -> procxService.getUsuarioByEmail(request, response));
		
		get("/user/:id", (request, response) -> procxService.getUsuarioById(request, response));
		post("/usuario/:id", (request, response) -> procxService.updateUsuario(request, response));
		post("/usuarioLogin/:id", (request, response) -> procxService.updateUsuarioLogin(request, response));
		
		post("/createAtividade/:id", (request, response) -> procxService.addAtividade(request, response));
		post("/deleteAtividade/:id", (request, response) -> procxService.removeAtividade(request, response));
		get("/AllAtividades/:id", (request, response) -> procxService.getAllAtividades(request, response));
		get("/getAtividade/:id", (request, response) -> procxService.getAtividade(request, response));
		post("/atividadeUpdate/:id", (request, response) -> procxService.updateAtividade(request, response));
		
		post("/createRecompensa/:id", (request, response) -> procxService.addRecompensa(request, response));
	}

}
