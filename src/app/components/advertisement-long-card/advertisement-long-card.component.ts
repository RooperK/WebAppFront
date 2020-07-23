import {Component, Input, OnInit} from '@angular/core';
import {PictureService} from '../../services/picture.service';
import {PanoramaPreviewModel} from '../../models/panorama/panorama-preview.model';
import {InfoService} from '../../services/info.service';
import {AuthenticationService} from '../../services/authentication-service';
import {first} from 'rxjs/operators';
import {PanoramaService} from '../../services/panorama.service';

@Component({
  selector: 'app-advertisement-long-card',
  templateUrl: './advertisement-long-card.component.html',
  styleUrls: ['./advertisement-long-card.component.scss']
})
export class AdvertisementLongCardComponent implements OnInit {

  @Input() panorama: PanoramaPreviewModel;
  @Input() isCurrUserProfilePage: boolean;

  constructor(private authService: AuthenticationService, private advertisementService: PanoramaService) {
  }

  ngOnInit() {
    if (!this.panorama.image) {
      this.onErrorPicture();
    }
  }

  onErrorPicture() {
    this.panorama.image = PictureService.placeholder500;
  }

  getPicture() {
    return PictureService.getPictureSrc(this.panorama.image.imageUrl);
  }

  getDate(creationTime: string) {
    return InfoService.parseDate(creationTime);
  }

  canEdit() {
    return this.isCurrUserProfilePage;
  }

  canDelete() {
    return this.isCurrUserProfilePage || this.authService.isAdmin();
  }

  deleteItem() {
    this.advertisementService.deletePanorama(this.panorama.id).pipe(first()).subscribe(data => {
        location.reload();
      },
      error => {
        console.log(error);
      });
  }
}
