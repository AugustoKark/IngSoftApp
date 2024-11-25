import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IAlquiler } from '../alquiler.model';
import { AlquilerService } from '../service/alquiler.service';

@Component({
  standalone: true,
  templateUrl: './alquiler-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class AlquilerDeleteDialogComponent {
  alquiler?: IAlquiler;

  protected alquilerService = inject(AlquilerService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.alquilerService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
