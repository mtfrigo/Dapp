import { NgModule } from '@angular/core';
import { FilterConvidadosPipe } from './filter-convidados/filter-convidados';
import { ContaConvidadosPipe } from './conta-convidados/conta-convidados';
import { ContaPagantesPipe } from './conta-pagantes/conta-pagantes';
@NgModule({
	declarations: [FilterConvidadosPipe,
    ContaConvidadosPipe,
    ContaPagantesPipe],
	imports: [],
	exports: [FilterConvidadosPipe,
    ContaConvidadosPipe,
    ContaPagantesPipe]
})
export class PipesModule {}
