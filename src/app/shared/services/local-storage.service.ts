import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, makeStateKey, PLATFORM_ID, StateKey, TransferState } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  getItem<T extends String>(key: string): any {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(key) ?? '{}');
    } else if (isPlatformServer(this.platformId)) {
      return this.transferState.get(this.getTransferKey(key), '');
    }
  }

  setItem<T>(key: string, value: T): void {
    console.log(isPlatformBrowser(this.platformId));
    if (isPlatformBrowser(this.platformId)) {
      console.log('setItem', key, value);
      localStorage.setItem(key, JSON.stringify(value));
    } else if (isPlatformServer(this.platformId)) {
      this.transferState.set<T>(this.getTransferKey(key), value);
    }
  }

  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    } else if (isPlatformServer(this.platformId)) {
      this.transferState.remove(this.getTransferKey(key));
    }
  }

  private getTransferKey<T>(key: string): StateKey<T> {
    return makeStateKey<T>(`TRANSFER_KEY_${key}`);
  }
}
