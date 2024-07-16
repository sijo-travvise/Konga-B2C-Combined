import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  readonly flightSearch = environment.apiUrl;
  // readonly flightSearch = `http://192.168.10.212:8082/`;

  constructor(private http:HttpClient) { }
  getAllPackageData(): Observable<any> {
    return this.http.get<any>(this.flightSearch + "api/b2c/staticPackage/getAllPackages");
  }
  getPackageData(packageId: string): Observable<any> {
    return this.http.get<any>(this.flightSearch + "api/b2c/staticPackage/getPackagesById?PackageId="+packageId);
  }
  submitPackageEnquiry(details: any): Observable<any> {
    return this.http.post<any>(this.flightSearch + "api/b2c/staticPackage/submitCustomerPackageEnquiry", details);
  }
}
