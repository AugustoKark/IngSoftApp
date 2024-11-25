import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IAuto } from '../auto.model';

@Component({
  standalone: true,
  selector: 'jhi-auto-detail',
  templateUrl: './auto-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class AutoDetailComponent {
  auto = input<IAuto | null>(null);

  previousState(): void {
    window.history.back();
  }
}
