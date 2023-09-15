import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-avatar-modal',
  templateUrl: './avatar-modal.component.html',
  styleUrls: ['./avatar-modal.component.css']
})
export class AvatarModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AvatarModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  closeModal() {
    this.dialogRef.close();
  }
}
