import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { DialogData } from '../../core/models/public.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-app-dialog',
  imports: [MatFormFieldModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './app-dialog.html',
  styleUrl: './app-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDialog {
  readonly dialogRef = inject(MatDialogRef<AppDialog>);

  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  readonly title = model(this.data.title);
  readonly message = model(this.data.message);

}
