import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IAuto } from '../auto.model';
import { AutoService } from '../service/auto.service';

@Component({
  standalone: true,
  templateUrl: './auto-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class AutoDeleteDialogComponent {
  auto?: IAuto;

  protected autoService = inject(AutoService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.autoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
