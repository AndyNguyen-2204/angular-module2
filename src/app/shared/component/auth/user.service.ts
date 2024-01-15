import { UserModel } from './type/user';
import { BehaviorSubject, Observable, of } from 'rxjs';

export class UserService {
  private roles = ['user', 'admin', 'editor'];
  private localStorageKey = 'listUser';
//   private demoUsers: UserModel[]; // Declare demoUsers as a class property
}
