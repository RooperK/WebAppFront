import {Component, OnInit} from '@angular/core';
import {PanoramaModel} from '../../models/panorama/panorama-model';
import {PanoramaService} from '../../services/panorama.service';
import {PanoramaPreviewModel} from '../../models/panorama/panorama-preview.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  panoramaPreviewModels: PanoramaPreviewModel[];
  loading = true;
  page = 1;

  constructor(private panoramaService: PanoramaService) {
    this.panoramaPreviewModels = [];
  }

  ngOnInit() {
    this.getPans(this.page);
  }

  onScroll() {
    this.getPans(++this.page);
  }

  getPans(page: number) {
    this.panoramaService.getPanoramas(page).subscribe(response => {
      for (const ad of response as PanoramaPreviewModel[]) {
        this.panoramaPreviewModels.push(ad);
      }
      this.loading = false;
    });
  }
}
