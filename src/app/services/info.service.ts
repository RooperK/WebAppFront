import {Injectable} from '@angular/core';
import {LocationModel} from '../models/location/location.model';

@Injectable({providedIn: 'root'})
export class InfoService {
  private static options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC+3'
  };

  constructor() {
  }

  public static parseDate(dateTime: string): string {
    const date = Date.parse(dateTime);
    return new Date(date).toLocaleString('ru-RU', this.options);
  }

  public static parsePosition(location: number[]) {
    return `X: ${ location[0] }, Y: ${ location[1] }, Z: ${ location[0] }`;
  }
}
