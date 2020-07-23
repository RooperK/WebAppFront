import {Injectable} from '@angular/core';
import {ImageModel} from '../models/image/image.model';

@Injectable({providedIn: 'root'})
export class PictureService {
  static placeholder200 = {imageUrl: 'https://via.placeholder.com/200'};
  static placeholder500 = {imageUrl: 'https://via.placeholder.com/500'};
  static placeholder1000 = {imageUrl: 'https://via.placeholder.com/1000'};
  static userPlaceholder = {imageUrl: 'SellNET/user_avatar'};

  constructor() {
  }

  static getPictureSrc(imageUrl: string): string {
    if (imageUrl.startsWith('SellNET')) {
      return `https://res.cloudinary.com/dennztta6/image/upload/w_190,h_190,c_fill/q_95/v1587033211/${imageUrl}`;
    } else {
      return imageUrl;
    }
  }

  static getAvatarSrc(avatar: ImageModel): string {
    if (!avatar || !avatar.imageUrl) {
      avatar = this.userPlaceholder;
    }
    if (avatar.imageUrl.startsWith('SellNET')) {
      return `https://res.cloudinary.com/dennztta6/image/upload/w_400,h_400,c_fill,r_max/q_90/v1587033211/${avatar.imageUrl}`;
    }
    return avatar.imageUrl;
  }
}
