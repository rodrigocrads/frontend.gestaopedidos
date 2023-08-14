import { BaseResourceModel } from "../models/base-resource.model";

import { HttpClient } from '@angular/common/http';
import { Injector } from "@angular/core";

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface QueryParam {
    key: string,
    value: string
}

export abstract class BaseResourceService<T extends BaseResourceModel> {

    private http: HttpClient;
    private basePath = 'http://localhost:3000/';

    constructor(
        private apiPath: string,
        protected injector: Injector,
        private jsonDataToResourceFn: (jsonData: any) => T
    ){
        this.http = injector.get(HttpClient);
    }

    getById(id: string): Observable<T> {
        const url = `${this.getBaseUrl()}/${id}`;
        return this.http.get(url).pipe(
            map((jsonData: any) => this.jsonDataToResource(jsonData)),
            catchError(this.handleError),
        )
    }

    listAll(): Observable<T[]> {
        return this.http.get<any[]>(`${this.getBaseUrl()}`).pipe(
            map((jsonData: any[]) => this.jsonDataToResources(jsonData)),
            catchError(this.handleError),
        );
    }

    listByFilters(filters: QueryParam[] = []): Observable<T[]> {
        return this.http.get<any[]>(this.getBaseUrl(filters)).pipe(
            map((jsonData: any[]) => this.jsonDataToResources(jsonData)),
            catchError(this.handleError),
        );
    }

    create(resource: T): Observable<T> {
        resource.id = this.generate_UUID();
        return this.http.post(`${this.getBaseUrl()}`, resource).pipe(
            map((jsonData: any) => this.jsonDataToResource(jsonData)),
            catchError(this.handleError),
        );
    }

    update(resource: T): Observable<T> {
        const url = `${this.getBaseUrl()}/${resource.id}`;
        return this.http.put(url, resource).pipe(
            catchError(this.handleError),
            // caso esteja realizando uma chamada há um servidor real deve se devolver a resource que vier do servidor
            map(() => resource)
        );
    }

    delete(id: string): Observable<any> {
        const url = `${this.getBaseUrl()}/${id}`;
        return this.http.delete(url).pipe(
            catchError(this.handleError),
            map(() => null)
        );
    }

    protected jsonDataToResources(jsonData: any[]): T[] {
        return jsonData.map(el => this.jsonDataToResourceFn(el));
    }

    protected jsonDataToResource(jsonData: any): T {
        return this.jsonDataToResourceFn(jsonData);
    }

    protected handleError(error: any): Observable<any> {
        console.log('ERRO NA REQUISIÇÃO');
        return throwError(() => error);
    }

    private getBaseUrl(filters: QueryParam[] = []): string {
        let url = `${this.basePath}${this.apiPath}`;

        if (filters.length > 0) {
            filters.forEach((item, index) => {
                if (index === 0) {
                    url += `?${item.key}=${item.value}`;
                    return;
                }
                url += `&${item.key}=${item.value}`;
            });
        }

        return url;
    }

    private generate_UUID(){
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }
}
