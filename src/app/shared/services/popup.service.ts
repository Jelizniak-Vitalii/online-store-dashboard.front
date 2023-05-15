import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupErrorComponent } from '../components';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor(public dialog: MatDialog) {}

  showErrorMessage(message: string) {
    const dialogRef = this.dialog.open(PopupErrorComponent, {
      data: { message }
    });
  }
}
