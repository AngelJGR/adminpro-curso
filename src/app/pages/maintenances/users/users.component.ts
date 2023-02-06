import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { User } from 'src/app/interfaces/user.interface';
import { SearchesService } from 'src/app/services/searches.service';
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
  public from: number = 0;
  public loading: boolean = true

  constructor(
    private userService: UserService,
    private searchesService: SearchesService
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.loading = true;
    this.userService.getUsers(this.from)
      .subscribe(({users, totalUsers}) => {
        this.totalUsers = totalUsers;
        this.users = users;
        this.loading = false;
      });
  }

  changePage (value: number) {
    this.from += value
    if (this.from < 0)
      this.from = 0
    else if (this.from > this.totalUsers)
      this.from -= value
    
    this.getUser()
  }

  search(value:string) {
    if (!value)
      return this.getUser()
    this.searchesService.search('users', value)
      .subscribe(res => this.users = res)
  }

  deleteUser (user) {
    if (user.uid === this.userService.uid)
      return Swal.fire('Error', 'You don\'t delete yourself', 'error')

    Swal.fire({
      title: 'Are you sure want to delete?',
      text: `You almost delete to ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed)
        this.userService.deleteUser(user)
          .subscribe(() => {
            Swal.fire(
              'Deleted!',
              `${user.name} has been deleted.`,
              'success'
            )
            this.getUser()
          })
    })
  }

}
