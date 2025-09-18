import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Planet} from '../../../../models/planet.model';

@Component({
    selector: 'app-planet-grid-view',
    templateUrl: './planet-grid-view.component.html',
    styleUrl: './planet-grid-view.component.scss'
})
export class PlanetGridViewComponent {
    @Input() planets: Planet[] = [];
    @Output() planetId = new EventEmitter<number>();

    planetToShow(id: number): void {
        this.planetId.emit(id);
    }
}
