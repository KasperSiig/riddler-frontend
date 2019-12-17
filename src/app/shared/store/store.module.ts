import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
	NgxsRouterPluginModule,
	RouterStateSerializer,
} from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { JobsState } from './job/job.state';
import { CustomRouterStateSerializer } from './router/router-state.serializer';
import { WordlistsState } from './wordlist/wordlist.state';

@NgModule({
	imports: [
		NgxsModule.forRoot([JobsState, WordlistsState], {
			developmentMode: !environment.production,
		}),
		NgxsRouterPluginModule.forRoot(),
		HttpClientModule,
	],
	providers: [
		{ provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
	],
})
export class StoreModule {}
