import { Input,Button } from '@/shared/components/index';
import React from "react";


export const LoginForm: React.FC = () => {
  return (
    <form action=""
          className="flex flex-col w-full max-w-md gap-8 ">
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Button type="submit">Login</Button>
    </form>
  );
};