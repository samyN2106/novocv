"use client"
import DashboardSidebar from "../../components/Dashboard/Sidebar"
import DashboardHeader from "@/components/Dashboard/Header";
import useWindowSize from '../../hooks/useWindowSize';
import { useEffect, useState } from 'react';


export default function LayoutDashboard({children}){

    const [seeSidebar,setSeeSidebar]=useState(false)
    
      const {widthScreen} = useWindowSize()
    
    useEffect(()=>{
        if(widthScreen>=960){
        setSeeSidebar(true)
        }else {
        setSeeSidebar(false);
      }
      },[widthScreen])


    return(
      <div className="text-[1.2rem] p-[10px] flex">
        <DashboardSidebar seeSidebar={seeSidebar} setSeeSidebar={setSeeSidebar} widthScreen={widthScreen}/>
        <div className="min-[960px]:pl-[230px] w-full">
        <section className="w-full">
          <DashboardHeader setSeeSidebar={setSeeSidebar} widthScreen={widthScreen}/>
            {children}
        </section>
        </div>
      </div>
  )
}