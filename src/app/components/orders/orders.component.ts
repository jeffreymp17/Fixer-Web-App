import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ResponseModel } from '../../models/response.model';
import { Pagination } from '../../utils/pagination.util';
import { Toast } from '../../utils/toast.util';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  progressHidden:boolean = false;
  responseModel:ResponseModel;
  orders=[];
  pagination=[];
  constructor(private service:OrderService) { }

  ngOnInit() {
    this.responseModel =new ResponseModel();
    this.getAllOrders();
  }

  getAllOrders(url=null){
    let page =Pagination.getUrl(url,this.responseModel,"order");
    this.service.getAllOrders(page).subscribe(
      data => {
        this.responseModel=data;
        this.orders=this.responseModel.data;
        this.pagination=Pagination.getPaginate(this.responseModel);
        this.progressHidden = true;
      },
      error => Toast.danger(error,Toast.DURATION_SHORT)
    );
  }
  

}
