import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  setWithExpiry(key: string, value: any, ttl: number): void {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }
  
  getWithExpiry<T>(key: string): T | null {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
  
    const item = JSON.parse(itemStr);
    const now = new Date();
  
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value as T;
  }  

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
