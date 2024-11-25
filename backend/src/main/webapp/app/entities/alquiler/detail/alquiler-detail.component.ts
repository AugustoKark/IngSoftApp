import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IAlquiler } from '../alquiler.model';

@Component({
  standalone: true,
  selector: 'jhi-alquiler-detail',
  templateUrl: './alquiler-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class AlquilerDetailComponent {
  alquiler = input<IAlquiler | null>(null);

  previousState(): void {
    window.history.back();
  }
}
