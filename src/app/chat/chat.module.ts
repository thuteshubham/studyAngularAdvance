import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from './chat-box/chat-box.component';

import { RouterModule,Routes } from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'

@NgModule({
  declarations: [ChatBoxComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path:'chat',component:ChatBoxComponent,pathMatch:'full'}
    ])
  ]
})
export class ChatModule { }
