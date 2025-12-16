import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Loader } from '../../shared/loader/loader';

@Injectable({
  providedIn: 'root',
})
export class Ui {

  private matDialog = inject(MatDialog)

  dialog(){
    
  }


  load(){
    const ref = this.matDialog.open(Loader, {
      disableClose: true,
      panelClass: 'loader-dialog'
    })

    return ref
  }
}
