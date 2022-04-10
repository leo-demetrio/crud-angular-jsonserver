import { ApiService } from './services/api.service';
import { DialogComponent } from './dialog/dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-crud-jsonserver';
  products = [];
  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness', 'price', 'comment', 'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog : MatDialog,
    private apiService : ApiService,
  ){ }

  ngOnInit(): void {
    this.getAllproducts();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
     width: '40%'
    });
  }
  getAllproducts(){
    this.apiService.getProduct()
    .subscribe({
      next: res => {
        this.dataSource = new MatTableDataSource(res); 
        this.dataSource.paginator = this.paginator;   
        this.dataSource.sort = this.sort;   
      },
      error: () => alert("Error while loading products")
    });
  }
  editProduct(row : any){
    this.dialog.open(DialogComponent, {
      width: '40%',
      data: row
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
