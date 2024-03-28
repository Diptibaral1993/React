import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


export const addStock=createAsyncThunk("addstock",async(data)=>{
    try {
        const response=await fetch("https://dn.deeds.services/api/stock",{
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
        const response=await fetch("https://dn.deeds.services/api/allocation",{
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
        const response=await fetch("https://dn.deeds.services/api/stock");
        return response.json();
    } catch (error) {
        
    }
    
});

export const getStockBygni=createAsyncThunk("getstockbygni",async(data)=>{
    try {
        const response=await fetch("https://dn.deeds.services/stock/bygni?gdwid="+data.gwdid+"&itmid="+data.itmid);
        return response.json();
    } catch (error) {
        
    }
    
});

const listallocation=localStorage.getItem("listallocation")?JSON.parse(localStorage.getItem("listallocation")):[];

const stockSlice=createSlice({
    name:"stock",
    initialState:{data:[],loading:false,response:"",msg:"",isSuccess:false,quantity:0,alllist:listallocation},
    reducers:{
        clearStateStock(state){
            state.isSuccess=false;
            state.response="";
            state.msg="";
            state.data=[];
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
        }
        
    },
    extraReducers:(builder)=>{
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
        builder.addCase(getStock.pending,(state, action)=>{
            state.loading=true;
            
        }),
        builder.addCase(getStock.fulfilled,(state, action)=>{
            state.loading=false;
            state.response="success";
            state.msg="Added Successfully !!";
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
            state.response="success";
            state.msg="Added Successfully !!";
            state.data=action.payload.status=="404"?[]:action.payload;
            
            
        }),
        builder.addCase(getStockBygni.rejected,(state, action)=>{
            state.loading=false;
            state.isSuccess=true;
            state.response="danger",
            state.msg="Something Went Wrong !!";
            
        })
    }
});

export const {clearStateStock,addListAllocation,resetListAllocation,removeListAllocation}=stockSlice.actions;
export default stockSlice.reducer;