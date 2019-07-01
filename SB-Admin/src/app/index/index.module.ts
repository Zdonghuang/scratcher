import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        IndexRoutingModule],
    declarations: [IndexComponent]
})
export class IndexModule {}
