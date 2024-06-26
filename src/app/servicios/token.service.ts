import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from "buffer";

const TOKEN_KEY = "AuthToken";
@Injectable({
providedIn: 'root'
})
export class TokenService {
  constructor(private router: Router) { }

  public setToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    return !!this.getToken();
  }

    public login(token: string) {
    this.setToken(token);
    this.router.navigate(["/inicio-cliente"]).then(() => {
    window.location.reload();
    });
    }

  public loginModerador(token: string) {
    this.setToken(token);
    this.router.navigate(["/moderador"]).then(() => {
      window.location.reload();
    });
  }

    public logout() {
      window.sessionStorage.clear();
      this.router.navigate(["/"]).then(() => {
      window.location.reload();
      });
      }

    private decodePayload(token: string): any {
      const payload = token!.split(".")[1];
      const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
      const values = JSON.parse(payloadDecoded);
      return values;
      }

      public getRole(): string {
        const token = this.getToken();
        if (token) {
        const values = this.decodePayload(token);
        return values.rol;
        }
        return "";
        }
      public getEmail(): string {
        const token = this.getToken();
        if (token) {
        const values = this.decodePayload(token);
        return values.sub;
        }
        return "";
        }

        public getCodigo(): string {
          const token = this.getToken();
          if (token) {
          const values = this.decodePayload(token);
          return values.id;
          }
          return "";
          }

          public getContraseña(): string {
            const token = this.getToken();
            if (token) {
              const values = this.decodePayload(token);
              return values.password; 
            }
            return "";
          }
}