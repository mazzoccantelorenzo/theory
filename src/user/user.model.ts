export interface User {
	id: number;
	name: string;
	email: string;
	createdAt: string;
}

export type CreateUserDto = Omit<User, "id" | "createdAt">;

/** Permette di aggiornare solo name, solo email, o entrambi. */
export type UpdateUserDto = Partial<CreateUserDto>;
