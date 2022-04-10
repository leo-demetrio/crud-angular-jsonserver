import { ApiService } from './../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnessList = ['Brand new', 'Second hand', 'RefurBished'];
  productForm !: FormGroup;
  constructor(    
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private formBuilder : FormBuilder,
    private apiService : ApiService,
    private dialogRef : MatDialogRef<DialogComponent>,
    ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName : ['', Validators.required],
      category : ['', Validators.required],
      freshness : ['', Validators.required],
      price : ['', Validators.required],
      comment : ['', Validators.required],
      date : ['', Validators.required]
    });
    console.log(this.editData)

  }
  addProduct(){
   if(this.productForm.value)  
   this.apiService.postProduct(this.productForm.value)
   .subscribe({
     next: res => {
       alert("Product added successfully");
       this.productForm.reset();
       this.dialogRef.close('save');
     },
     error: () => alert("Error while added product")
   });
  }

}
