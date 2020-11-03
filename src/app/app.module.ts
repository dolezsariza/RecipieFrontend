import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NotfoundComponent } from './error-pages/notfound/notfound.component';
import { HttpClientModule } from '@angular/common/http';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    NotfoundComponent,
    InternalServerComponent,
    UserLoginComponent,
    UserRegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '404', component : NotfoundComponent},
      { path: '500', component: InternalServerComponent },
      { path: 'login', component: UserLoginComponent },
      { path: 'register', component: UserRegisterComponent },
      { path: 'recipe', loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule) },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', redirectTo: '/404', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
