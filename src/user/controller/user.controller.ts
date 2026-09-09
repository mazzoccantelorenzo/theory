import { CreateUserDto, UpdateUserDto } from "../user.model";
import { UserService } from "../service/user.service";

/**
 * Controller che espone le operazioni sugli utenti.
 * L'API è chiamata in-process (nessun HTTP layer).
 */
export class UserController {
  constructor(private readonly userService: UserService) {}

  handleGetAll(): void {
    console.log("[GET] /users");
    const users = this.userService.getAll();
    console.log("Response:", JSON.stringify(users, null, 2));
  }

  handleGetById(id: number): void {
    console.log(`[GET] /users/${id}`);
    try {
      const user = this.userService.getById(id);
      console.log("Response:", JSON.stringify(user, null, 2));
    } catch (err) {
      console.error("Error:", (err as Error).message);
    }
  }

  handleCreate(body: CreateUserDto): void {
    console.log("[POST] /users", body);
    try {
      const user = this.userService.create(body);
      console.log("Response (201):", JSON.stringify(user, null, 2));
    } catch (err) {
      console.error("Error:", (err as Error).message);
    }
  }

  handleUpdate(id: number, body: UpdateUserDto): void {
    console.log(`[PATCH] /users/${id}`, body);
    try {
      const user = this.userService.update(id, body);
      console.log("Response:", JSON.stringify(user, null, 2));
    } catch (err) {
      console.error("Error:", (err as Error).message);
    }
  }
}
