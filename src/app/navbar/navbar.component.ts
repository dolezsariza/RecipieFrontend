import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: string = "";
  constructor() { }

  ngOnInit(): void {
  }

  loggedIn(){
    this.user = localStorage.getItem('user');
    return localStorage.getItem('user');
  }
}
