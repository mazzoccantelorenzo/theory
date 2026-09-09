import { getDb } from "../../db/database";
import { CreateUserDto, UpdateUserDto, User } from "../user.model";

export class UserRepository {
  /**
   * Recupera tutti gli utenti dal database.
   */
  findAll(): User[] {
    const stmt = getDb().prepare<[], User>(
      "SELECT id, name, email, created_at AS createdAt FROM users"
    );
    return stmt.all();
  }

  /**
   * Recupera un singolo utente per ID.
   */
  findById(id: number): User | undefined {
    const stmt = getDb().prepare<[number], User>(
      "SELECT id, name, email, created_at AS createdAt FROM users WHERE id = ?"
    );
    return stmt.get(id);
  }

  /**
   * Inserisce un nuovo utente e restituisce il record creato.
   */
  create(dto: CreateUserDto): User {
    const stmt = getDb().prepare<[string, string]>(
      "INSERT INTO users (name, email) VALUES (?, ?)"
    );
    const result = stmt.run(dto.name, dto.email);
    const newUser = this.findById(result.lastInsertRowid as number);
    if (!newUser) {
      throw new Error("Failed to retrieve user after insert");
    }
    return newUser;
  }

  /**
   * Aggiorna i campi forniti per un utente esistente.
   * Restituisce il record aggiornato, o undefined se l'id non esiste.
   */
  update(id: number, dto: UpdateUserDto): User | undefined {
    // Mappa i campi DTO alle colonne SQL
    const fieldMap: Record<keyof UpdateUserDto, string> = {
      name: "name",
      email: "email",
    };

    const entries = (Object.keys(dto) as (keyof UpdateUserDto)[]).filter(
      (key) => dto[key] !== undefined
    );

    if (entries.length === 0) {
      // Nessun campo da aggiornare: restituisce l'utente com'è
      return this.findById(id);
    }

    const setClauses = entries.map((key) => `${fieldMap[key]} = ?`).join(", ");
    const values = entries.map((key) => dto[key] as string);

    const stmt = getDb().prepare<unknown[]>(
      `UPDATE users SET ${setClauses} WHERE id = ?`
    );
    stmt.run(...values, id);

    return this.findById(id);
  }
}
