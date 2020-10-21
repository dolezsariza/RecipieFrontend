import { RepositoryService } from './../../shared/services/repository.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/_interfaces/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  public recipes: Recipe[];
  constructor(private repository: RepositoryService) { }

  ngOnInit(): void {
    this.getAllRecipes();
  }

  public getAllRecipes = () => {
    let apiAddress: string = "recipes";
    this.repository.getData(apiAddress)
    .subscribe(result => {
      this.recipes = result as Recipe[];
    })
  }
}
