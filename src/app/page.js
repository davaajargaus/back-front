"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [data, setData] = useState([]);
  async function getData() {
    try {
      const res = await axios.get("http://localhost:8000/user");
      setData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  console.log(data)

  return (
    <>
    <div className="w-[100%] h-[1000px] flex items-center justify-center">
      <h1>
        
        hii

      </h1>
      
    </div>
    </>
  )
}
