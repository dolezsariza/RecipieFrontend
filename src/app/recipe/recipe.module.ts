import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [RecipeListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'list', component: RecipeListComponent }
    ])
  ]
})
export class RecipeModule { }
