import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnotacionPageRoutingModule } from './anotacion-routing.module';

import { AnotacionPage } from './anotacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnotacionPageRoutingModule
  ],
  declarations: [AnotacionPage]
})
export class AnotacionPageModule {}
