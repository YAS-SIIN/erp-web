import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConformDialogData {
  message: string;
  data: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: [`
    .mat-dialog-content {
      overflow: hidden !important;
      direction: rtl;
    }
  `]
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConformDialogData,
  ) { }

  Submit() {
    this.data.message = "";
    this.data.data = "Confirmed";
    this.dialogRef.close(this.data);
  }

}
