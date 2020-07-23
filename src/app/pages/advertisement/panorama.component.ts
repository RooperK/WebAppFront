import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PanoramaService} from '../../services/panorama.service';
import {PanoramaModel} from '../../models/panorama/panorama-model';
import {ImageModel} from '../../models/image/image.model';
import {AuthenticationService} from '../../services/authentication-service';
import {first} from 'rxjs/operators';
import {InfoService} from '../../services/info.service';
import {PictureService} from '../../services/picture.service';

@Component({
  selector: 'app-advertisement',
  templateUrl: './panorama.component.html',
  styleUrls: ['./panorama.component.scss']
})
export class PanoramaComponent implements OnInit {

  id: any;
  panorama: PanoramaModel;
  loading: boolean;

  constructor(private router: Router, private authService: AuthenticationService, private activatedRoute: ActivatedRoute,
              private panoramaService: PanoramaService) {
    this.loading = true;
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.panoramaService.getPanoramaById(this.id).subscribe(response => {
      this.panorama = response as PanoramaModel;
      this.loading = false;
    });
    ymaps.ready(function () {
      // Для начала проверим, поддерживает ли плеер браузер пользователя.
      if (!ymaps.panorama.isSupported()) {
        // Если нет, то ничего не будем делать.
        return;
      }

      // Сначала описываем уровни масштабирования панорамного изображения.
      // Для этого заводим класс, реализующий интерфейс IPanoramaTileLevel.
      // Параметрами конструктора будут шаблон URL тайлов и размер уровня.
      function TileLevel (urlTemplate, imageSize) {
        this._urlTemplate = urlTemplate;
        this._imageSize = imageSize;
      }

      ymaps.util.defineClass(TileLevel, {
        getTileUrl: function (x, y) {
          // Определяем URL тайла для переданных индексов.
          return this._urlTemplate.replace('%c', x + '-' + y);
        },

        getImageSize: function () {
          return this._imageSize;
        }
      });

      // Теперь описываем панораму.
      function Panorama () {
        ymaps.panorama.Base.call(this);
        var apiUrl = 'http://100.68.156.67.xip.io:5000/api/';
        this.GetPanorama = function(url, callback){
          var apiUrl = url;
          var xmlHttp = new XMLHttpRequest();
          xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
              panorama = JSON.parse(this.responseText);
              callback(null, panorama);
            }
          }
          xmlHttp.open("GET", apiUrl + 'Panorama/getFull/id=1a707c69-215d-4171-9f37-f9130cf3097b', true); // true for asynchronous
          xmlHttp.send(null);
        }

        this.GetPanorama(apiUrl, function(e, panorama){
          console.log((apiUrl + 'Tile/getLq/id=' + panorama.id + '/%c').replace('%c', 0 + '-' + 0));
          this._angularBBox = [0.5 * Math.PI, 2 * Math.PI, -0.5 * Math.PI, 0]
          // this._position = [panorama.positionX, panorama.positionY, panorama.positionZ]
          // this._tileSize = [panorama.tileSizeX, panorama.tileSizeY]
          this._position = [0, 0, 0]
          this._tileSize = [512, 512]
          /*this._tileLevels = [
            new TileLevel(apiUrl + 'Tile/getLq/id=' + panorama.id + '/%c', [panorama.imageLqWidth, panorama.imageLqHeight]),
            new TileLevel(apiUrl + 'Tile/getHq/id=' + panorama.id + '/%c', [panorama.imageHqWidth, panorama.imageHqHeight])
          ];*/
          this._tileLevels = [
            new TileLevel(apiUrl + 'Tile/getLq/id=' + panorama.id + '/%c', [512, 256]),
            new TileLevel(apiUrl + 'Tile/getHq/id=' + panorama.id + '/%c', [7168, 3584])
          ];
        })
        // Наша панорама будет содержать два уровня масштабирования
        // панорамного изображения: низкого и высокого качества.
        //this._angularBBox = [parseInt(panorama.ath, 10), parseInt(panorama.aphi, 10), parseInt(panorama.bth, 10), parseInt(panorama.bphi, 10)]
      }

      // Наследуем класс панорамы от ymaps.panorama.Base, который частично
      // реализует IPanoramaTileLevel за нас.
      ymaps.util.defineClass(Panorama, ymaps.panorama.Base, {
        getPosition: function () {
          // Панорама будет располагаться в начале координат...
          return this._position;
        },

        getCoordSystem: function () {
          // ...декартовой системы.
          return ymaps.coordSystem.cartesian;
        },

        getAngularBBox: function () {
          return this._angularBBox;
        },

        getTileSize: function () {
          // Размер тайлов, на которые нарезано изображение.
          return this._tileSize;
        },

        getTileLevels: function () {
          return this._tileLevels;
        }
      });

      // Теперь создаем плеер с экземпляром нашей панорамы.
      var player = new ymaps.panorama.Player('player', new Panorama());
    });

  }

  getPosition() {
    return InfoService.parsePosition(this.panorama.position);
  }

  getAvatar() {
    return PictureService.getAvatarSrc(this.panorama.user.avatar);
  }

  deleteItem() {
    this.panoramaService.deletePanorama(this.panorama.id).pipe(first()).subscribe(data => {
        this.router.navigate(['/']);
      },
      error => {
        console.log(error);
      });
  }

  canDelete() {
    return this.authService.canDelete(this.panorama);
  }

  canEdit() {
    return this.authService.canEdit(this.panorama);
  }
}
