import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DesenvolvedorPage } from './desenvolvedor.page';

const routes: Routes = [
  {
    path: '',
    component: DesenvolvedorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DesenvolvedorPage]
})
export class DesenvolvedorPageModule {}
