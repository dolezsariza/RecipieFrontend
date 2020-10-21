import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RouterModule } from '@angular/router';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';



@NgModule({
  declarations: [RecipeListComponent, RecipeDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'list', component: RecipeListComponent },
      { path: 'details/:id', component: RecipeDetailsComponent }
    ])
  ]
})
export class RecipeModule { }
