import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '404', component : NotfoundComponent},
      { path: 'recipe', loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule) },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', redirectTo: '/404', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
