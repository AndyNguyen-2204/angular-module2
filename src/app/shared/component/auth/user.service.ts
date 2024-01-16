import { UserModel } from './type/user';
import { BehaviorSubject, Observable, of } from 'rxjs';

export class UserService {
  private roles = ['user', 'admin', 'editor'];
  public demoUsers: UserModel[] = []; // Initialize demoUsers as an empty array

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
      return of({ success: false, reason: 'User already exists' });
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
      (user) => user.username === updatedUser.username
    );

    if (userIndex === -1) {
      return of({ success: false, reason: 'User not found' });
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
    username: string
  ): Observable<{ success: boolean; reason?: string }> {
    // Check if the user to be removed exists
    const userIndex = this.demoUsers.findIndex(
      (user) => user.username === username
    );

    if (userIndex === -1) {
      // Return an observable indicating that the user does not exist
      return of({ success: false, reason: 'User not found' });
    }

    // Remove the user from the array
    this.demoUsers.splice(userIndex, 1);

    // Return an observable indicating successful user removal
    return of({ success: true });
  }
}
