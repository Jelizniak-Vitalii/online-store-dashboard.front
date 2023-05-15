import { NgModule } from '@angular/core';
import { FormControlPipe } from './pipes';
import { InputComponent, PopupErrorComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

const PIPES = [
  FormControlPipe
];

const COMPONENTS = [
  InputComponent,
  PopupErrorComponent
];

@NgModule({
  declarations: [
    ...PIPES,
    ...COMPONENTS
  ],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    NgIf,
    FormsModule,
    MatCardModule
  ],
  exports: [
    ...PIPES,
    ...COMPONENTS
  ]
})
export class SharedModule {}
