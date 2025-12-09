// "use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// Card
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Alert
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/ui/mode-toggle";

// Componentes e Blocks
// import { AlertTaskDemo } from "@/components/shadcn-studio/alert/alert-09";
// import { Login } from "@/components/shadcn-studio/blocks/login-page-02/login-page-02";
import { ComboboxMultipleDemo } from "@/components/shadcn-studio/combobox/combobox-10";

const Home = () => {
  // return Login();
  // return SSAlertDemo();
  // return ComboboxMultipleDemo();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ComboboxMultipleDemo/>
    <div/>
  );
};



export default Home;
