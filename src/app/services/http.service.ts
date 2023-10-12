import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CookiesService } from "./cookies.service";
import { Service } from "../interfaces/interface";

@Injectable({
    providedIn: 'root',
})

export class HTTPService {
    constructor(
        private readonly http: HttpClient,
        private readonly cookiesService: CookiesService,
    ) { }

    login(body: any): Observable<any[]> {
        return this._request('POST', 'login', body)
    }

    registration(body: any): Observable<string[]> {
        return this._request('POST', 'registration', body)
    }

    getServices() {
        return this._request('GET', 'read_all_services')
    }

    createService(body: any) {
        const token = this.cookiesService.getCookie('access_token')
        return this._request('POST', 'create_service', body, `token=${token}`)
    }

    updateService(id: string, body: Service) {
        const token = this.cookiesService.getCookie('access_token')
        return this._request('PUT', 'update_service', body, `service_id=${id}&token=${token}`)
    }

    deleteService(id: string) {
        const token = this.cookiesService.getCookie('access_token')
        return this._request('DELETE', 'delete_service', null, `service_id=${id}&token=${token}`)
    }

    getProducts() {
        return this._request('GET', 'read_all_products')
    }

    createProduct(body: any) {
        const token = this.cookiesService.getCookie('access_token')
        return this._request('POST', 'create_product', body, `token=${token}`)
    }

    updateProduct(id: string, body: Service) {
        const token = this.cookiesService.getCookie('access_token')
        return this._request('PUT', 'update_product', body, `product_id=${id}&token=${token}`)
    }

    deleteProduct(id: string) {
        const token = this.cookiesService.getCookie('access_token')
        return this._request('DELETE', 'delete_product', null, `product_id=${id}&token=${token}`)
    }

    getShopAddresses() {
        return this._request('GET', 'read_all_addressess')
    }

    getProblems() {
        return this._request('GET', 'read_all_problems')
    }

    getMainInfo() {
        return this._request('GET', 'read_all_main_pages', null)
    }

    updateMainInfo(body: any) {
        return this._request('PUT', 'update_main_page', body, 'main_page_id=5')
    }

    private _request(method: string, path: string, body?: any, query: string = ''): Observable<any> {
        const token = this.cookiesService.getCookie('token');
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`)
        }
        const options = {
            headers: headers,
            body: body,
        };
        let url = `http://localhost:4200/${path}`
        if (query) {
            url += `?${query}`
        }
        return this.http.request(method, url, options)
    }
}