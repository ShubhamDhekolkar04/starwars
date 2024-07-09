import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentNavigationComponent } from './parent-navigation.component';
import { CharacterDetailsComponent } from '../child-component/character-details/character-details.component';
import { CharactersListComponent } from '../child-component/characters-list/characters-list.component';

const routes: Routes = [{ path: '', component: ParentNavigationComponent ,
  children:[
    { path:'',redirectTo:'character-list',pathMatch:'full'},
    { path: 'character-list', component: CharactersListComponent },
    { path:'character/:id',component: CharacterDetailsComponent }
  ]
 }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentNavigationRoutingModule { }
