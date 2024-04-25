import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {API_BASE_URL} from "../../../apiPath";

export const addStock=createAsyncThunk("addstock",async(data)=>{
    try {
        const response=await fetch(API_BASE_URL+"/api/stock",{
            method:"POST",
            headers:{Accept:"application/json","Content-Type":"application/json"},
            body:JSON.stringify(data)
        });
        return response.json();
    } catch (error) {
        
    }
});

export const addAllocation=createAsyncThunk("addallocation",async(data)=>{
    try {
        const response=await fetch(API_BASE_URL+"/api/allocation",{
            method:"POST",
            headers:{Accept:"application/json","Content-Type":"application/json"},
            body:JSON.stringify(data)
        });
        return response.json();
    } catch (error) {
        
    }
});

export const updateAllocation=createAsyncThunk("updateallocation",async(data)=>{
    try {
        const response=await fetch(API_BASE_URL+"/allocation/update?id="+data.id,{
            method:"PUT",
            headers:{Accept:"application/json","Content-Type":"application/json"},
            body:JSON.stringify(data)
        });
        return response.json();
    } catch (error) {
        
    }
});

export const addDistribution=createAsyncThunk("adddistribution",async(data)=>{
    try {
        const response=await fetch(API_BASE_URL+"/stock/distribution",{
            method:"POST",
            headers:{Accept:"application/json","Content-Type":"application/json"},
            body:JSON.stringify(data)
        });
        return response.json();
    } catch (error) {
        
    }
});


export const getStock=createAsyncThunk("getstock",async(data)=>{
    try {
        const response=await fetch(API_BASE_URL+"/api/stock");
        return response.json();
    } catch (error) {
        
    }
    
});

export const getAllocations=createAsyncThunk("getallocations",async()=>{
    try {
        const response=await fetch(API_BASE_URL+"/api/allocation");
        return response.json();
    } catch (error) {
        
    }
    
});

export const getDistributions=createAsyncThunk("getdistributions",async()=>{
    try {
        const response=await fetch(API_BASE_URL+"/api/distribution");
        return response.json();
    } catch (error) {
        
    }
    
});


export const getStockBygni=createAsyncThunk("getstockbygni",async(data)=>{
    try {
        const response=await fetch(API_BASE_URL+"/stock/bygni?gdwid="+data.gwdid+"&itmid="+data.itmid);
        return response.json();
    } catch (error) {
        
    }
    
});

export const getStockByExecutive=createAsyncThunk("getstockbyexecutive",async(data)=>{
    try {
        
        const response=await fetch(API_BASE_URL+"/stock/stockbyexecutive?id="+data.id+"&itmid="+data.itmid);
        
        return response.json();
    } catch (error) {
        
    }
    
});

export const getAllocationByid=createAsyncThunk("getallocationbyid",async(id)=>{
    try {
        
        const response=await fetch(API_BASE_URL+"/allocation/byid?id="+id);
        
        return response.json();
    } catch (error) {
        
    }
    
});

export const getDistributionByid=createAsyncThunk("getdistributionbyid",async(id)=>{
    try {
        
        const response=await fetch(API_BASE_URL+"/distribution/byid?id="+id);
        
        return response.json();
    } catch (error) {
        
    }
    
});


export const deleteAllocation=createAsyncThunk("deleteallocation",async(id)=>{
    try {
        
        const response=await fetch(API_BASE_URL+"/allocation/deleteallocation?id="+id);
        
        return response.json();
    } catch (error) {
        
    }
    
});


const listallocation=localStorage.getItem("listallocation")?JSON.parse(localStorage.getItem("listallocation")):[];
const listdistribution=localStorage.getItem("listdistribution")?JSON.parse(localStorage.getItem("listdistribution")):[];

