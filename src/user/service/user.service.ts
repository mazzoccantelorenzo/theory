import { CreateUserDto, UpdateUserDto, User } from "../user.model";
import { UserRepository } from "../repository/user.repository";

export class UserService {
	constructor(private readonly userRepository: UserRepository) { }

	/**
	 * 
	 * Restituisce la lista di tutti gli utenti.
	 */
	getAll(): User[] {
		return this.userRepository.findAll();
	}

	/**
	 * Restituisce un utente per ID.
	 * Lancia un errore se non trovato.
	 */
	getById(id: number): User {
		const user = this.userRepository.findById(id);
		if (!user) {
			throw new Error(`User with id ${id} not found`);
		}
		return user;
	}

	/**
	 * Crea un nuovo utente.
	 */
	create(dto: CreateUserDto): User {
		if (!dto.name || !dto.email) {
			throw new Error("name and email are required");
		}
		return this.userRepository.create(dto);
	}

	reduceNameIfEmailWithoutAt(id: number): User {

		const user = this.userRepository.findById(id);
		if (!user) {
			throw new Error(`User with id ${id} not found`);
		}

		if (!user.email.includes("@")) {
			user.name = user.name + "test";

		}
		return this.userRepository.update(id, { name: user.name });
	}

	/**
	 * Aggiorna un utente esistente.
	 * Lancia un errore se l'utente non esiste o se il dto è vuoto.
	 */
	update(id: number, dto: UpdateUserDto): User {
		if (!dto.name && !dto.email) {
			throw new Error("At least one field (name or email) must be provided");
		}
		const existing = this.userRepository.findById(id);
		if (!existing) {
			throw new Error(`User with id ${id} not found`);
		}
		const updated = this.userRepository.update(id, dto);
		if (!updated) {
			throw new Error(`Failed to retrieve user after update`);
		}
		return updated;
	}

}
