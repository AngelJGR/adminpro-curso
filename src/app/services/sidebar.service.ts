import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = []

  constructor() { }

  getMenu () {
    this.menu = JSON.parse(localStorage.getItem('menu')) || []
  }
}
