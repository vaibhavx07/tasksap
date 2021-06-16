import { Component, OnInit ,ViewChild} from '@angular/core';
import {Task} from './Task';
import {TaskService} from './task.service'
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
    @ViewChild('f') form:any;
    taskdata: any = [];
    submitted:boolean = false;
    productDialog:boolean = false;
    selectedtask:any;
    mindate:Date = new Date();
    statuses:any[] = [{value:0,label:'Not Started'},{value:1,label:'In Progress'},{value:2,label:'Done'}];
    task:Task = {name:'',status:0,assignee:'',due_date:new Date(),notes:''};
    disablebutton:boolean = false
    constructor(private messageService: MessageService,private taskService:TaskService) { 
        
    }

    ngOnInit(): void {
        this.gettakslist();
    }
    gettakslist(){
        this.taskService.tasklist().subscribe((data:any)=>{
            this.taskdata = data.data;
        })
    }
    openNew() {
        this.disablebutton = false;
        this.submitted = false;
        this.productDialog = true;
        this.task = {name:'',status:0,assignee:'',due_date:new Date(),notes:''};
       
    }
    saveProduct(){
        
        this.submitted = true;
        this.productDialog = false;
        console.log('this.selectedtask.id',this.selectedtask,'this.task',this.task)
        if(this.selectedtask){
            this.taskService.taskupdate(this.task,this.selectedtask.id).subscribe((data:any)=>{
                this.task = {name:'',status:0,assignee:'',due_date:new Date(),notes:''};
                this.messageService.add({severity:'success', summary:'Service Message', detail:data.message});
                this.gettakslist()
            })
        }else{
            this.taskService.taskCreate(this.task).subscribe((data:any)=>{
                this.task = {name:'',status:0,assignee:'',due_date:new Date(),notes:''};
                this.messageService.add({severity:'success', summary:'Service Message', detail:data.message});
                this.gettakslist()
            })
        }
        
    }
    
    deletetask(id:number){
        this.taskService.taskdelete(id).subscribe((data:any)=>{
            if(data.success){
                this.messageService.add({severity:'success', summary:'Service Message', detail:data.message});
                this.gettakslist();
            }
            
        })
    }
    onRowSelect(event:any){
        
        this.submitted = false;
        this.productDialog = true;
        this.selectedtask.id = event.data.id;
        console.log('event.data.due_date',event.data.due_date,new Date(),event.data)
        if(event.data.status==2 || new Date(event.data.due_date)<new Date()){
            this.disablebutton = true;
        }
        this.task = {name:event.data.name,status:event.data.status,assignee:event.data.assignee,due_date:new Date(event.data.due_date),notes:event.data.notes};
        
    }
}
