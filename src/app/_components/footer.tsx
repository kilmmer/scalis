"use client";
import React, { useState, useEffect } from "react";

function Footer() {
  const date = new Date()


  return (
    <footer className="flex justify-end pe-3 items-center fixed bottom-0 w-full h-10 bg-blue-900 text-white">
      <div>
        <span>{date.toLocaleDateString()}</span>
        {/* <span> {date.toLocaleTimeString()}</span> */}
      </div>
    </footer>
  );
}

export default Footer;