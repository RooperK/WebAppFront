import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PanoramaService} from '../../services/panorama.service';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageModel} from '../../models/image/image.model';
import {DadataAddress, DadataConfig, DadataSuggestion, DadataType, NgxDadataComponent} from '@kolkov/ngx-dadata';
import {LocationModel} from '../../models/location/location.model';
import {PanoramaModel} from '../../models/panorama/panorama-model';
import {AuthenticationService} from '../../services/authentication-service';
import {InfoService} from '../../services/info.service';
import {Observable} from 'rxjs';
import {ImageUploadComponent} from '../../components/image-upload/image-upload.component';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss']
})
export class AdditemComponent implements OnInit {

  isEditing: boolean;
  panorama: PanoramaModel;
  image: FormData;
  currentPosition: number[];
  loading = false;
  submitted = false;
  error = '';
  addressSelected = false;
  @ViewChild('imageUploadComponent', {static: true}) imageUploadComponent: ImageUploadComponent;

  addItemFormGroup: FormGroup;

  constructor(private router: Router, private authService: AuthenticationService,
              private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
              private advertisementService: PanoramaService) {
  }

  get f() {
    return this.addItemFormGroup.controls;
  }
  ngOnInit() {
    this.isEditing = this.activatedRoute.snapshot.data.isEditing;
    if (this.isEditing) {
      this.loading = true;
      this.advertisementService.getPanoramaById(this.activatedRoute.snapshot.params.id).subscribe(resp => {
        this.panorama = resp as PanoramaModel;
        if (this.panorama.user.id !== this.authService.currentUserValue.id) {
          this.router.navigate(['/']);
        }
        this.f.item_name.setValue(this.panorama.name);
        this.f.item_positionX.setValue(this.panorama.position[0]);
        this.f.item_positionY.setValue(this.panorama.position[1]);
        this.f.item_positionZ.setValue(this.panorama.position[2]);
        this.imageUploadComponent.initImages();
        this.loading = false;
      });
    } else {
      this.currentPosition = [0, 0, 0];
    }
    this.addItemFormGroup = this.formBuilder.group({
      item_name: ['', Validators.required],
      item_body: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.image === null) {
      this.error = 'Добавьте файл панорамы';
      return;
    }

    if (this.addItemFormGroup.invalid && this.addItemFormGroup.errors !== null) {
      return;
    }

    this.loading = true;

    if (this.isEditing) {
      // tslint:disable-next-line:max-line-length
      this.advertisementService.editPanorama(this.panorama.id, this.f.item_name.value, this.currentPosition, this.image).pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['/']);
          },
          error => {
            this.error = error;
            this.loading = false;
          });
    } else {
      this.advertisementService.postPanorama(this.f.item_name.value, this.currentPosition, this.image).pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['/']);
          },
          error => {
            this.error = error;
            this.loading = false;
          });
    }
  }
}
