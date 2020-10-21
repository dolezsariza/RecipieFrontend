import { RepositoryService } from './../../shared/services/repository.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/_interfaces/recipe.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  public recipes: Recipe[];
  public errorMessage: string = '';
  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getAllRecipes();
  }

  public getAllRecipes = () => {
    let apiAddress: string = "recipes";
    this.repository.getData(apiAddress)
    .subscribe(result => {
      this.recipes = result as Recipe[];
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }
}
