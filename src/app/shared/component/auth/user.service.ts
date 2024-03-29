import { generateRandomId } from '../common/utils/utils';
import { UserModel } from './type/user';
import { BehaviorSubject, Observable, of } from 'rxjs';

export class UserService {
  public demoUsers: UserModel[] = [{
    username:"tu",
    password:"111",
    email:"anhtutgtb@gmail.com",
    id:generateRandomId(),
    role:"superAdmin",
    phone:"0865268791"
  }]; // Initialize demoUsers as an empty array

  constructor() {
    // Initialize other properties or perform other setup here if needed
  }

  createUser(
    user: UserModel
  ): Observable<{ success: boolean; reason?: string }> {
    // Check if the user already exists
    const userExists = this.demoUsers.some(
      (existingUser) => existingUser.username === user.username
    );

    if (userExists) {
      // Return an observable indicating that the user already exists
      return of({ success: false, reason: 'Tên tài khoản đã tồn tại!' });
    }

    // Add new user data
    const submittedData: UserModel = { ...user };
    this.demoUsers.push(submittedData);

    // Return an observable indicating successful user creation
    return of({ success: true });
  }

  //Edit User
  editUser(
    updatedUser: UserModel
  ): Observable<{ success: boolean; reason?: string }> {
    const userIndex = this.demoUsers.findIndex(
      (user) => user.id === updatedUser.id
    );
    const userExists = this.demoUsers.some(
      (existingUser) => existingUser.username === updatedUser.username
    );

    if (userIndex === -1) {
      return of({ success: false, reason: 'Tài khoản không tồn tại' });
    }
    if (userIndex > -1 && userExists) {
      return of({ success: false, reason: 'Tên tài khoản đã tồn tại!' });
    }

    // Update user information
    this.demoUsers[userIndex] = {
      ...this.demoUsers[userIndex],
      ...updatedUser,
    };
    return of({ success: true });
  }

  //remove User
  removeUser(
    id: string
  ): Observable<{ success: boolean; reason?: string }> {
    // Check if the user to be removed exists
    const userIndex = this.demoUsers.findIndex(
      (user) => user.id === id
    );

    if (userIndex === -1) {
      // Return an observable indicating that the user does not exist
      return of({ success: false, reason: 'Tài khoản không tồn tại!' });
    }

    // Remove the user from the array
    this.demoUsers.splice(userIndex, 1);

    // Return an observable indicating successful user removal
    return of({ success: true });
  }
}
