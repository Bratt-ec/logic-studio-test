import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Loader } from '../../shared/loader/loader';
import { AppDialog } from '../../shared/app-dialog/app-dialog';
import { DialogData } from '../models/public.model';

@Injectable({
  providedIn: 'root',
})
export class Ui {

  private matDialog = inject(MatDialog)

  dialog(params: DialogData) {
    const dialogRef = this.matDialog.open(AppDialog, {
      data: params,
    });

    return dialogRef
  }


  load() {
    const ref = this.matDialog.open(Loader, {
      disableClose: true,
      panelClass: 'loader-dialog'
    })

    return ref
  }
}
