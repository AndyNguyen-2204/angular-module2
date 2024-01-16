import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UserModel } from '../../shared/component/auth/type/user';
import { Router } from '@angular/router';
import { UserService } from '../../shared/component/auth/user.service';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.scss'],
})
export class CreateUserComponent implements OnInit {
  public isCreated = false;
  public isErorr = false;
  userFormCreate!: FormGroup;

  public userData: UserModel = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    role: '',
  };

  constructor(
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { username: string },
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.username) {
      const user = this.userService.demoUsers.find(
        (user) => user.username === this.data.username
      );
      if (user) {
        this.userData = user;

        // Initialize the form with the fetched user data
        this.initializeForm();
      } else {
        // Handle the case where the user is not found
        console.error(`User with username '${this.data.username}' not found.`);
        // Optionally, you can navigate the user to another page or display an error message.
      }
    } else {
      this.initializeForm();
      console.error('Username is null.');
    }
  }

  private initializeForm() {
    this.userFormCreate = this.formBuilder.group({
      first_name: [this.userData.first_name, Validators.required],
      last_name: [this.userData.last_name, Validators.required],
      username: [
        this.userData.username,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ],
      ],
      email: [this.userData.email, [Validators.required, Validators.email]],
      role: [this.userData.role, Validators.required],
    });
  }

  // Helper function to access form controls dynamically
  getFormControl(controlName: string): AbstractControl {
    return this.userFormCreate.get(controlName) as AbstractControl;
  }

  onSubmitCreateUser() {
    if (this.userFormCreate.invalid) {
      this.isErorr = true;
      return;
    }

    this.userService.createUser(this.userFormCreate.value).subscribe(
      (response) => {
        if (response.success) {
          // User creation successful
          alert('User creation successful!');
          this.userFormCreate.reset();
          this.isCreated = true; // You might use this flag for other purposes in your component
        } else {
          // User creation failed, handle the reason
          console.error('Error creating user:', response.reason);
          if (response.reason === 'User already exists') {
            alert('User already exists. Please choose a different username.');
          } else {
            alert('An error occurred while creating the user.');
          }
        }
      },
      (error) => {
        console.error('Unexpected error creating user:', error);
        alert('An unexpected error occurred while creating the user.');
      }
    );
  }
}
