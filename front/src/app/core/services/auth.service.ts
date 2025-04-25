import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {environment} from "@environments/environment.development";

@Injectable({
  providedIn:'root'
})

export class AuthService{
  private readonly apiUrl = environment.apiUrl;
  private readonly accessTokenKey = 'access-token';
  private readonly refreshTokenKey = 'refresh-token';

  constructor(private http: HttpClient) {}

  async authenticate(email:string, endpoint:'login' | 'register'): Promise<boolean>{
    const response = await firstValueFrom(
      this.http.post<{ credentials:boolean; accessToken: string; refreshToken: string }>(`${this.apiUrl}/auth/${endpoint}`, {email})
    );

    if(!response.credentials){
      return false;
    }

    this.storeTokens(response.accessToken, response.refreshToken);
    return true;
  }

  async login(email: string): Promise<boolean>{
    return await this.authenticate(email, 'login');
  }

  async register(email: string):Promise<boolean>{
    return this.authenticate(email, 'register');
  }

  storeTokens(accessToken:string, refreshToken:string):void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  getAccessToken():string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey)
  }

  clearTokens(): void {
    localStorage.removeItem(this.accessTokenKey)
    localStorage.removeItem(this.refreshTokenKey)
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken()
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getAccessToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  logout(): void {
    this.clearTokens()
  }

}
