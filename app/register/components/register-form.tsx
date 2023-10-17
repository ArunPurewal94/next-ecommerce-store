"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner2 } from "react-icons/im";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface RegisterFormProps {
  currentUser: SafeUser | null;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Account Created!");
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/");
            router.refresh();
            toast.success("Logged In!");
          }

          if (callback?.error) {
            toast.error(callback?.error);
          }
        });
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/");
      router.refresh();
    }
  }, [currentUser, router]);

  if (currentUser) {
    return (
      <div className="text-3xl flex flex-col items-center justify-center w-full h-full gap-3">
        <h1>Logged in...</h1>
        <h2>Redirecting</h2>
        <ImSpinner2 className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl md:text-3xl text-slate-900 mt-5 text-center">
        Sign-up for Store
      </h1>
      <Button
        type="button"
        onClick={() => {
          signIn("google");
        }}
        variant={"outline"}
        className="w-full items-center flex gap-3"
      >
        <FcGoogle size={20} />
        Sign up with Google
      </Button>
      <Separator />
      <Input
        id="name"
        label="Name"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button type="submit" onClick={handleSubmit(onSubmit)} className="w-full">
        {isLoading ? <ImSpinner2 className="animate-spin" /> : "Register"}{" "}
      </Button>
      <span className="text-sm my-3">
        Already have an account?{" "}
        <Link className="underline" href={"/login"}>
          Login
        </Link>
      </span>
    </>
  );
};
