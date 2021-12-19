import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,FormBuilder, Validators, FormArray} from '@angular/forms';
import{ContactDetails} from '../contact-managerform/contactdeatilsform';
import{ApiService} from '../contact-managerform/api.service';


@Component({
  selector: 'app-create-contact-manager',
  templateUrl: './create-contact-manager.component.html',
  styleUrls: ['./create-contact-manager.component.css']
})
export class CreateContactManagerComponent implements OnInit {
  ContactDetailsform ;
  //ContactDetailsobj:any;
  ContactDetailsobj :ContactDetails= new ContactDetails();
  List :any;
  productForm: FormGroup;

  constructor(private ContactDetailsvalue: FormBuilder,private api:ApiService,private fb:FormBuilder) {

    

  this.productForm = this.fb.group({  
    name: '',  
    quantities: this.fb.array([]) ,  
  }); 
   }


  ngOnInit(): void {
    this.ContactDetailsform = this.ContactDetailsvalue.group({
      contact_name :['',Validators.required],
      company_name:[''],
      first_name:[''],
      last_name:[''],
      email:[''],
      phone:[''],
      facebook:[''],
      twitter:[''],
      language_code:[''],
      payment_terms:[''],
      currency_id:[''],
      website:[''],
   notes:[''],
    value:[''],

    });
    this.getContactDetailsList();
   
  
  }


  quantities() : FormArray {  
    return this.productForm.get("quantities") as FormArray  
  }  
     

  newQuantity(): FormGroup {  
    return this.fb.group({  
      qty: '',  
      price: '',  
    })  
  }  
     
  addQuantity() {  
    this.quantities().push(this.newQuantity());  
  }  
     
  removeQuantity(i:number) {  
    this.quantities().removeAt(i);  
  }  
  onSubmit() {  
    console.log(this.productForm.value);  
  }  

  postContactDetails(){

  
	  this.ContactDetailsobj.contact_name=this.ContactDetailsform.value.contact_name;
     this.ContactDetailsobj.company_name=this.ContactDetailsform.value.company_name;
    this.ContactDetailsobj.website=this.ContactDetailsform.value.website;
    this.ContactDetailsobj.language_code=this.ContactDetailsform.value.language_code;
    this.ContactDetailsobj.twitter=this.ContactDetailsform.value.twitter;
    this.ContactDetailsobj.facebook=this.ContactDetailsform.value.facebook;
    this.ContactDetailsobj.currency_id=this.ContactDetailsform.value.currency_id;
    this.ContactDetailsobj.payment_terms=this.ContactDetailsform.value.payment_terms;
    this.ContactDetailsobj.custom_fields=this.ContactDetailsform.value.custom_fields;
    this.api.postContactDetails(this.ContactDetailsobj)
    .subscribe(res=>{
      console.log(res);
     let ref=document.getElementById("close")
     ref?.click();
     alert('Details Submitted Successfully')
      this.ContactDetailsform.reset();
      this.getContactDetailsList();
    })
  }
  
  getContactDetailsList(){
    this.api.getContactDetailsList()
   .subscribe(res=>{
      this.List=res;
    })
  }
 deleteContactDetailsList(row:any){
   this.api.deleteContactDetailsList(row.id)
   .subscribe(res=>{
   alert("Deleted Successfully")
   this.getContactDetailsList();
  })
 }
}