const stockSlice=createSlice({
    name:"stock",
    initialState:{data:[],distdata:[],allocdata:[],editData:[],isDelete:false,isUpdate:false,loading:false,response:"",msg:"",isSuccess:false,quantity:0,alllist:listallocation,distlist:listdistribution},
    reducers:{
        clearStateStock(state){
            state.isSuccess=false;
            state.response="";
            state.msg="";
            state.data=[];
            state.distdata=[];
            state.allocdata=[];
            state.isDelete=false;
            state.isUpdate=false;
            state.editData=[];
        },
        addListAllocation(state,action){
          
            const item=action.payload;
            const itemExist=state.alllist.find((x)=>x.executive===item.executive && x.item===item.item);
            if(!itemExist)
            {
                
                state.alllist=[...state.alllist,item];
                localStorage.setItem("listallocation",JSON.stringify(state.alllist));
            }
        },
        removeListAllocation(state,action){
            state.alllist=state.alllist.filter((row) => {
                return (
                  row.executive.includes(action.payload.ex) &&
                  row.item.includes(action.payload.itm) ?null:row
                  
                );
              })
            localStorage.setItem("listallocation",JSON.stringify(state.alllist));
        },
        resetListAllocation(state,action){
            localStorage.setItem("listallocation",[]);
            state.alllist=[];
        },

        addDistAllocation(state,action){
          
            const item=action.payload;
            const itemExist=state.distlist.find((x)=>x.executive===item.executive && x.item===item.item);
            console.log(action.payload);
            if(!itemExist)
            {
                
                state.distlist=[...state.distlist,item];
                localStorage.setItem("listdistribution",JSON.stringify(state.distlist));
            }
        },
        removeDistAllocation(state,action){
            state.distlist=state.distlist.filter((row) => {
                return (
                  row.executive.includes(action.payload.ex) &&
                  row.item.includes(action.payload.itm) ?null:row
                  
                );
              })
            localStorage.setItem("listdistribution",JSON.stringify(state.distlist));
        },
        resetDistAllocation(state,action){
            localStorage.setItem("listdistribution",[]);
            state.distlist=[];
        }
        
    },
    extraReducers:(builder)=>{
        //Delete Allocation starts
        builder.addCase(deleteAllocation.pending,(state, action)=>{
            state.loading=true;
            
        }),
        builder.addCase(deleteAllocation.fulfilled,(state, action)=>{
            state.loading=false;
            state.isDelete=true;
            state.response="success";
            state.msg="Removed Successfully !!";
        }),
        builder.addCase(deleteAllocation.rejected,(state, action)=>{
            state.loading=false;
            state.isSuccess=true;
            state.response="danger",
            state.msg="Something Went Wrong !!";
            
        }),
        
        //Edit Allocation starts
        builder.addCase(getAllocationByid.pending,(state, action)=>{
            state.loading=true;
            
        }),
        builder.addCase(getAllocationByid.fulfilled,(state, action)=>{
            state.loading=false;
           

            state.editData=action.payload.status=="404" || action.payload.status=="400"?[]:action.payload;
            
        }),
        builder.addCase(getAllocationByid.rejected,(state, action)=>{
            state.loading=false;
            state.isSuccess=true;
            state.response="danger",
            state.msg="Something Went Wrong !!";
            
        }),

        builder.addCase(updateAllocation.pending,(state, action)=>{
            state.loading=true;
            
        }),
        builder.addCase(updateAllocation.fulfilled,(state, action)=>{
            state.loading=false;
            state.response="success";
            state.msg="Updated Successfully !!";
            state.isUpdate=true;
            
        }),
        builder.addCase(updateAllocation.rejected,(state, action)=>{
            state.loading=false;
            state.response="danger",
            state.msg="Something Went Wrong !!";
            state.isSuccess=true;
            
        }),

        builder.addCase(addStock.pending,(state, action)=>{
            state.loading=true;
            
        }),
        builder.addCase(addStock.fulfilled,(state, action)=>{
            state.loading=false;
            state.response="success";
            state.msg="Added Successfully !!";
            state.isSuccess=true;
            
        }),
        builder.addCase(addStock.rejected,(state, action)=>{
            state.loading=false;
            state.response="danger",
            state.msg="Something Went Wrong !!";
            state.isSuccess=true;
            
        }),
        builder.addCase(addAllocation.pending,(state, action)=>{
            state.loading=true;
            
        }),
        builder.addCase(addAllocation.fulfilled,(state, action)=>{
            state.loading=false;
            state.response="success";
            state.msg="Added Successfully !!";
            state.isSuccess=true;
           
            
        }),
        builder.addCase(addAllocation.rejected,(state, action)=>{
            state.loading=false;
            state.response="danger",
            state.msg="Something Went Wrong !!";
            state.isSuccess=true;
            
        }),

        builder.addCase(addDistribution.pending,(state, action)=>{
            state.loading=true;
            
        }),
        builder.addCase(addDistribution.fulfilled,(state, action)=>{
            state.loading=false;
            state.response="success";
            state.msg="Added Successfully !!";
            state.isSuccess=true;
           
            
        }),
        builder.addCase(addDistribution.rejected,(state, action)=>{
            state.loading=false;
            state.response="danger",
            state.msg="Something Went Wrong !!";
            state.isSuccess=true;
            
        }),

        builder.addCase(getStock.pending,(state, action)=>{
            state.loading=true;
            
        }),
        builder.addCase(getStock.fulfilled,(state, action)=>{
            state.loading=false;

            state.data=action.payload.status=="404"?[]:action.payload;
            
        }),
        builder.addCase(getStock.rejected,(state, action)=>{
            state.loading=false;
            state.isSuccess=true;
            state.response="danger",
            state.msg="Something Went Wrong !!";
            
        }),
        builder.addCase(getStockBygni.pending,(state, action)=>{
            state.loading=true;
            
        }),
        builder.addCase(getStockBygni.fulfilled,(state, action)=>{
            state.loading=false;

            state.data=action.payload.status=="404"?[]:action.payload;
            
            
        }),
        builder.addCase(getStockBygni.rejected,(state, action)=>{
            state.loading=false;
            state.isSuccess=true;
            state.response="danger",
            state.msg="Something Went Wrong !!";
            
        }),
        builder.addCase(getStockByExecutive.pending,(state, action)=>{
            state.loading=true;
            
        }),
        builder.addCase(getStockByExecutive.fulfilled,(state, action)=>{
            state.loading=false;
   
            state.data=action.payload.status=="404" || action.payload.status=="400"?[]:action.payload;
            
            
        }),
        builder.addCase(getStockByExecutive.rejected,(state, action)=>{
            state.loading=false;
            state.isSuccess=true;
            state.response="danger",
            state.msg="Something Went Wrong !!";
            
        }),
        builder.addCase(getAllocations.pending,(state, action)=>{
            state.loading=true;
            
        }),
        builder.addCase(getAllocations.fulfilled,(state, action)=>{
            state.loading=false;
   
            state.allocdata=action.payload.status=="404" || action.payload.status=="400"?[]:action.payload;
            
            
        }),
        builder.addCase(getAllocations.rejected,(state, action)=>{
            state.loading=false;
            state.isSuccess=true;
            state.response="danger",
            state.msg="Something Went Wrong !!";
            
        }),
        builder.addCase(getDistributions.pending,(state, action)=>{
            state.loading=true;
            
        }),
        builder.addCase(getDistributions.fulfilled,(state, action)=>{
            state.loading=false;
   
            state.distdata=action.payload.status=="404"?[]:action.payload;
            
            
        }),
        builder.addCase(getDistributions.rejected,(state, action)=>{
            state.loading=false;
            state.isSuccess=true;
            state.response="danger",
            state.msg="Something Went Wrong !!";
            
        })
    }
});

export const {clearStateStock,addListAllocation,resetListAllocation,removeListAllocation,addDistAllocation,removeDistAllocation,resetDistAllocation}=stockSlice.actions;
export default stockSlice.reducer;