import { BaseResourceModel } from "../models/base-resource.model";

import { HttpClient } from '@angular/common/http';
import { Injector } from "@angular/core";

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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
        const url = `${this.basePath}${this.apiPath}/${id}`;
        return this.http.get(url).pipe(
            map((jsonData: any) => this.jsonDataToResource(jsonData)),
            catchError(this.handleError),
        )
    }

    getAll(): Observable<T[]> {
        return this.http.get<any[]>(`${this.basePath}${this.apiPath}`).pipe(
            map((jsonData: any[]) => this.jsonDataToResources(jsonData)),
            catchError(this.handleError),
        );
    }

    create(resource: T): Observable<T> {
        resource.id = this.generate_UUID();
        return this.http.post(`${this.basePath}${this.apiPath}`, resource).pipe(
            map((jsonData: any) => this.jsonDataToResource(jsonData)),
            catchError(this.handleError),
        );
    }

    update(resource: T): Observable<T> {
        const url = `${this.basePath}${this.apiPath}/${resource.id}`;
        return this.http.put(url, resource).pipe(
            catchError(this.handleError),
            // caso esteja realizando uma chamada há um servidor real deve se devolver a resource que vier do servidor
            map(() => resource)
        );
    }

    delete(id: string): Observable<any> {
        const url = `${this.basePath}${this.apiPath}/${id}`;
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
