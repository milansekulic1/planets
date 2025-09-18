import {Component, Input} from '@angular/core';
import {Planet} from '../../../models/planet.model';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
})
export class CardComponent {
    @Input() planet!: Planet;
}
