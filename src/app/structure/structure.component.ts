import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

/*
declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};
*/

interface Structure
{
	name:String;
	system_id:number;
	icon:String;
	description:String;
}

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {

   structures:Array<Structure> = [];
  
  constructor(private http: Http) 
  { 

	this.http.get('http://51.255.167.114/api/structure/?format=json')
		.subscribe(data => this.structures = data.json() );
    
  }

  
  ngOnInit() {
  }

}
