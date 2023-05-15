import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-error',
  templateUrl: './popup-error.component.html',
  styleUrls: ['./popup-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupErrorComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PopupErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
  ) {}

  ngOnInit() {
    setTimeout(() => this.dialogRef.close(), 3000);
  }
}
