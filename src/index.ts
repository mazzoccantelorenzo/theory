import { runMigrations } from "./db/migrate";
import { closeDb } from "./db/database";
import { UserRepository } from "./user/repository/user.repository";
import { UserService } from "./user/service/user.service";
import { UserController } from "./user/controller/user.controller";

// --- Bootstrap ---
runMigrations();

// Dependency injection manuale (in-process)
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// --- Chiamate in-process all'API ---

// POST: crea due utenti
userController.handleCreate({ name: "Mario Rossi", email: "mario@example.com" });
userController.handleCreate({ name: "Luigi Verdi", email: "luigi@example.com" });

// GET all
userController.handleGetAll();

// GET by id
userController.handleGetById(1);

// GET non esistente
userController.handleGetById(999);

// PATCH: aggiorna solo il nome dell'utente 1
userController.handleUpdate(1, { name: "Mario Rossi Jr." });

// PATCH: aggiorna nome ed email dell'utente 2
userController.handleUpdate(2, { name: "Luigi Bianchi", email: "luigi.bianchi@example.com" });

// PATCH: utente inesistente
userController.handleUpdate(999, { name: "Fantasma" });

// PATCH: dto vuoto → errore di validazione
userController.handleUpdate(1, {});

// Cleanup
closeDb();
