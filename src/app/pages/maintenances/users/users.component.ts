import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  public users: Array<User> = [];
  public totalUsers: number = 0;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers()
    .subscribe(({users, totalUsers}) => {
      this.users = users;
      this.totalUsers = totalUsers;
    });
  }

}
