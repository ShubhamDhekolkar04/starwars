import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentNavigationRoutingModule } from './parent-navigation-routing.module';
import { ParentNavigationComponent } from './parent-navigation.component';


@NgModule({
  declarations: [
    ParentNavigationComponent
  ],
  imports: [
    CommonModule,
    ParentNavigationRoutingModule
  ]
})
export class ParentNavigationModule { }
