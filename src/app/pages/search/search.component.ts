import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  public doctors: Doctor[] = []
  public users: User[] = []
  public hospitals: Hospital[] = []

  constructor(
    private activatedRoute:  ActivatedRoute,
    private searchesService: SearchesService,
  ) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ text }) => {
      this.globalSearch(text)
    })
  }

  globalSearch(text: string) {
    this.searchesService.globalSearch(text).
      subscribe((res: {ok: boolean, users: User[], doctors: Doctor[], hospitals: Hospital[]}) => {
        this.users = res.users
        this.doctors = res.doctors
        this.hospitals = res.hospitals

        console.log(this.users)
        console.log(this.doctors)
        console.log(this.hospitals)
      })
  }

}
