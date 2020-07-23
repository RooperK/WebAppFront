import {Component, Input, OnInit} from '@angular/core';
import {PanoramaPreviewModel} from '../../models/panorama/panorama-preview.model';
import {PictureService} from '../../services/picture.service';
import {InfoService} from '../../services/info.service';

@Component({
  selector: 'app-panorama-card',
  templateUrl: './panorama-card.component.html',
  styleUrls: ['./panorama-card.component.scss']
})
export class PanoramaCardComponent implements OnInit {
  @Input() panoramaPreviewModel: PanoramaPreviewModel;

  constructor() {
  }

  ngOnInit() {
    if (!this.panoramaPreviewModel.image) {
      this.onErrorPicture();
    }
  }

  onErrorPicture() {
    this.panoramaPreviewModel.image = PictureService.placeholder500;
  }

  getPictureSrc() {
    return PictureService.getPictureSrc(this.panoramaPreviewModel.image.imageUrl);
  }

  getDate(creationTime: string) {
    return InfoService.parseDate(creationTime);
  }
}
