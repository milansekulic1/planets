import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PlanetDashboardComponent} from './planet/planet-dashboard/planet-dashboard.component';
import {PlanetTableViewComponent} from './planet/planet-dashboard/view/planet-table-view/planet-table-view.component';
import {PlanetGridViewComponent} from './planet/planet-dashboard/view/planet-grid-view/planet-grid-view.component';
import {PlanetDetailsComponent} from './planet/planet-dashboard/detail/planet-details/planet-details.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatTableModule} from '@angular/material/table';
import {provideHttpClient} from '@angular/common/http';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle
} from '@angular/material/card';
import {PlanetDialogComponent} from './shared/planet-dialog/planet-dialog.component';
import {ConfirmationDialogComponent} from './shared/confirmation-dialog/confirmation-dialog.component';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {CardComponent} from './planet/components/card/card.component';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {FileUploadComponent} from './shared/file-upload/file-upload.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        PlanetDashboardComponent,
        PlanetTableViewComponent,
        PlanetGridViewComponent,
        PlanetDetailsComponent,
        PlanetDialogComponent,
        ConfirmationDialogComponent,
        CardComponent,
        FileUploadComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatTableModule,
        MatSort,
        MatSortHeader,
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardSubtitle,
        MatCardImage,
        MatCardContent,
        MatCardActions,
        MatDialogContent,
        MatFormField,
        MatLabel,
        MatDialogTitle,
        MatDialogActions,
        MatIcon,
        MatInput,
        MatButton,
        MatIconButton,
        MatTooltip,
        MatButtonToggleGroup,
        MatButtonToggle,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        provideAnimationsAsync(),
        provideHttpClient()
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
