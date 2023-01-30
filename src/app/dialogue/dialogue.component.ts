import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import{MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {

  productForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private api:ApiService, private dialogRef:MatDialogRef<DialogueComponent>){

  }
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      date:['',Validators.required],
      price:['',Validators.required],
    })
  }

  addProduct(){
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next:(res)=>{
          alert("product added successfully");
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("error while adding product");
        }
      })
    }
  }

}
